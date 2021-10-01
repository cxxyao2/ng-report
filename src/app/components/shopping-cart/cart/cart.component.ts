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
  errorMessage = '';
  constructor(
    public cartSrv: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  printInvoice(): void {
    this.cartSrv.addCartItemsOrder();
    this.router.navigate(['print'], { relativeTo: this.route });
  }
}
