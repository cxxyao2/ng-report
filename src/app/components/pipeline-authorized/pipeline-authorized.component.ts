import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

import { Customer } from 'src/app/models/customer';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pipeline-authorized',
  templateUrl: './pipeline-authorized.component.html',
  styleUrls: ['./pipeline-authorized.component.scss'],
})
export class PipelineAuthorizedComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  customers: Customer[] = [];
  errorMessage: string | null = null;

  constructor(private customerSrv: CustomerService) {}

  ngOnInit(): void {
    this.customerSrv
      .getAllAuthorizedCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.customers = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
  }

  trackPipelineId(index: number, customer: any) {
    return customer._id;
  }

  frozeCustomer(id = '') {
    const idx = this.customers.findIndex((customer) => customer._id === id);
    if (idx >= 0) {
      this.customers.splice(idx, 1);
    }
    this.customerSrv.updateCustomer(id, { isAuthorized: false }).subscribe(
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
