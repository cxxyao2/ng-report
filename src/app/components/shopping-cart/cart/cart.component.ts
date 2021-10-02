import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { switchMap } from 'rxjs/operators';

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

  printInvoice(): void {
    const customerId = this.cartSrv.currentCustomer?._id;
    let orderHeaderId = '';

    this.cartSrv
      .addCartItemsOrder()
      .pipe(
        switchMap((data) => {
          console.log('order save data is', data.v1.orderHeader);
          orderHeaderId = data.v1.orderHeader;
          return this.cartSrv.clearCart();
        })
      )
      .subscribe(
        (data) => {
          console.log('clear cart data is', data);
          this.router.navigate(['print', orderHeaderId], {
            queryParams: { customerId },
            relativeTo: this.route,
            queryParamsHandling: 'preserve',
          });
        },
        (err) => {
          console.error('error is', err);
        }
      );

    // if (
    //   result.orderHeaderId !== undefined &&
    //   result.orderHeaderId.trim().length > 0
    // ) {
    //   orderHeaderId = result.orderHeaderId;
    //   this.cartSrv.clearCart().subscribe(
    //     () => {
    //       this.router.navigate(['print', orderHeaderId], {
    //         queryParams: { customerId },
    //         relativeTo: this.route,
    //         queryParamsHandling: 'preserve',
    //       });
    //     },
    //   );
    // }
  }

  // TODO
  // deleteItemFromCart(itemId: string) {
  //   console.log('delete is 1 ', itemId);
  //   console.log('array is ', this.cartItems);
  //   const idx = this.cartItems?.findIndex((item) => item._id === itemId);
  //   if (idx && idx >= 0) {
  //     console.log('delete is 2', itemId);
  //     this.cartItems?.splice(idx, 1);
  //   }
  // }
}
