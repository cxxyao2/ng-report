import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
    private route: ActivatedRoute,
    private cartService: CartService,
    private customerService: CustomerService
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
          const token = '';
          this.authService.currentUser = result.data;
          console.log('TODO login', this.authService.currentUser);
          this.authService.loginWithJwt(result);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );

    // form.resetForm();
  }
}
