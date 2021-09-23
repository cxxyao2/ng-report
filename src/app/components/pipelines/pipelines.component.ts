import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

import { EMPTY, merge, Observable, of, Subject } from 'rxjs';
import {
  mapTo,
  mergeMap,
  skip,
  take,
  switchMap,
  finalize,
  tap,
} from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit {
  customers$?: Observable<Customer[]>;
  updateClick$ = new Subject<void>();
  showNotification$?: Observable<boolean>;

  constructor(private customerSrv: CustomerService) {}

  ngOnInit(): void {
    this.customerSrv.newCustomers.subscribe((data) => {
      console.log(data);
    });
    this.customerSrv.createDate = new Date();
    const initialCustomers$ = this.getCustomerOnce();
    const updatedUsers$ = this.updateClick$.pipe(
      mergeMap(() => this.getCustomerOnce()),
      tap(() => {
        this.customerSrv.createDate = new Date();
      })
    );
    this.customers$ = merge(initialCustomers$, updatedUsers$);

    const show$ = this.getNew();
    const hide$ = this.updateClick$.pipe(mapTo(false));
    this.showNotification$ = merge(show$, hide$);
  }

  trackPipelineId(index: number, customer: any) {
    return customer._id;
  }

  refreshDate() {
    this.updateClick$.next();
  }
  getCustomerOnce() {
    return this.customerSrv.getAllUnauthorizedCustomers();
  }
  getNew() {
    return this.customerSrv.newCustomers.pipe(
      skip(1),
      switchMap((data) => {
        if (data.length > 0) {
          return of(true);
        }
        return of(false);
      })
    );
  }

  updateCustomer(id = '') {
    this.customerSrv.updateCustomer(id, { isAuthorized: true }).subscribe(
      (data) => {
        console.log('data is', data);
      },
      (err) => {}
    );
  }
}
