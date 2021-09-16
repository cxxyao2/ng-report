import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { ThemeService } from 'src/app/services/theme.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
export class AddClientComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  stepperOrientation!: Observable<StepperOrientation>;
  requiredFileType = 'image/*';
  fileName = '';
  uploadProgress?: number | null;
  uploadSub?: Subscription | null;
  fileUrl?: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this.fb.group({
      fourthCtrl: ['', Validators.required],
    });
    this.stepperOrientation = this.themeService.isHandset.pipe(
      map((value) => (value === false ? 'horizontal' : 'vertical'))
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
    //   const formData = new FormData();
    //   formData.append('myFile', file);
    //   const uploads$ = this.http
    //     .post('http://localhost:5000/api/files/upload', formData, {
    //       reportProgress: true,
    //       observe: 'events',
    //     })
    //     .pipe(finalize(() => this.reset()));

    //   this.uploadSub = uploads$.subscribe((data) => {
    //     if (data.type === HttpEventType.UploadProgress) {
    //       this.uploadProgress = Math.round(100 * (data.loaded / data.total));
    //     }
    //   });
    // }

    // show image
    if (file) {
      console.log('fileUrl is ', file.name);
      console.log('file size is ', file.size); // 14024 = 14k
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // called once readAsDataURL is completed
      reader.onload = (data) => {
        this.fileUrl = data.target?.result;
        console.log('fileUrl is ', this.fileUrl);
      };
    }
  }

  cancelUpload(): void {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
