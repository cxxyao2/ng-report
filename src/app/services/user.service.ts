import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  configUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.configUrl).pipe(retry(1));
  }

  updateUser(userId?: string, updatePart?: any): Observable<User> {
    const url = `${this.configUrl}/${userId}`;
    return this.http.put<User>(url, updatePart);
  }
}
