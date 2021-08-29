import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

const CartUrl = '';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(CartUrl);
  }

  addProductToCart(product: Product): Observable<any> {
    return this.http.post(CartUrl, { product });
  }
}
