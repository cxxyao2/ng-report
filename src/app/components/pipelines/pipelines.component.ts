import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerAuthorizeService } from 'src/app/services/customer-authorize.service';

import { merge, Observable, of, Subject, timer } from 'rxjs';
import {
  mapTo,
  mergeMap,
  skip,
  switchMap,
  tap,
  takeUntil,
  shareReplay,
} from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { environment } from 'src/environments/environment';

const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 10000; // 10 seconds

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
  providers: [CustomerAuthorizeService],
})
export class PipelinesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  customers: Customer[] = [];
  updateClick$ = new Subject<void>();
  showNotification$?: Observable<boolean>;
  errorMessage: string | null = null;
  cacheCustomers$?: Observable<Customer[]>;

  constructor(private customerSrv: CustomerAuthorizeService) {}

  ngOnInit(): void {
    this.customerSrv.createDate = new Date();
    const initialCustomers$ = this.getCustomerOnce();
    const updatedUsers$ = this.updateClick$.pipe(
      mergeMap(() => this.getCustomerOnce()),
      tap(() => {
        this.customerSrv.createDate = new Date();
      }),
      takeUntil(this.destroy$)
    );
    merge(initialCustomers$, updatedUsers$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Customer[]) => {
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
    const hide$ = this.updateClick$.pipe(
      mapTo(false)
    );
    this.showNotification$ = merge(show$, hide$);
  }

  trackPipelineId(index: number, customer: Customer): string {
    return customer._id || '';
  }

  getImageSrc(customerId = ''): string {
    const apiUrl =
      environment.imageUrl + '/customers' + '/' + customerId + '.jpg';

    // E.X.  https://xxx.xxx.xxx.xx:5000/custoemrs/addd1323.jpg,
    return apiUrl;
  }

  refreshDate() {
    this.updateClick$.next();
  }

  getCustomerOnce() {
    return this.customerSrv
      .getAllUnauthorizedCustomers();
  }

  getNew() {
    return this.newCustomers.pipe(
      skip(1),
      switchMap((data) => {
        if (data.length > 0) {
          return of(true);
        }
        return of(false);
      }),
      takeUntil(this.destroy$)
    );
  }

  get newCustomers(): Observable<Customer[]> {
    if (!this.cacheCustomers$) {
      const timer$ = timer(0, REFRESH_INTERVAL).pipe(takeUntil(this.destroy$));
      this.cacheCustomers$ = timer$.pipe(
        switchMap(() => this.customerSrv.requestNewAndUnAuthorizedCustomers()),
        shareReplay(CACHE_SIZE),
        takeUntil(this.destroy$)
      );
    }
    return this.cacheCustomers$;
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
