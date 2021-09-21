import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  errorMessage = '';
  hide = true;
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  login(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authService
      .login(form.controls.email.value, form.controls.password.value)
      .subscribe(
        (result) => {
          // TODO
          // 这里其他返回信息没用，主要是得到头部cookie中的token .
          const token = '';

          this.authService.loginWithJwt(result);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );

    // form.resetForm();
  }
}
