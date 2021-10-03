import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ConfigurableFocusTrap } from '@angular/cdk/a11y';

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

  updateProduct(product: Product): Observable<Product> {
    const updateUrl = `${this.configUrl}/${product._id}`;
    return this.http.put<Product>(updateUrl, product);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.configUrl, product);
  }
}
