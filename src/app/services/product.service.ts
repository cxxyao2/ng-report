import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  configUrl = environment.apiUrl + '/products';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(productName = ''): Observable<Product[]> {
    const requestUrl = `${this.configUrl}?productName=${productName}`;
    return this.http.get<Product[]>(requestUrl).pipe(retry(1));
  }
}
