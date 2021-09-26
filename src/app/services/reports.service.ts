import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer, throwError } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  configUrl = environment.apiUrl + '/reports';

  constructor(private http: HttpClient) {}

  getSpecificMonthProductSalesData(
    year: number,
    month: number
  ): Observable<[]> {
    // Jan: 0, Feb: 1,...
    const url = `${this.configUrl}/monthly-product?year=${year}&month=${month}`;
    console.log('url is', url);
    return this.http.get<[]>(url);
  }

  getSpecificMonthCustomerSalesData(
    year: number,
    month: number
  ): Observable<[]> {
    // Jan: 0, Feb: 1,...
    const url = `${this.configUrl}/monthly-customer?year=${year}&month=${month}`;
    return this.http.get<[]>(url);
  }

  getSpecificMonthSalespersonSalesData(
    year: number,
    month: number
  ): Observable<[]> {
    // Jan: 0, Feb: 1,...
    const url = `${this.configUrl}/monthly-salesperson?year=${year}&month=${month}`;
    return this.http.get<[]>(url);
  }

  getSpecificMonthInitSalesData(year: number, month: number): Observable<[]> {
    // Jan: 0, Feb: 1,...
    const url = `${this.configUrl}/monthly-initdata?year=${year}&month=${month}`;
    return this.http.get<[]>(url);
  }
}
