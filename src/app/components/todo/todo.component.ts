import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { map, takeUntil, switchMap, concatMap } from 'rxjs/operators';
import {
  Subject,
  Observable,
  forkJoin,
  of,
  from as observableFrom,
  throwError,
} from 'rxjs';

import { ContactPlan } from '../../models/contact-plan';
import { ContactRecord } from '../../models/contact-record';
import { Customer } from 'src/app/models/customer';

import { ContactPlanService } from 'src/app/services/contact-plan.service';
import { ContactRecordService } from 'src/app/services/contact-record.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { convertDateToYYYYmmDD } from '../../utils/date-convert.util';
import { DialogService } from 'src/app/services/dialog.service';

const MAX_CLIENT_NUMBER = 8; // a salesperson can visit 8 clients daily when planning

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap; // false: resolve after change detection.
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  destroy$: Subject<void> = new Subject<void>();
  dateControl = new FormControl();

  errorMessage = '';
  successMessage = '';
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  };
  markers: Array<any> = [];
  infoContent = 'aaa';
  tourLength = 300;

  initPlans: ContactPlan[] = [];
  initRecords: ContactRecord[] = [];

  todo = [''];

  done = [''];
  customerArray: Customer[] = [];
  selectedDate: Date | null = null;

  constructor(
    private planSrv: ContactPlanService,
    private recordSrv: ContactRecordService,
    private customerSrv: CustomerService,
    private authSrv: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000,
    };

    getPosition(options)
      .then((position) => {
        console.log(position);
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      })
      .catch((err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });

    // get customers
    this.customerSrv
      .getCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.customerArray = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 0);
        }
      );

    this.dateControl.valueChanges
      .pipe(
        switchMap((returnDate) => {
          if (returnDate) {
            this.selectedDate = returnDate;
            const argDate = convertDateToYYYYmmDD(returnDate);
            const personId = this.authSrv.currentUser?._id || '';

            return forkJoin({
              plans: this.planSrv.getContactPlans(argDate, personId),
              records: this.recordSrv.getContactRecords(argDate, personId),
            });
          } else {
            return of({
              plans: [],
              records: [],
            });
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          this.initPlans = [...data.plans];
          this.initRecords = [...data.records];
          if (this.initRecords && this.initRecords.length > 0) {
            return this.resetTodoAndDone(this.initRecords);
          } else {
            return this.resetTodoAndDone(this.initPlans);
          }
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  resetTodoAndDone(todoDataSource: any[]): void {
    this.todo = [];
    this.done = [];
    todoDataSource.forEach((plan: any) => {
      this.todo.push(plan.customerName);
    });
    this.customerArray.forEach((customer) => {
      const isFound = this.todo.find((item) => item === customer.name);
      if (!isFound) {
        this.done.push(customer.name);
      }
    });
    this.addMarker();
  }

  onSubmit(): void {
    if (!(this.todo && this.todo.length > 0)) {
      this.errorMessage = 'No plan need to be saved.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    if (!this.selectedDate) {
      this.errorMessage = 'Please select a valid date.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    let i = 0;
    observableFrom(this.todo)
      .pipe(
        concatMap((customerName) => {
          const idx = this.customerArray.findIndex(
            (customer) => customer.name === customerName
          );
          if (idx < 0) {
            return throwError(customerName + 'is not found in database');
          }

          const dateString = convertDateToYYYYmmDD(
            this.selectedDate || new Date()
          );
          const periodString = this.getStringFromPosition(i);
          i += 1;
          return this.recordSrv.addContactPlan({
            customerId: this.customerArray[idx]._id,
            contactDate: dateString,
            contactPeriod: periodString,
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          this.errorMessage = '';
          this.successMessage = 'Your visit plan has been saved successfully.';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  getInitTask(): void {
    if (!this.selectedDate) {
      this.errorMessage = 'Please select a valid date.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    if (this.initRecords && this.initRecords.length > 1) {
      this.dialogService
        .confirmDialog({
          title: 'Contact Management',
          message: 'Are you sure you to delete this plan?',
          confirmText: 'Yes',
          cancelText: 'No',
        })
        .pipe(
          switchMap((confirm) => {
            if (confirm) {
              const dateString = convertDateToYYYYmmDD(
                this.selectedDate || new Date()
              );
              const personId = this.authSrv.currentUser?._id || '';
              return forkJoin({
                deletedOldRecords: this.recordSrv.deleteSpecificDatePlan(
                  dateString,
                  personId
                ),
                initPlans: this.planSrv.getContactPlans(dateString, personId),
              });
            } else {
              return of(null);
            }
          })
        )
        .subscribe(
          (data) => {
            if (data) {
              this.initPlans = data?.initPlans || [];
              this.resetTodoAndDone(this.initPlans);
            }
          },
          (err) => {
            this.errorMessage = err;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        );
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (
      event.container.id === 'todo' &&
      event.container.data.length >= MAX_CLIENT_NUMBER
    ) {
      this.errorMessage = `A salesperson can visit au maximum ${MAX_CLIENT_NUMBER} clients daily.`;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.tourLength = this.todo.length * 50; // TODO google map distance calculation
    this.addMarker();
  }

  zoomIn(): void {
    if (this.zoom < (this.options.maxZoom ? this.options.maxZoom : 7)) {
      this.zoom++;
    }
  }

  zoomOut(): void {
    if (this.zoom > (this.options.minZoom ? this.options.minZoom : 7)) {
      this.zoom--;
    }
  }

  click(event: google.maps.MapMouseEvent): void {
    console.log('event', event);
  }

  addMarker(): void {
    this.markers = [];
    this.todo.forEach((visitedCustomer) => {
      const idx = this.customerArray.findIndex(
        (customer) => customer.name === visitedCustomer
      );
      if (idx >= 0) {
        const customerLat = parseFloat(this.customerArray[idx].latitude || '0');
        const customerLng = parseFloat(
          this.customerArray[idx].longitude || '0'
        );

        this.markers.push({
          position: {
            lat: customerLat,
            lng: customerLng,
          },
          label: {
            color: 'red',
            text: visitedCustomer,
          },
          title: visitedCustomer,
          info: visitedCustomer,
          options: {
            animation: google.maps.Animation.DROP,
          },
        });
      }
    });
  }

  openInfo(marker: MapMarker, content: string): void {
    this.infoContent = content + ' is a excellent location';
    this.info.open(marker);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStringFromPosition(index: number): string {
    const start = (index + 8).toString();
    const end = (index + 9).toString();
    const finalStart = start.padStart(2, '0'); // 08:00,09:00,...
    const finalEnd = end.padStart(2, '0'); // 09:00,10.00,...

    // YYYY-mm-DD
    const period = finalStart + ':00-' + finalEnd + ':00';
    return period;
  }
}

function getPosition(options?: PositionOptions): Promise<any> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}
