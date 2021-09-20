import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configUrl = environment.apiUrl;
  tokenKey = 'token';
  currentUser: any;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const url = this.configUrl + '/users';
    return this.http.post(url, user);
  }

  findUserByNameOrEmail(user: string): Observable<any> {
    const url = this.configUrl + '/users/unique';
    return this.http.post(url, { name: user });
  }

  setUserTheme(theme: number): void {
    if (theme === 1) {
      this.currentUser.theme = 'blue';
    } else {
      this.currentUser.theme = 'purple';
    }
  }

  login(email: string, password: string): Observable<any> {
    const url = this.configUrl + '/auth';
    return this.http.post(
      url,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  loginWithJwt(jwt: string) {
    localStorage.setItem(this.tokenKey, jwt);
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
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    window.location.reload();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
