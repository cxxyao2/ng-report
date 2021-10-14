import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer, throwError } from 'rxjs';
import {
  map,
  share,
  switchMap,
  shareReplay,
  catchError,
  tap,
} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Customer, CustomerForUpdate } from '../models/customer';
import {
  ReturnWithDataAndMessage,
  ReturnWithMessage,
} from '../models/return-values';

@Injectable()
export class CustomerAuthorizeService {
  configUrl = environment.apiUrl + '/customers';
  createDate: Date | null = null;

  constructor(private http: HttpClient) {}

  getAllUnauthorizedCustomers(): Observable<Customer[]> {
    const url = `${this.configUrl}?isAuthorized=false`;
    return this.http.get<Customer[]>(url);
  }

  getAllAuthorizedCustomers(): Observable<Customer[]> {
    const url = `${this.configUrl}?isAuthorized=true`;
    return this.http.get<Customer[]>(url);
  }

  requestNewAndUnAuthorizedCustomers(): Observable<never[] | Customer[]> {
    const url =
      `${this.configUrl}?isAuthorized=false&createDate=` +
      this.createDate?.toUTCString();
    return this.http.get<Customer[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        throwError(error);
        return of([]);
      })
    );
  }

  getCustomer(id: string): Observable<Customer> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  updateCustomer(
    id: string,
    updatePart: CustomerForUpdate
  ): Observable<ReturnWithDataAndMessage> {
    const url = `${this.configUrl}/${id}`;
    return this.http.put<ReturnWithDataAndMessage>(url, updatePart);
  }

  deleteCustomer(id: string): Observable<ReturnWithMessage> {
    const url = `${this.configUrl}/${id}`;
    return this.http.delete<ReturnWithMessage>(url);
  }

  getCustomers(): Observable<Customer[]> {
    const url = environment.apiUrl + '/customers';
    return this.http.get<Customer[]>(url);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.configUrl, customer);
  }
}
