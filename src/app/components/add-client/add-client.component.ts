import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ThemeService } from 'src/app/services/theme.service';
import { CustomerService } from 'src/app/services/customer.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers: [],
})
export class AddClientComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;
  destroy$: Subject<void> = new Subject<void>();

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  stepperOrientation!: Observable<StepperOrientation>;
  requiredFileType = 'image/*';
  bufferValue = 100;

  fileUrl?: any;
  errorMessage: string | null = null;
  successMessage: string | null = null;
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
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
          Validators.email,
        ],
      ],
    });
    this.thirdFormGroup = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
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
        }, 3000);
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

  get email() {
    return this.secondFormGroup.get('email');
  }

  getEmailErrorMessage() {
    if (this.email?.errors?.required) {
      return 'Email is required';
    }
    if (this.email?.errors?.minlength) {
      return 'Too short: ' + JSON.stringify(this.email?.errors?.minlength);
    }
    return 'Please enter a valid email address.';
  }

  get fullname() {
    return this.firstFormGroup.get('name');
  }

  getFullnameErrorMessage() {
    if (this.fullname?.errors?.required) {
      return 'Name is required';
    }
    if (this.fullname?.errors?.minlength) {
      return 'Too short: ' + JSON.stringify(this.fullname?.errors?.minlength);
    }

    if (this.fullname?.errors?.minlength) {
      return 'Too long: ' + JSON.stringify(this.fullname?.errors?.length);
    }

    return 'Please enter a valid name.';
  }

  get credit() {
    return this.firstFormGroup.get('credit');
  }

  getCreditErrorMessage() {
    if (this.credit?.errors?.required) {
      return 'Credit is required';
    }
    return 'Please select a credit.';
  }

  get address() {
    return this.secondFormGroup.get('address');
  }

  getAddressErrorMessage() {
    if (this.address?.errors?.required) {
      return 'Address is required';
    }
    if (this.address?.errors?.minlength) {
      return 'Too short: ' + JSON.stringify(this.address?.errors?.minlength);
    }

    if (this.address?.errors?.maxlength) {
      return 'Too long: ' + JSON.stringify(this.address?.errors?.length);
    }

    return 'Please enter a valid address.';
  }

  get phone() {
    return this.thirdFormGroup.get('phone');
  }

  getPhoneErrorMessage() {
    if (this.phone?.errors?.required) {
      return 'Phone is required';
    }
    if (this.phone?.errors?.minlength) {
      return 'Too short: ' + JSON.stringify(this.phone?.errors?.minlength);
    }

    if (this.phone?.errors?.minlength) {
      return 'Too long: ' + JSON.stringify(this.phone?.errors?.length);
    }

    return 'Please enter a valid phone.';
  }

  allDataClear() {
    this.stepper.reset();
    this.file = null;
    this.fileUrl = null;
  }

  submit() {
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid ||
      this.fourthFormGroup.invalid
    ) {
      this.successMessage = null;
      this.errorMessage = 'Please enter valid data before submit.';
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      return;
    }

    const customer = {
      name: this.firstFormGroup.controls.name.value,
      credit: this.firstFormGroup.controls.credit.value,
      address: this.secondFormGroup.controls.address.value,
      email: this.secondFormGroup.controls.email.value,
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data: any) => {
          this.errorMessage = null;
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
          }, 2000);
          this.allDataClear();
        },
        (err) => {
          this.successMessage = '';
          this.errorMessage = err;

          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
