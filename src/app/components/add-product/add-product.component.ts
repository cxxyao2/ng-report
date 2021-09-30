import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
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

  constructor() {
    // Create 100 products
    const products = Array.from({ length: 100 }, (_, k) =>
      createNewProduct(k + 1)
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(products);
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
}

/** Builds and returns a new Product. */
function createNewProduct(id: number): Product {
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
