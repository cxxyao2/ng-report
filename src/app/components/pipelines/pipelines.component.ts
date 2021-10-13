import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

import { merge, Observable, of, Subject } from 'rxjs';
import {
  mapTo,
  mergeMap,
  skip,
  switchMap,
  tap,
  takeUntil,
} from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  customers: Customer[] = [];
  updateClick$ = new Subject<void>();
  showNotification$?: Observable<boolean>;
  errorMessage: string | null = null;

  constructor(private customerSrv: CustomerService) {}

  ngOnInit(): void {
    this.customerSrv.createDate = new Date();
    const initialCustomers$ = this.getCustomerOnce();
    const updatedUsers$ = this.updateClick$.pipe(
      mergeMap(() => this.getCustomerOnce()),
      tap(() => {
        this.customerSrv.createDate = new Date();
      })
    );
    merge(initialCustomers$, updatedUsers$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.customers = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );

    const show$ = this.getNew();
    const hide$ = this.updateClick$.pipe(mapTo(false));
    this.showNotification$ = merge(show$, hide$);
  }

  trackPipelineId(index: number, customer: any): string {
    return customer._id;
  }

  getImageSrc(customerId=''): string {
    const apiUrl =
      environment.imageUrl + '/customers' + '/' + customerId + '.jpg';

    // E.X.  https://xxx.xxx.xxx.xx:5000/custoemrs/addd1323.jpg,
    return apiUrl;
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

  authorizeCustomer(id = '') {
    const idx = this.customers.findIndex((customer) => customer._id === id);
    if (idx >= 0) {
      this.customers.splice(idx, 1);
    }
    this.customerSrv
      .updateCustomer(id, { isAuthorized: true })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {},
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
