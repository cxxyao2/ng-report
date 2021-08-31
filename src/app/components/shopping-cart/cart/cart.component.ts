import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';

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
      productName: 'xxx',
      qty: 4,
      price: 100,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
    {
      selected: true,
      id: '2',
      productId: '2',
      productName: 'yyy',
      qty: 4,
      price: 100,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
    {
      selected: true,
      id: '3',
      productId: '3',
      productName: 'zzz',
      qty: 4,
      price: 100,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
    },
  ];

  cartTotal = 0;
  constructor() {}

  ngOnInit(): void {
    this.cartItems.forEach((item) => {
      this.cartTotal += item.price * item.qty;
    });
  }
}
