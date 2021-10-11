import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of, ReplaySubject } from 'rxjs';

import { Product } from 'src/app/models/product';
import { ProductDialogData } from 'src/app/models/product-dialog-data';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddProductDetailsComponent } from 'src/app/components/add-product-details/add-product-details.component';
import { ProductService } from 'src/app/services/product.service';
import { first, switchMap } from 'rxjs/operators';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { environment } from 'src/environments/environment';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'Rislone 34700-4PK',
  'Carbhub 541-0765',
  'RVS Technology G6 Engine ',
  'Hot Shot"s Secret Gasoline',
  'Craftsman 2500-Watt ',
  'HITTIME Fuel ',
  '55 Gallon to 275',
  'NOCO Boost Plus ',
];

/**
 * @title Product Table Based on Observable
 */

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AddProductComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['action', 'name', 'category', 'price', 'stock'];
  dataToDisplay: Product[] = [];
  dataSource = new ProductDataSource(this.dataToDisplay);
  errorMessage = '';
  rowCount = 0;
  expandedElement: Product | null = null; // show collapsed image and descriptions

  constructor(public dialog: MatDialog, private service: ProductService) {}

  ngOnInit() {
    this.service.getProducts().subscribe(
      (data) => {
        this.dataToDisplay = data;
        if (data !== undefined && data !== null) {
          this.rowCount = data.length;
        }
        this.dataSource.setData(this.dataToDisplay);
      },
      (err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  getImageSrc(productItem: Product) {
    const apiUrl = environment.imageUrl + '/' + productItem.imageUrl + '/';

    // products/e2 => https://xxx.xxx.xxx.xx:5000/products/e2/w-200.jpg 200w,

    return apiUrl + 'w_200.jpg';
  }

  addProduct(): void {
    let dialogData: ProductDialogData = {
      isAdd: true,
      product: this.createNewProduct(1),
    };

    const dialogRef = this.dialog.open(AddProductDetailsComponent, {
      width: '100%',
      data: dialogData,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result && 'price' in result) {
            return this.service.addProduct(result);
          } else {
            return of(null);
          }
        }),
        first()
      )
      .subscribe(
        (newProduct) => {
          if (newProduct !== undefined && newProduct !== null) {
            this.updateDataToDisplay(newProduct);
          }
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  updateDataToDisplay(product: Product) {
    const idx = this.dataToDisplay.findIndex(
      (item) => item._id === product?._id
    );
    if (idx >= 0) {
      this.dataToDisplay.splice(idx, 1, product);
    } else {
      this.dataToDisplay.push(product);
    }
    if (this.dataToDisplay !== undefined && this.dataToDisplay !== null) {
      this.rowCount = this.dataToDisplay.length;
    }
    this.dataSource.setData(this.dataToDisplay);
  }

  editProduct(product: Product): void {
    let dialogData: ProductDialogData = {
      isAdd: false,
      product: product,
    };

    const dialogRef = this.dialog.open(AddProductDetailsComponent, {
      width: '100%',
      data: dialogData,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result && 'price' in result) {
            return this.service.updateProduct(result);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (newProduct) => {
          if (newProduct !== undefined && newProduct !== null) {
            this.updateDataToDisplay(newProduct);
          }
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  deleteProduct(product: Product): void {
    const idx = this.dataToDisplay.findIndex(
      (record) => record._id === product._id
    );

    this.service.deleteProduct(product).subscribe(
      () => {},
      (err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
    if (idx >= 0) {
      this.dataToDisplay.splice(idx, 1);
      if (this.dataToDisplay !== undefined && this.dataToDisplay !== null) {
        this.rowCount = this.dataToDisplay.length;
      }
      this.dataSource.setData(this.dataToDisplay);
    }
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    let filteredArray: Product[] = [];
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue === undefined || filterValue.length <= 0) {
      filteredArray = [...this.dataToDisplay];
    } else {
      filteredArray = this.dataToDisplay.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValue) ||
          item.description.toLowerCase().includes(filterValue) ||
          item.price.toString().includes(filterValue) ||
          item.stock.toString().includes(filterValue)
      );
    }
    if (filteredArray !== undefined && filteredArray !== null) {
      this.rowCount = filteredArray.length;
    }
    this.dataSource.setData(filteredArray);
  }

  trackProduct(index: number, product: any) {
    return product._id;
  }

  /** Builds and returns a new Product. */
  createNewProduct(id: number): Product {
    const name =
      FRUITS[Math.round(Math.random() * (FRUITS.length - 1))] +
      ' ' +
      FRUITS[Math.round(Math.random() * (FRUITS.length - 1))].charAt(0) +
      '.';

    return {
      _id: id.toString(),
      name,
      description: '',
      category: 'gas',
      price: 0,
      stock: 0,
      imageUrl: 'products/e2',
      isOnsale: false,
    };
  }
}

class ProductDataSource extends DataSource<Product> {
  private _dataStream = new ReplaySubject<Product[]>();

  constructor(initialData: Product[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Product[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Product[]) {
    this._dataStream.next(data);
  }
}
