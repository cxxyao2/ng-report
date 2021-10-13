import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { ContactRecord } from 'src/app/models/contact-record';
import { ContactRecordService } from 'src/app/services/contact-record.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { convertDateToYYYYmmDD } from '../../utils/date-convert.util';
import { MatSelectionListChange } from '@angular/material/list/selection-list';

@Component({
  selector: 'app-contact-customer',
  templateUrl: './contact-customer.component.html',
  styleUrls: ['./contact-customer.component.scss'],
})
export class ContactCustomerComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap; // false: resolve after change detection.
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  destroy$: Subject<void> = new Subject<void>();
  frmGroup!: FormGroup;
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 7,
  };
  markers: Array<any> = [];
  infoContent = '';

  today = new Date();
  latitude: number | null = null;
  longitude: number | null = null;
  startTime: Date | null = null;

  errorMessage = '';
  successMessage = '';
  contactRecords: ContactRecord[] = [];
  selectedRecordId: string | null = null;
  notesControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(200),
  ]);

  constructor(
    private contactSrv: ContactRecordService,
    private authSrv: AuthService,
    private fb: FormBuilder
  ) {
    this.frmGroup = this.fb.group({
      notes: this.notesControl,
    });
  }

  ngOnInit(): void {
    const dateString = convertDateToYYYYmmDD(new Date());
    const personId = this.authSrv.currentUser?._id || '';

    this.contactSrv
      .getContactRecords(dateString, personId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.contactRecords = [];
          this.contactRecords = data.filter(
            (record) => record.isVisited === false
          );
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  getNotesErrorMessage() {
    if (this.notesControl.hasError('required')) {
      return 'You must enter notes';
    }
    if (this.notesControl.hasError('minlength')) {
      return 'Notes must be at least 10 characters long.';
    }

    if (this.notesControl.hasError('maxlength')) {
      return 'Notes can be max 200 characters long.';
    }
    return 'Enter a valid notes';
  }

  setSelectedRecord(event: MatSelectionListChange) {
    this.selectedRecordId = event.options[0].value;
    this.latitude = null;
    this.longitude = null;
    this.startTime = null;
    this.notesControl.setValue('');
  }

  getLocationAndTime(): void {
    if (!this.selectedRecordId) {
      this.errorMessage = 'Please select a customer';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    this.startTime = new Date();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000,
    };

    getPosition(options)
      .then((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map.panTo(this.center); // reset the center of map
        this.markers = [];
        this.markers.push({
          position: {
            lat: this.center.lat,
            lng: this.center.lng,
          },
          label: {
            color: 'red',
            text: 'Your location',
          },
          title: 'Your Location',
          info: 'Your Location',
          options: {
            animation: google.maps.Animation.DROP,
          },
        });
      })
      .catch((err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  }

  onSubmit(): void {
    if (this.frmGroup.invalid) {
      this.errorMessage = 'Please enter notes before submit.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    if (!this.selectedRecordId) {
      this.errorMessage = 'Please select a customer';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    const notes = this.notesControl.value.trim();
    const planId = this.selectedRecordId || '';
    const updatePart = {
      actualContactDT: this.startTime,
      latitude: this.center.lat,
      longitude: this.center.lng,
      notes,
    };
    this.contactSrv
      .updateContactRecord(planId, updatePart)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.successMessage = 'Contact Record has been save successfully.';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
          const idx = this.contactRecords.findIndex(
            (record) => record._id === this.selectedRecordId
          );
          if (idx >= 0) {
            this.contactRecords.splice(idx, 1);
          }
          this.resetForm();
        },
        (err: any) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  resetForm(): void {
    this.selectedRecordId = null;
    this.latitude = null;
    this.longitude = null;
    this.startTime = null;
    this.frmGroup.reset();
  }

  openInfo(marker: MapMarker, content: string): void {
    this.infoContent = content + ' is a excellent location';
    this.info.open(marker);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function getPosition(options?: PositionOptions): Promise<any> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}
