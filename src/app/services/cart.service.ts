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
    {
      selected: true,
      productId: 'xx',
      productName: 'xx',
      qty: 12,
      price: 12,
      clientId: 'aaa',
      salePersonId: 'bbb',
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
    {
      selected: true,
      productId: 'xx',
      productName: 'xx',
      qty: 13,
      price: 12,
      clientId: 'aaa',
      salePersonId: 'bbb',
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
  ];

  constructor(private http: HttpClient) {}

  getTotal(): number {
    return this.items
      .map((item) => (item.selected ? item.qty : 0))
      .reduce((acc, value) => acc + value, 0);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(CartUrl);
  }

  removeProductFromCart(productId: string) {
    const idx = this.items.findIndex((item) => item.productId === productId);
    if (idx >= 0) {
      this.items.splice(idx, 1);
    }
  }

  addProductToCart(product: Product): Observable<any> {
    // 1, update local array
    // 2, update remote database
    let cartItem = this.items.find((item) => item.id === product.id);
    if (cartItem) {
      cartItem.qty += 1;
    } else {
      cartItem = {
        selected: true,
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price,
        clientId: 'aa',
        salePersonId: 'bb',
        imageUrl: product.imageUrl,
      };
    }
    return this.http.post(CartUrl, cartItem);
  }

  updateProductQtyInCart(productId: string, qty: number): Observable<any> {
    // 1, update local array
    // 2, update remote database
    let cartItem = this.items.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.qty = qty;
      return this.http.post(CartUrl, cartItem);
    } else {
      return of([]); // TODO error 处理
    }
  }
}
