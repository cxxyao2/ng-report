import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [
    {
      selected: true,
      id: '1',
      productId: '1',
      productName:
        'One state may require a minimum octOne state may require a minimum octanOne state may require a minimum octanane',
      qty: 4,
      price: 100,
      stock: 3000,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
    {
      selected: true,
      id: '2',
      productId: '2',
      productName:
        'One state may require a minimum octOne state may require a minimum octanOne state may require a minimum octanane',
      qty: 4,
      price: 100,
      stock: 2000,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
    {
      selected: true,
      id: '3',
      productId: '3',
      productName:
        'One state may require a minimum octOne state may require a minimum octanOne state may require a minimum octanane',
      qty: 4,
      price: 100,
      stock: 1000,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
  ];

  cartTotal = 0;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cartItems.forEach((item) => {
      this.cartTotal += item.price * item.qty;
    });
  }

  printInvoice(): void {
    this.router.navigate(['print'], { relativeTo: this.route });
  }
}
