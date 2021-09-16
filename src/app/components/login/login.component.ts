import { Component, OnInit } from '@angular/core';

import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  login(e: any) {}
}
