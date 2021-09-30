import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  cartTotal = 0;
  constructor(
    private cartSrv: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartItems = [...this.cartSrv.items];
    this.cartItems.forEach((item) => {
      this.cartTotal += item.price * item.quantity;
    });
  }

  printInvoice(): void {
    this.router.navigate(['print'], { relativeTo: this.route });
  }
}
