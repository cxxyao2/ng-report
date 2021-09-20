import { Component, OnInit } from '@angular/core';

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
  errorMessage = '';
  hide = true;
  constructor(
    public authService: AuthService,
    private cs: CustomerService,
    public router: Router
  ) {}

  ngOnInit() {}

  login(event: any): void {
    // email: string, password: string
    console.log('event', event.target.email.value);
    const email = 'Jane4@hotmail.com';
    const password = '12345678';
    this.authService.login(email, password).subscribe((data) => {
      console.log('data is', data);
    });
  }

  deleteSomething() {
    // id:
    const customerId = '6147425971b4a50a8b86d278';
    this.cs.deleteCustomer(customerId).subscribe((data) => {
      console.log('data is', data);
    });
  }
}
