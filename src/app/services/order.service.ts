import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { OrderItem } from '../models/order-item';
import { OrderHeader } from '../models/order-header';

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

  getOrderByHeaderId(headerId: string): Observable<OrderItem[]> {
    const url = `${this.configUrl}?orderHeader=${headerId}`;
    return this.http.get<OrderItem[]>(url);
  }

  getOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.configUrl).pipe(retry(1));
  }

  getFilterdOrders(
    startDate: string,
    endDate: string,
    salespersonId = ''
  ): Observable<OrderItem[]> {
    // http://localhost:5000/api/Orders?startdate=2021-01-01&enddate=2022-12-01&userName=&content=insert
    const requestUrl = `${this.configUrl}?startdate=${startDate}&enddate=${endDate}&createuser=${salespersonId}`;
    return this.http.get<OrderItem[]>(requestUrl).pipe(retry(1));
  }

  getOrderHeaders(
    startDate: string,
    endDate: string,
    salespersonId = ''
  ): Observable<OrderHeader[]> {
    // http(s)://xxx.xxx.xxx.xxx:xxxx/api/orderheaders?startdate=2022-09-12&enddate=2022-09-13&createuser=2322332323
    const requestUrl =
      environment.apiUrl +
      `/orderheaders?startdate=${startDate}&enddate=${endDate}&createuser=${salespersonId}`;
    return this.http.get<OrderHeader[]>(requestUrl).pipe(retry(1));
  }
}
