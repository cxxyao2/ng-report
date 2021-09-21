import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer';

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

  deleteCustomer(id: string) {
    const url = `${this.configUrl}/${id}`;
    // TODO 正式上传要配置 return this.http.delete(url, { withCredentials: true });
    return this.http.delete(url);
  }

  getCustomers(): Observable<Customer[]> {
    const url = environment.apiUrl + '/customers';
    return this.http.get<Customer[]>(url);
  }

  addCustomer() {
    // name ,categoryId='600103a5ffa4a7376471d64f'
    // code ?
    return this.http.post(this.configUrl, {
      name: 'engine oil ',
      phone: '01-866-555-3333',
      address: 'Roland Barthes Street 12, USA',
    });
  }
}
