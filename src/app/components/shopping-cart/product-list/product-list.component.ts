import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SearchProductService } from 'src/app/services/search-product.service';
import { CartService } from 'src/app/services/cart.service';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../../services/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList?: Observable<Product[]>;
  customerControl = new FormControl();
  customers: Customer[] = [];
  filteredOptions?: Observable<Customer[]>;


  constructor(
    private searchSrv: SearchProductService,
    private productService: ProductService,
    private cartSrv: CartService,
    private customerSrv: CustomerService
  ) {}

  ngOnInit(): void {
    // this.productList = this.productService.getProducts();
    this.productList = this.searchSrv.searchTermObs.pipe(
      switchMap((term: any) => {
        return this.productService.getProducts(term);
      })
    );
    this.customerSrv.getCustomers().subscribe((data) => {
      this.customers = [...data];
    });
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
}

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(filterValue)
    );
  }

  updateCurrentCustomer(customer: Customer) {
    this.cartSrv.currentCustomer = { ...customer };
  }
}
