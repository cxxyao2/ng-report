import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { OrderService } from 'src/app/services/order.service';
import { OrderHeader } from '../../models/order-header';
import { OrderItem } from '../../models/order-item';
import { AuthService } from 'src/app/services/auth.service';
import { convertDateToYYYYmmDD } from '../../utils/date-convert.util';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.scss'],
})
export class OrderQueryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedRow: OrderHeader | null = null;
  destroy$: Subject<void> = new Subject<void>();
  dataSource = new MatTableDataSource<OrderHeader>();
  detailsDataSource = new MatTableDataSource<OrderItem>();

  displayedColumns: string[] = ['position', 'customer', 'date', 'salesperson'];
  detailsDisplayedColumns: string[] = [
    'position',
    'product',
    'price',
    'quantity',
    'amount',
  ];

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  errorMessage = '';

  constructor(
    private orderSrv: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getOrderHeaders(): void {
    if (this.range.get('start')?.errors || this.range.get('end')?.errors) {
      this.errorMessage = 'Please enter valid date range.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
    this.dataSource.data = [];
    this.detailsDataSource.data = [];

    const startDate = this.range.controls.start.value;
    const endDate = this.range.controls.end.value;
    const personId = this.authService.currentUser?._id || '';
    const startString = convertDateToYYYYmmDD(startDate);
    const endString = convertDateToYYYYmmDD(endDate);
    this.orderSrv
      .getOrderHeaders(startString, endString, personId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  getOrderDetails(row: OrderHeader): void {
    this.selectedRow = row;
    const orderHeaderId = row._id || '';

    this.orderSrv
      .getOrderByHeaderId(orderHeaderId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.detailsDataSource.data = data;
        },
        (err) => {
          this.detailsDataSource.data = [];
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
