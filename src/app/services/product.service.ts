import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    {
      id: '1',
      name: '11',
      description: 'description',
      category: '111',
      price: 100,
      imageUrl: '',
    },
    {
      id: '2',
      name: '22',
      description: 'description',
      category: '111',
      price: 100,
      imageUrl: '',
    },
    {
      id: '3',
      name: '33',
      description: 'description',
      category: '111',
      price: 100,
      imageUrl: '',
    },
  ];
  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }
}
