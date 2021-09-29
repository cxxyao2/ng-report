import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  configUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  getOrder(id: string): Observable<OrderItem> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<OrderItem>(url);
  }

  getOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.configUrl).pipe(retry(1));
  }

  getFilterdOrders(
    startDate: Date,
    endDate: Date,
    salespersonId = ''
  ): Observable<OrderItem[]> {
    // http://localhost:5000/api/Orders?startDate=2021-01-01&endDate=2022-12-01&userName=&content=insert
    const requestUrl = `${this.configUrl}?startDate=${startDate}&endDate=${endDate}&createuser=${salespersonId}`;
    return this.http.get<OrderItem[]>(requestUrl).pipe(retry(1));
  }

  addOrder(content: OrderItem[], customerId: string): void {
    // firstly, save order header
    // secondly, save order detail with header information
    const headerUrl = environment.apiUrl + '/orderheaders';
    this.http
      .post(headerUrl, {
        content,
      })
      .pipe(
        switchMap((headerData: any) => {
          return this.http.post(this.configUrl, {
            ...content,
            headerId: headerData._id,
          });
        })
      )
      .subscribe();
  }
}
