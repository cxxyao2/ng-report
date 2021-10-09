import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  errorMessage = '';

  constructor(
    public cartSrv: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  getCustomerName(): string {
    if (this.cartSrv.currentCustomer) {
      return 'Client: ' + this.cartSrv.currentCustomer.name;
    } else {
      return '';
    }
  }

  printInvoice(): void {
    const customerId = this.cartSrv.currentCustomer?._id;
    let orderHeaderId = '';

    this.cartSrv
      .addCartItemsToOrder()
      .pipe(
        switchMap((data) => {
          console.log('order save data is', data.v1.orderHeader);
          orderHeaderId = data.v1.orderHeader;
          return this.cartSrv
            .clearCart()
            .pipe(catchError((err) => of('clear cart error' + err)));
        })
      )
      .subscribe(
        () => {
          this.cartSrv.items = [];
          this.router.navigate(['print', orderHeaderId], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve',
          });
        },
        (err) => {
          console.error('error is', err);
        }
      );
  }
}
