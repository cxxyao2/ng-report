import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { uniquePasswordValidator } from 'src/app/shared/unique-password.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // https://xxxx.xxx.xxx.xxx/reset-password?token=xxx
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.token = params['token'];
      });
  }

  resetPassword(): void {
    this.authService
      .resetPassword('xx', this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('data is', data);
        //this.successMessage = data.message;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
