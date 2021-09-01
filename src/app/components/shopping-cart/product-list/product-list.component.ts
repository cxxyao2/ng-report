import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [
    {
      id: '1',
      name: 'a1',
      description:
        'simpeleve technologve technologve technologve technologve technologve technolog',
      category: 'golden',
      price: 12,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
      qtyInStock: 12,
    },
    {
      id: '2',
      name: 'a2',
      description:
        'As automotive technology has advanced in recent decades, automakers around the world agreed that government requirements for fuel additives were not adequate since they have not changed to meet the performance demands of modern vehicles. If a fuel company can prove that their gas has additives and detergents that keep residue from building up on valves or in the combustion chamber, then they are qualified to call themselves a "top-tier" gasoline supplier. Top-tier fuel is formulated to keep engines running efficiently and reliably. Automakers claim that these requirements makes gas better for modern cars.',
      category: 'silver',
      price: 12,
      imageUrl: 'assets/e1_x9ck5u/e1_x9ck5u_c_scale,w_200.jpg',
      qtyInStock: 12,
    },
    {
      id: '3',
      name: 'a3',
      description:
        'Gas stations in the US and many other nations are required to supply customers with consistent and clean gasoline.',
      imageUrl: 'assets/e3_ewhset/e3_ewhset_c_scale,w_200.jpg',
      category: 'iron',
      price: 12,
      qtyInStock: 0,
    },
    {
      id: '4',
      name: 'a3',
      description:
        'Gas stations in the US and many other nations are required to supply customers with consistent and clean gasoline.',
      imageUrl: 'assets/e3_ewhset/e3_ewhset_c_scale,w_200.jpg',
      category: 'iron',
      price: 12,
      qtyInStock: 0,
    },
    {
      id: '5',
      name: 'a3',
      description:
        'Gas stations in the US and many other nations are required to supply customers with consistent and clean gasoline.',
      imageUrl: 'assets/e3_ewhset/e3_ewhset_c_scale,w_200.jpg',
      category: 'iron',
      price: 12,
      qtyInStock: 0,
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.productList = this.productService.getProducts();
  }
  loadProducts() {}

  loadWishList() {}
}
