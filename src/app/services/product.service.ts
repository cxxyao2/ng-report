import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    {
      id: '1',
      name: 'a1',
      description: 'simpele',
      category: 'golden',
      price: 12,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
      qtyInStock: 12,
    },
    {
      id: '1',
      name: 'a1',
      description: 'simpele',
      category: 'golden',
      price: 12,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
      qtyInStock: 12,
    },
    {
      id: '1',
      name: 'a1',
      description: 'simpele',
      category: 'golden',
      price: 12,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
      qtyInStock: 12,
    },
  ];
  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }
}
