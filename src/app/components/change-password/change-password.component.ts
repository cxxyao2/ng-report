import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
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
      this.service.sendResetPasswordEmail(this.email.value).subscribe(
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
}
