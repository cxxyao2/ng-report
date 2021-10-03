import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from as observableFrom, forkJoin, zip } from 'rxjs';

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { constants } from 'src/app/config/constants';
import { concatMap, switchMap, catchError } from 'rxjs/operators';

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

  getCartItems(): Observable<CartItem[]> {
    const customer = this.currentCustomer?._id;
    const createUser = this.authSrv.currentUser?._id;
    const getUrl =
      this.configUrl + '?createUser=' + createUser + '&customer=' + customer;
    return this.http.get<CartItem[]>(getUrl);
  }

  removeProductFromCart(id: string): Observable<any> {
    const idx = this.items.findIndex((item) => item._id === id);
    if (idx >= 0) {
      this.items.splice(idx, 1);
    }
    const deleteUrl = this.configUrl + '?id=' + id;
    return this.http.delete(deleteUrl);
  }

  clearCart(): Observable<any> {
    const customerId = this.currentCustomer?._id;
    const createUserId = this.authSrv.currentUser?._id;
    const deleteUrl =
      this.configUrl +
      '?customer=' +
      customerId +
      '&createUser=' +
      createUserId;
    return this.http.delete(deleteUrl);
  }

  addProductToCart(product: Product): void {
    // 1, update local array
    // 2, update remote database
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
        const _id = data._id;
        this.items.push({ _id, ...newItem });
      });
    }
  }

  updateProductQtyInCart(_id: string, quantity: number): Observable<any> {
    // 1, update local array
    // 2, update remote database
    const cartItem = this.items.find((item) => item._id === _id);
    if (cartItem) {
      cartItem.quantity = quantity;
      const putUrl = this.configUrl + '/' + _id;
      return this.http.put(putUrl, { quantity });
    } else {
      return of([]);
    }
  }

  toggleProductSelected(_id: string, selected: boolean): Observable<any> {
    const idx = this.items.findIndex((item) => item._id === _id);

    if (idx >= 0) {
      const cartItem = { ...this.items[idx] };
      cartItem.selected = selected;
      this.items.splice(idx, 1, cartItem);
      const putUrl = this.configUrl + '/' + _id;
      return this.http.put(putUrl, { selected });
    } else {
      return of([]);
    }
  }

  addCartItemsToOrder(): Observable<any> {
    const orderDetailUrl = environment.apiUrl + '/orders';
    // firstly, save order header
    // secondly, save order detail with header information
    const headerUrl = environment.apiUrl + '/orderheaders';
    const orderDate = new Date();
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth() + 1;
    const day = orderDate.getDate();

    let monthString = month.toString();
    if (month < 10) {
      monthString = '0' + month;
    }
    const orderDateString = year.toString() + '-' + monthString + '-' + day;

    const subTotal = this.getAmount();
    const taxTPS = subTotal * constants.tps;
    const taxTVQ = subTotal * constants.tvq;
    const total = subTotal + taxTPS + taxTVQ;

    const selectedItems = this.items.filter((item) => item.selected === true);

    // 1,add to order header
    return this.http
      .post(headerUrl, {
        customerId: this.currentCustomer?._id,
        orderDate: orderDateString,
      })
      .pipe(
        catchError((err) => of('orderHeader save error ' + err)),
        switchMap((headerData: any) => {
          return forkJoin({
            v1: observableFrom(selectedItems).pipe(
              concatMap((item) => {
                return this.http
                  .post(orderDetailUrl, {
                    orderHeader: headerData._id,
                    orderDate: headerData.orderDate,
                    customerId: this.currentCustomer?._id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    amount: item.price * item.quantity,
                  })
                  .pipe(
                    catchError((err) => {
                      return of('order detail save error' + err);
                    })
                  );
              })
            ),
            v2: this.authSrv
              .sendPlaceOrderEmail(
                this.currentCustomer?.email,
                this.currentCustomer?.name,
                subTotal,
                taxTPS + taxTVQ,
                total
              )
              .pipe(
                catchError((err) => {
                  console.log(
                    'email error , email is ',
                    this.currentCustomer?.email,
                    JSON.stringify(err)
                  );
                  return of('send email error is' + err);
                })
              ),
          });
        })
      );
  }
}
