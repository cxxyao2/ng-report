import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { OrderItem } from '../models/order-item';
import { CartItem } from '../models/cart-item';
import { CartService } from './cart.service';

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
    const url = `${this.configUrl}/orderHeader=${headerId}`;
    return this.http.get<OrderItem[]>(url);
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
}
