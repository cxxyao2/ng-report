import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { constants } from 'src/app/config/constants';
import { map } from 'rxjs/operators';

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
    console.log('hi,product is', product);
    console.log('items is', this.items);
    let cartItem = this.items.find((item) => item.productId === product._id);
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
        console.log('new ');
        const _id = data._id;
        this.items.push({ _id, ...newItem });
      });
    }
  }

  updateProductQtyInCart(_id: string, quantity: number): Observable<any> {
    // 1, update local array
    // 2, update remote database
    let cartItem = this.items.find((item) => item.productId === _id);
    if (cartItem) {
      cartItem.quantity = quantity;
      let putUrl = this.configUrl + '/' + _id;
      return this.http.put(putUrl, { quantity });
    } else {
      return of([]);
    }
  }

  addCartItemsOrder() {
    const orderDetailUrl = environment.apiUrl + '/orders';
    // firstly, save order header
    // secondly, save order detail with header information
    const headerUrl = environment.apiUrl + '/orderheaders';
    const orderDate = new Date();
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth() + 1;
    const day = orderDate.getDate();
    let monthString = '';
    if (month < 10) {
      monthString = '0' + month;
    }
    const orderDateString = year.toString() + '-' + monthString + '-' + day;

    const subTotal = this.getAmount();
    const taxTPS = subTotal * constants.tps;
    const taxTVQ = subTotal * constants.tvq;
    const total = subTotal + taxTPS + taxTVQ;

    this.http
      .post(headerUrl, {
        customerId: this.currentCustomer?._id,
        orderDate: orderDateString,
      })
      .subscribe((headerData: any) => {
        const productItems = [...this.items];
        for (const item of productItems) {
          // 1,add to order
          if (item.selected) {
            this.http
              .post(orderDetailUrl, {
                orderHeader: headerData._id,
                orderDate: headerData.orderDate,
                customerId: this.currentCustomer?._id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                amount: item.price * item.quantity,
              })
              .subscribe();
          }
          // 2,remove from cart
          this.removeProductFromCart(item._id).subscribe();
        }

        // 3, send an email

        this.authSrv
          .sendPlaceOrderEmail(
            this.currentCustomer?.email,
            this.currentCustomer?.name,
            subTotal,
            taxTPS + taxTVQ,
            total
          )
          .subscribe();
      });
  }
}
