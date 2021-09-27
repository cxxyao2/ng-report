import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from './logs.service';

import { environment } from '../../environments/environment';

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

  registerUser(user: User): Observable<any> {
    const url = this.configUrl + '/users';
    return this.http.post(url, user);
  }

  findUserByEmail(email: string): Observable<User[]> {
    const url = this.configUrl + '/users/?email=' + email;
    return this.http.get<User[]>(url);
  }

  sendResetPasswordEmail(email: string) {
    const url = this.configUrl + '/auth/send-reset-email';
    return this.http.post(url, { email: email });
  }

  resetPassword(newPassword: string, token: string) {
    const url = this.configUrl + '/auth/reset-password?token=' + token;
    return this.http.post(url, { newPassword: newPassword });
  }

  updatePassword(password: string, newPassword: string) {
    const url = this.configUrl + '/auth';
    return this.http.put(url, { password: password, newPassword: newPassword });
  }

  login(email: string, password: string): Observable<any> {
    const url = this.configUrl + '/auth';

    // TODO, 正式部署前放开
    // auth service 需要带withCredentials
    // 其他服务通过interceptor来携带了,待验证
    // return this.http.post(
    //   url,
    //   {
    //     email,
    //     password,
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );
    return this.http.post(url, {
      email,
      password,
    });
  }

  getToken(): string {
    return this.cookieService.get(environment.cookieName) || '';
    // 这些代码是废代码了 return localStorage.getItem(this.tokenKey) || '';
  }

  loginWithJwt(jwt: string) {
    // TODO  cookie能用后要去掉, 要用getToken()从cookie中获取
    jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ2YTQxM2Q1MjQxNDY1NWE2ZTkxN2QiLCJuYW1lIjoiSmFuZTQiLCJpc0FkbWluIjpmYWxzZSwiaXNNYW5hZ2VyIjpmYWxzZSwiaXNTYWxlc3BlcnNvbiI6dHJ1ZSwiaWF0IjoxNjMyMTY2MzQ1fQ.4OpEEkDhHt1gN3MZu00Ns2QSA4b_c-IBvphjxR5w5ZY';

    localStorage.setItem(this.tokenKey, jwt);
    this.logsSrv.addLog('login');
    this.setCurrentUser();
  }

  setCurrentUser() {
    const jwt = localStorage.getItem(this.tokenKey);
    if (jwt && jwt.length >= 1) {
      try {
        this.currentUser = jwt_decode(jwt);
      } catch (error) {
        this.currentUser = null;
      }
    }
    // TODO ,等待删除
    console.log('user is ', this.currentUser);
  }

  logout(): void {
    // TODO 需要清除cookie 和 localStorage
    // this.cookieService.deleteAll('/');
    //localStorage.removeItem(this.tokenKey);
    this.logsSrv.addLog('logout');
    window.location.reload();
  }
}
