import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

const CartUrl = '';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [
    { id: 'xx', productId: 'xx', productName: 'xx', qty: 12, price: 12 },
    { id: 'yy', productId: 'xx', productName: 'xx', qty: 13, price: 12 },
  ];

  constructor(private http: HttpClient) {}

  getTotal() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.qty;
    });
    return total;
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(CartUrl);
  }

  addProductToCart(product: Product): Observable<any> {
    return this.http.post(CartUrl, { product });
  }
}
