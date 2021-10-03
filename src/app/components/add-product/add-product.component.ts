import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddProductDetailsComponent } from 'src/app/components/add-product-details/add-product-details.component';

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
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'action',
    'id',
    'name',
    'description',
    'category',
  ];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clickedRows = new Set<Product>();

  constructor(public dialog: MatDialog) {
    // Create 100 products
    const products = Array.from({ length: 100 }, (_, k) =>
      this.createNewProduct(k + 1)
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(products);
  }

  openDialog(): void {
    // todo
    let product: Product = this.createNewProduct(1);
    const dialogRef = this.dialog.open(AddProductDetailsComponent, {
      width: '300px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      product = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  trackProduct(index: number, product: any) {
    return product._id;
  }

  /** Builds and returns a new Product. */
  createNewProduct(id: number): Product {
    const categoryList = ['golden', 'silver', 'iron'];
    const name =
      FRUITS[Math.round(Math.random() * (FRUITS.length - 1))] +
      ' ' +
      FRUITS[Math.round(Math.random() * (FRUITS.length - 1))].charAt(0) +
      '.';

    return {
      _id: id.toString(),
      name,
      description: Math.round(Math.random() * 100).toString(),
      category:
        categoryList[Math.round(Math.random() * (categoryList.length - 1))],
      price: 100,
      stock: 200,
      imageUrl: 'products/e2',
      isOnsale: true,
    };
  }
}
