import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private service: AuthService) {}
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  sendEmail() {
    if (this.email.valid) {
      this.service
        .sendResetPasswordEmail(this.email.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.successMessage = data.message;
          },
          (err) => {
            this.errorMessage = err;
            setTimeout(() => {
              this.errorMessage = null;
            }, 3000);
          }
        );
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
