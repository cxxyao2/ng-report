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
import { Customer } from '../models/customer';

const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 10000; // 10 seconds

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  configUrl = environment.apiUrl + '/customers';
  createDate: Date | null = null;
  private cacheCustomers$?: Observable<Customer[]>;

  constructor(private http: HttpClient) {}

  getAllUnauthorizedCustomers() {
    const url = `${this.configUrl}?isAuthorized=false`;
    return this.http.get<Customer[]>(url);
  }

  getAllAuthorizedCustomers() {
    const url = `${this.configUrl}?isAuthorized=true`;
    return this.http.get<Customer[]>(url);
  }

  get newCustomers() {
    if (!this.cacheCustomers$) {
      const timer$ = timer(0, REFRESH_INTERVAL);
      this.cacheCustomers$ = timer$.pipe(
        switchMap(() => this.requestNewAndUnAuthorizedCustomers()),
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheCustomers$;
  }

  private requestNewAndUnAuthorizedCustomers() {
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

  updateCustomer(id: string, updatePart: any) {
    const url = `${this.configUrl}/${id}`;
    return this.http.put(url, updatePart);
  }
  deleteCustomer(id: string) {
    const url = `${this.configUrl}/${id}`;
    return this.http.delete(url);
  }

  getCustomers(): Observable<Customer[]> {
    const url = environment.apiUrl + '/customers';
    return this.http.get<Customer[]>(url);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.configUrl, customer);
  }
}
