import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { uniquePasswordValidator } from 'src/app/services/unique-password.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReturnWithMessage } from 'src/app/models/return-values';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  hide = true;
  hideRepeat = true;
  token = '';
  myForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
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
    ); 

    // https://xxxx.xxx.xxx.xxx/reset-password?token=xxx
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.token = params['token'];
      });
  }
  get password() {
    return this.myForm.get('password');
  }

  get repeatPassword() {
    return this.myForm.get('repeatPassword');
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

  resetPassword(): void {
    if (this.myForm.invalid) {
      return;
    }
    this.authService
      .resetPassword(this.password?.value, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: ReturnWithMessage) => {
          this.errorMessage = null;
          this.successMessage = data.message;
        },
        (err) => {
          this.successMessage = null;
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
