import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
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
export class ProductListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  categories: string[] = ['gas', 'diesel', 'lubricant'];
  chipsControl = new FormControl(['gas']);

  productList: Product[] = [];
  filteredProductList: Product[] = [];
  customerControl = new FormControl();
  customers: Customer[] = [];
  filteredOptions?: Observable<Customer[]>;
  errorMessage = '';
  sub?: Subscription;

  constructor(
    private searchSrv: SearchProductService,
    private productService: ProductService,
    private cartSrv: CartService,
    private customerSrv: CustomerService
  ) {}

  ngOnInit(): void {
    // this.productList = this.productService.getProducts();
    this.sub = this.searchSrv.searchTermObs
      .pipe(
        switchMap((term: string | null) => {
          return this.productService.getProducts(term);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.productList = [...data];
        this.filteredProductList = [...data];
      });
    this.customerSrv
      .getCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.customers = [...data];
      });
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.chipsControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.filteredProductList = [];
        data.forEach((category: string) => {
          const result = this.productList.filter(
            (product) =>
              category.toLowerCase().indexOf(product.category.toLowerCase()) >=
              0
          );
          if (result && result.length >= 1) {
            this.filteredProductList = [...this.filteredProductList, ...result];
          }
        });
      });
  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(filterValue)
    );
  }

  updateCurrentCustomer(customer: Customer): void {
    this.cartSrv.currentCustomer = { ...customer };
    // get cart items
    this.cartSrv
      .getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.cartSrv.items = data;
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
