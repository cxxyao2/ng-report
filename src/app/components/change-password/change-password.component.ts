import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { uniquePasswordValidator } from 'src/app/services/unique-password.directive';
import { AuthService, ReturnWithMessage } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  hideOld = true;
  hideNew = true;
  hideRepeatNew = true;

  myForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
        oldPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'blur',
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'blur',
        }),
        repeatPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'blur',
        }),
      },
      { validators: uniquePasswordValidator, updateOn: 'submit' }
    ); // <-- add custom validator at the FormGroup level
  }

  get oldPassword() {
    return this.myForm.get('oldPassword');
  }
  get password() {
    return this.myForm.get('password');
  }

  get repeatPassword() {
    return this.myForm.get('repeatPassword');
  }

  getOldPasswordErrorMessage(): string {
    if (this.oldPassword?.errors?.required) {
      return 'old password is required';
    }

    if (this.oldPassword?.errors?.pattern) {
      return 'old password is invalid';
    }
    return 'old password is invalid';
  }

  getNewPasswordErrorMessage(): string {
    if (this.password?.errors?.required) {
      return 'new password is required';
    }

    if (this.password?.errors?.pattern) {
      return 'new password is invalid';
    }
    return 'new password is invalid';
  }
  getRepeatNewPasswordErrorMessage(): string {
    if (this.repeatPassword?.errors?.required) {
      return 'repeat-new-password is required';
    }

    if (this.repeatPassword?.errors?.pattern) {
      return 'repeat-new-password is invalid';
    }
    return 'repeat-new-password is invalid';
  }

  changePassword(): void {
    if (this.myForm.invalid) {
      return;
    }
    this.authService
      .updatePassword(this.oldPassword?.value, this.password?.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: ReturnWithMessage) => {
          this.successMessage = data.message;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
