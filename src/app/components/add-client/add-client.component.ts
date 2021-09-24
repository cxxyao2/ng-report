import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, Subscription, EMPTY, of, EmptyError } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { ThemeService } from 'src/app/services/theme.service';
import { CustomerService } from 'src/app/services/customer.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { Customer } from '../../models/customer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddClientComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  stepperOrientation!: Observable<StepperOrientation>;
  requiredFileType = 'image/*';
  bufferValue = 100;

  uploadProgress?: number | null;
  uploadSub?: Subscription | null;
  fileUrl?: any;
  errorMessage: string | null = null;
  creditLevels = [
    { label: 'golden', value: '$100k' },
    { label: 'silver', value: '$10k' },
    { label: 'iron', value: '$1k' },
  ];
  formData?: FormData;
  file: File | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public themeService: ThemeService,
    private customerSrv: CustomerService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      credit: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
    });
    this.thirdFormGroup = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.fourthFormGroup = this.fb.group({
      imageFile: ['', Validators.required],
    });
    this.stepperOrientation = this.themeService.isHandset.pipe(
      map((value) => (value === false ? 'horizontal' : 'vertical'))
    );
  }

  onFileSelected(event: any): void {
    const chooseFile = event.target.files[0];
    this.file = null;
    if (chooseFile) {
      const initFileName = chooseFile?.name;
      const fileExtent = initFileName.split('.')[1];
      if (Math.ceil(chooseFile.size / 1024) >= 1024) {
        this.errorMessage = 'Image file size should be smaller than 1M.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 10000);
        return;
      }
      if (fileExtent !== 'jpg') {
        this.errorMessage = 'Image file name should end at .jpg';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
        return;
      }

      this.file = chooseFile;
    }

    // show image
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      // called once readAsDataURL is completed
      reader.onload = (data) => {
        this.fileUrl = data.target?.result;
      };
    }
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  allDataClear() {
    this.stepper.reset();
    this.file = null;
    this.fileUrl = null;
  }

  submit() {
    if (!this.firstFormGroup.valid) {
      return;
    }
    if (!this.secondFormGroup.valid) {
      return;
    }
    if (!this.thirdFormGroup.valid) {
      return;
    }
    if (!this.fourthFormGroup.valid) {
      return;
    }
    console.log('submit ok');
    // TODO add a potential client to DB
    const customer = {
      name: this.firstFormGroup.controls.name.value,
      credit: this.firstFormGroup.controls.credit.value,
      address: this.secondFormGroup.controls.address.value,
      phone: this.thirdFormGroup.controls.phone.value,
    };
    this.customerSrv
      .addCustomer(customer)
      .pipe(
        switchMap((newCustomer) => {
          if (!this.file) {
            return of(newCustomer);
          }
          const newFileName = newCustomer._id + '.jpg';
          this.formData = new FormData();
          this.formData.append('myFile', this.file, newFileName);
          const url = environment.apiUrl;
          return this.http.post(`${url}/files/upload`, this.formData);
        })
      )
      .subscribe(
        (data) => {
          console.log('data', data);
          this.allDataClear();
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  ngOnDestroy() {
    this.uploadSub?.unsubscribe();
  }
}
