import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from './logs.service';
import { UserService } from './user.service';

import { environment } from '../../environments/environment';
import { ReturnWithDataAndMessage } from './cart.service';

export interface RegisterResult {
  data: User;
  message: string;
}

export interface ReturnWithMessage {
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
    private logsSrv: LogsService,
    private userService: UserService
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

    // TODO, 正式部署前放开
    // auth service 需要带withCredentials
    // 其他服务通过interceptor来携带了,待验证
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
    // 这些代码是废代码了 return localStorage.getItem(this.tokenKey) || '';
  }

  loginWithJwt() {
    this.logsSrv.addLog('login');
  }

  setCurrentUser(): void {
    const jwt = localStorage.getItem(this.tokenKey);
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
