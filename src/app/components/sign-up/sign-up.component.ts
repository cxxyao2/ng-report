import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UniqueUserValidator } from 'src/app/shared/unique-user.directive';
import { uniquePasswordValidator } from 'src/app/shared/unique-password.directive';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  hideRepeat = true;
  myForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private uniqueValidator: UniqueUserValidator
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
        fullName: new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)],

          updateOn: 'blur',
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [
            this.uniqueValidator.validate.bind(this.uniqueValidator),
          ],
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

  get fullName() {
    return this.myForm.get('fullName');
  }
  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get repeatPassword() {
    return this.myForm.get('repeatPassword');
  }

  getNameMessage() {
    if (this.fullName?.errors?.required) {
      return 'Name is required';
    }
    if (this.fullName?.errors?.minlength) {
      return 'Too short: ' + JSON.stringify(this.fullName?.errors?.minlength);
    }
    return 'Name is invalid';
  }

  getEmailMessage() {
    if (this.email?.errors?.required) {
      return 'Email is required';
    }

    // TODO
    if (this.email?.errors?.userExists) {
      return 'Email Exists';
    }
    if (this.email?.errors?.email) {
      return 'Not a valid email ';
    }
    return 'Email is invalid';
  }

  getPasswordMessage() {
    if (this.password?.errors?.required) {
      return 'Password is required';
    }

    if (this.password?.errors?.pattern) {
      return 'Password is invalid';
    }
    return 'Password is invalid';
  }

  getRepeatPasswordMessage() {
    if (this.repeatPassword?.errors?.required) {
      return 'RepeatPassword is required';
    }

    if (this.repeatPassword?.errors?.pattern) {
      return 'RepeatPassword is invalid';
    }
    return 'RepeatPassword is invalid';
  }

  signup() {
    if (this.myForm.invalid) {
      return;
    }
    this.authService
      .registerUser({
        name: this.fullName?.value,
        email: this.email?.value,
        password: this.password?.value,
      })
      .subscribe(
        (data) => {
          this.authService.currentUser = { ...data.data };
          this.authService.loginWithJwt('TODO');
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );
  }
}
