import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

import { Customer } from 'src/app/models/customer';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-pipeline-all',
  templateUrl: './pipeline-all.component.html',
  styleUrls: ['./pipeline-all.component.scss'],
})
export class PipelineAllComponent implements OnInit {
  initCustomers: Customer[] = [];
  customers: Customer[] = [];
  errorMessage: string | null = null;
  criteria = new FormControl();

  constructor(private customerSrv: CustomerService) {}

  ngOnInit(): void {
    this.customerSrv.getCustomers().subscribe(
      (data) => {
        this.initCustomers = data;
        this.customers = [...this.initCustomers];
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

  search() {
    if (this.criteria.value.trim().length > 0) {
      const searchTerm = this.criteria.value.trim().toLowerCase();
      this.customers = this.initCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.customers = [...this.initCustomers];
    }
  }
}