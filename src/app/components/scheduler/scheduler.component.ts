import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { DayInCalendar } from '../calendar/calendar.component';

import { DialogService } from 'src/app/services/dialog.service';
import { CustomerService } from '../../services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { ContactPlanService } from 'src/app/services/contact-plan.service';

import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ContactPlan } from '../../models/contact-plan';
import { convertDateToYYYYmmDD } from '../../utils/date-convert.util';

/**
 * mock an autocomplete input
 */
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<ContactPlan>;
  destroy$: Subject<void> = new Subject<void>();

  errorMessage = '';
  showPersonList = false;
  isValidPerson = true;
  selectedPerson: User | null = null;
  selectedDate: Date | null = null;
  selectedCustomer: Customer | null = null;
  allPersons: User[] = [];
  allCustomers: Customer[] = [];
  filterdPerson: User[] = [];
  enteredSalesperson = '';

  displayedColumns: string[] = ['action', 'name', 'period'];
  initPlans: ContactPlan[] = [];
  dataSource: ContactPlan[] = [];

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private customerService: CustomerService,
    private userService: UserService,
    private planService: ContactPlanService
  ) {}

  ngOnInit(): void {
    this.initPlans = createNewContactPlan(8, 17);
    this.dataSource = [...this.initPlans];
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.allPersons = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    this.customerService
      .getCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.allCustomers = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  ngAfterViewInit() {
    if (this.table) this.table.renderRows();
  }

  selectPLanDate(event: DayInCalendar | null): void {
    this.selectedDate = event ? event.dateElement : null;
  }

  /* Custom Data-list: Select Salesperson Begin */
  onInputChange(inputPerson: string): void {
    this.isValidPerson = true;
    this.dataSource = [...this.initPlans];
    this.table.renderRows();
    if (inputPerson.length > 0) {
      this.filterdPerson = this.allPersons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(inputPerson.toLowerCase()) >= 0
      );
    } else {
      this.filterdPerson = this.allPersons.slice(0);
    }
    this.showPersonList = true;
  }

  selectPersonByPressEnter(inputPerson: string): void {
    let idx = -1;
    this.isValidPerson = false;
    this.dataSource = [...this.initPlans];
    this.table.renderRows();
    if (inputPerson.trim().length === 0) {
      this.selectedPerson = null;
      this.enteredSalesperson = '';
      this.isValidPerson = true;
    }
    if (inputPerson.trim().length > 0) {
      idx = this.allPersons.findIndex(
        (person) =>
          person.name.toLowerCase().indexOf(inputPerson.toLowerCase()) >= 0
      );
      if (idx >= 0) {
        this.isValidPerson = true;
        this.selectedPerson = this.allPersons[idx];
        this.enteredSalesperson = this.selectedPerson.name;
      } else {
        this.isValidPerson = false;
        this.selectedPerson = null;
        this.enteredSalesperson = '';
      }
    }
    this.showPersonList = false;
  }

  selectPerson(event: MatSelectionListChange): void {
    this.showPersonList = false;
    this.isValidPerson = true;
    this.selectedPerson = null;
    this.dataSource = [...this.initPlans];
    this.table.renderRows();
    this.enteredSalesperson = event.source.selectedOptions.selected[0].value;
    const findPerson = this.allPersons.find(
      (person) => person.name === this.enteredSalesperson
    );
    if (findPerson) {
      this.selectedPerson = { ...findPerson };
      this.enteredSalesperson = this.selectedPerson.name;
    }
  }
  /* Custom Data-list: Select Salesperson End */

  getTaskList(): void {
    if (this.selectedPerson === null) {
      this.errorMessage = 'Please select  salesperson.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    if (this.selectedDate === null) {
      this.errorMessage = 'Please select  task date.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    const dateString = convertDateToYYYYmmDD(this.selectedDate);

    this.planService
      .getContactPlans(dateString, this.selectedPerson._id || '')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          data.forEach((record) => {
            let per = record.contactPeriod;
            console.log('recod.contactPeriod', record.contactPeriod);
            let idx = -1;

            idx = this.dataSource.findIndex(
              (planItem) => planItem.contactPeriod === per
            );

            if (idx >= 0) {
              this.dataSource.splice(idx, 1, { ...record });
            }
          });
          this.table.renderRows();
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  deletePLan(arg: ContactPlan): void {
    this.dialogService
      .confirmDialog({
        title: 'Scheduling',
        message: 'Are you sure you want to delete this task?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .pipe(
        switchMap((confirm) => {
          if (confirm) {
            return this.planService.deleteContactPlan(arg._id);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          let idx = this.dataSource.findIndex(
            (plan) => plan.contactPeriod === data?.contactPeriod
          );
          if (idx >= 0 && data !== null) {
            this.dataSource[idx].customerId = '';
            this.dataSource[idx].customerName = '';
          }
          this.table.renderRows();
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  addPlan(argPlan: ContactPlan): void {
    if (this.selectedPerson === null) {
      this.errorMessage = 'Please select  salesperson.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    if (this.selectedDate === null) {
      this.errorMessage = 'Please select task date.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    const dateString = convertDateToYYYYmmDD(this.selectedDate);

    const dataList = {
      title: 'Select a Customer',
      dataArray: this.allCustomers,
    };
    const dialogRef = this.dialog.open(DataListComponent, {
      width: '80%',
      maxWidth: '400px',
      data: dataList,
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        switchMap((returnValue) => {
          if (returnValue) {
            this.selectedCustomer = returnValue;
            const addPart = {
              customerId: this.selectedCustomer?._id,
              salespersonId: this.selectedPerson?._id,
              contactDate: dateString,
              contactPeriod: argPlan.contactPeriod,
            };
            return this.planService.addContactPlan(addPart);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          let idx = this.dataSource.findIndex(
            (plan) => plan.contactPeriod === data?.contactPeriod
          );
          if (idx >= 0 && data !== null) {
            this.dataSource[idx]._id = data._id;
            this.dataSource[idx].customerName =
              this.selectedCustomer?.name || '';
            this.dataSource[idx].customerId = this.selectedCustomer?._id || '';
            this.dataSource[idx].salespersonId = this.selectedPerson?._id || '';
          }

          this.table.renderRows();
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  updatePlan(initPlan: ContactPlan): void {
    if (!this.selectedPerson) {
      this.errorMessage = 'Please select salesperson firstly.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    if (!this.selectedDate) {
      this.errorMessage = 'Please select  date firstly.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const dataList = {
      title: 'Select a Customer',
      dataArray: this.allCustomers,
    };
    const dialogRef = this.dialog.open(DataListComponent, {
      width: '80%',
      maxWidth: '400px',
      data: dataList,
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        switchMap((returnValue) => {
          if (returnValue) {
            this.selectedCustomer = returnValue;
            const updatepart = {
              customerId: this.selectedCustomer?._id,
              salespersonId: initPlan.salespersonId,
              contactDate: initPlan.contactDate,
              contactPeriod: initPlan.contactPeriod,
            };
            return this.planService.updateContactPlan(initPlan._id, updatepart);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          const idx = this.dataSource.findIndex(
            (plan) => plan.contactPeriod === data?.contactPeriod
          );
          if (idx >= 0 && data !== null) {
            this.dataSource[idx]._id = data._id;
            this.dataSource[idx].customerName =
              this.selectedCustomer?.name || '';
            this.dataSource[idx].customerId = this.selectedCustomer?._id || '';
          }
          this.table.renderRows();
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

// startHour: 8(:00)  endHour: 17(:00)
function createNewContactPlan(
  startHour: number,
  endHour: number
): ContactPlan[] {
  const planArray: ContactPlan[] = [];
  for (let i = startHour; i < endHour; i++) {
    const start = i.toString();
    const finalStart = start.padStart(2, '0') + ':00'; // 8:00 -> 08:00
    const end = (i + 1).toString();
    const finalEnd = end.padStart(2, '0') + ':00'; // 8:00 -> 08:00
    const plan = {
      _id: '',
      customerId: '',
      customerName: '',
      contactDate: '',
      contactPeriod: `${finalStart}-${finalEnd}`, // 09:00-10:00
      salespersonId: '',
      salespersonName: '',
    };
    planArray.push(plan);
  }

  return planArray;
}
