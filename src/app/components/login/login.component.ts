import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
// TODO waiting for deleting
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('authform') authForm!: NgForm;
  errorMessage = '';
  hide = true;
  constructor(
    public authService: AuthService,
    private cs: CustomerService,
    public router: Router
  ) {}

  ngOnInit() {}

  login(): void {
    if (!this.authForm.form.valid) {
      return;
    }

    this.authService
      .login(
        this.authForm.controls.email.value,
        this.authForm.controls.password.value
      )
      .subscribe((data) => {
        console.log('data is', data); // TODO
      });
  }
}
