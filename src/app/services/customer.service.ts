import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Customer, CustomerForUpdate } from '../models/customer';
import {
  ReturnWithDataAndMessage,
  ReturnWithMessage,
} from '../models/return-values';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  configUrl = environment.apiUrl + '/customers';

  constructor(private http: HttpClient) {}

  getCustomer(id: string): Observable<Customer> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  getAllAuthorizedCustomers(): Observable<Customer[]> {
    const url = `${this.configUrl}?isAuthorized=true`;
    return this.http.get<Customer[]>(url);
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
