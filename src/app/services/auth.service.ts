import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from './logs.service';

import { environment } from '../../environments/environment';
import {
  ReturnWithDataAndMessage,
  ReturnWithMessage,
} from '../models/return-values';

export interface RegisterResult {
  data: User;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configUrl = environment.apiUrl;
  tokenKey = 'token';
  currentUser: User | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private logsSrv: LogsService
  ) {}

  registerUser(user: User): Observable<RegisterResult> {
    const url = this.configUrl + '/users';
    return this.http.post<RegisterResult>(url, user);
  }

  findUserByEmail(email: string): Observable<User[]> {
    const url = this.configUrl + '/users/?email=' + email;
    return this.http.get<User[]>(url);
  }

  sendResetPasswordEmail(email: string): Observable<ReturnWithMessage> {
    const url = this.configUrl + '/auth/send-reset-email';
    return this.http.post<ReturnWithMessage>(url, { email });
  }

  sendPlaceOrderEmail(
    email?: string,
    customerName?: string,
    orderAmount?: number,
    orderTax?: number,
    orderTotal?: number
  ) {
    const url = this.configUrl + '/auth/send-place-order-email';
    return this.http.post(url, {
      email,
      name: customerName,
      amount: orderAmount,
      tax: orderTax,
      total: orderTotal,
    });
  }

  resetPassword(newPassword: string, token: string) {
    const url = this.configUrl + '/auth/reset-password?token=' + token;
    return this.http.post(url, { newPassword });
  }

  updatePassword(
    password: string,
    newPassword: string
  ): Observable<ReturnWithMessage> {
    const url = this.configUrl + '/auth';
    return this.http.put<ReturnWithMessage>(url, { password, newPassword });
  }

  login(email: string, password: string): Observable<ReturnWithDataAndMessage> {
    const url = this.configUrl + '/auth';

    return this.http.post<ReturnWithDataAndMessage>(
      url,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    // return this.http.post(url, {
    //   email,
    //   password,
    // });
  }

  getToken(): string {
    return this.cookieService.get(environment.cookieName) || '';
    //  return localStorage.getItem(this.tokenKey) || '';
  }

  loginWithJwt() {
    this.logsSrv.addLog('login');
  }

  setCurrentUser(): void {
    const jwt = this.getToken();
    if (jwt && jwt.length >= 1) {
      try {
        this.currentUser = jwt_decode(jwt);
      } catch (error) {
        this.currentUser = null;
      }
    }
  }

  logout(): void {
    this.logsSrv.addLog('logout');
    this.cookieService.delete(environment.cookieName);
    window.location.reload();
  }
}
