import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  configUrl = environment.apiUrl + '/carts';

  items: CartItem[] = [];
  currentCustomer?: Customer;

  constructor(private http: HttpClient, private authSrv: AuthService) {}

  getTotalQuantity(): number {
    return this.items
      .map((item) => (item.selected ? item.quantity : 0))
      .reduce((acc, value) => acc + value, 0);
  }

  getAmount(): number {
    return this.items
      .filter((item) => item.selected === true)
      .reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  getCartItems(customerId?: string): Observable<CartItem[]> {
    const getUrl = this.configUrl + '?customer=' + customerId;
    return this.http.get<CartItem[]>(getUrl);
  }

  removeProductFromCart(_id: string): Observable<CartItem> {
    const idx = this.items.findIndex((item) => item._id === _id);
    if (idx >= 0) {
      this.items.splice(idx, 1);
    }
    const deleteUrl = this.configUrl + '/' + _id;
    return this.http.delete<CartItem>(deleteUrl);
  }

  addProductToCart(product: Product): void {
    // 1, update local array
    // 2, update remote database

    let cartItem = this.items.find((item) => item._id === product._id);
    if (cartItem) {
      cartItem.quantity += 1;
      let putUrl = this.configUrl + '/' + cartItem._id;
      this.http.put(putUrl, { quantity: cartItem.quantity }).subscribe();
    } else {
      const newItem = {
        selected: true,
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        stock: product.stock,
        customerId: this.currentCustomer?._id,
        customerName: this.currentCustomer?.name,
        salespersonId: this.authSrv.currentUser?._id,
        salespersonName: this.authSrv.currentUser?.name,
        imageUrl: product.imageUrl ? product.imageUrl : '',
      };
      this.http.post(this.configUrl, newItem).subscribe((data: any) => {
        const _id = data._id;
        this.items.push({ _id, ...newItem });
      });
    }
  }

  updateProductQtyInCart(_id: string, quantity: number): Observable<any> {
    // 1, update local array
    // 2, update remote database
    let cartItem = this.items.find((item) => item._id === _id);
    if (cartItem) {
      cartItem.quantity = quantity;
      let putUrl = this.configUrl + '/' + _id;
      return this.http.put(putUrl, { quantity });
    } else {
      return of([]); // TODO error
    }
  }
}
