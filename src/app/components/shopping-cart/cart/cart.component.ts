import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
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
    const isValidCustomer = this.cartSrv.currentCustomer?.isAuthorized;
    if (isValidCustomer === undefined || isValidCustomer === false) {
      this.errorMessage =
        'This customer is not yet authorized. Please contact your administrator.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
    let orderHeaderId = '';

    this.cartSrv
      .addCartItemsToOrder()
      .pipe(
        switchMap((data) => {
          orderHeaderId = data.v1.orderHeader;
          return this.cartSrv
            .clearCart()
            .pipe(catchError((err) => of('clear cart error' + err)));
        }),
        takeUntil(this.destroy$)
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
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
