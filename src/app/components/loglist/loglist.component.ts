import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { SelectionModel } from '@angular/cdk/collections';

import { LogfilterComponent } from '../logfilter/logfilter.component';
import { LogRecord } from 'src/app/models/log-record';
import { LogsService } from 'src/app/services/logs.service';
import { merge, of, scheduled, Subject } from 'rxjs';
import {
  catchError,
  mergeAll,
  switchMap,
  debounceTime,
  mergeMap,
  flatMap,
  tap,
  map,
  delay,
} from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

const ELEMENT_DATA: LogRecord[] = [
  {
    _id: '1',
    userName: 'Hydrogen',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '2',
    userName: 'Helium',
    content:
      'delete data into table orders,elete delete delete delete delete delete delete delete ddata is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '3',
    userName: 'LithiumLithiumLithiumLithiumLithium',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '4',
    userName: 'Beryllium',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '5',
    userName: 'Boron',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '6',
    userName: 'Carbon',
    content: 'insert data into table orders,data is ...',
    logType: 'E',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.02',
  },
  {
    _id: '7',
    userName: 'Nitrogen',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '8',
    userName: 'Oxygen',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '9',
    userName: 'Fluorine',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    _id: '10',
    userName: 'Neon',
    content: 'insert data into table orders,data is ...',
    logType: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
];

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit {
  dialogFilterData?: LogRecord | null;
  dialogSubject = new Subject<LogRecord>();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  showDeleteAlert = true;
  displayedColumns: string[] = [
    'select',
    '_id',
    'logType',
    'logDate',
    'userName',
    'content',
    'loginIP',
    'star',
  ];

  selection = new SelectionModel<LogRecord>(true, []);
  data: LogRecord[] = [];

  constructor(
    public dialog: MatDialog,
    private logService: LogsService,
    private loading: LoadingService
  ) {}
  ngOnInit() {
    this.logService
      .getLogs()
      .pipe(tap(() => this.loading.show()))
      .subscribe(
        (data) => {
          this.data = data;
        },
        (err) => {
          console.log('error is', err);
        },
        () => {
          setTimeout(() => this.loading.hide(), 1000);
        }
      );

    merge(
      this.range.controls.end.valueChanges,
      this.range.controls.start.valueChanges,
      this.dialogSubject
    )
      .pipe(
        switchMap(() =>
          this.logService.getFilterdLogs(
            this.range.controls.start.value || new Date('Jan 1,1970'),
            this.range.controls.end.value || new Date(),
            this.dialogFilterData?.userName || '',
            this.dialogFilterData?.content || ''
          )
        )
      )
      .subscribe(
        (data: any) => {
          this.data = data;
        },
        (err) => console.log('error', err)
      );
    // this.range.controls.end.valueChanges.subscribe((data) =>
    //   console.log('data is ', data)
    //scheduled([ob1, ob2, ob3], scheduled).pipe(mergeAll());
    // );
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: LogRecord): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row _id ${
      row._id
    }`;
  }

  deleteLogItem(_id: string): void {
    console.log('_id is ', _id);
    // TODO
  }

  editLogItem(item: LogRecord): void {
    // TODO call a edit dialog
    console.log('_id is ', item);
  }

  hideDeleteAlert() {
    this.showDeleteAlert = false;
  }

  openDialog(): void {
    this.dialogFilterData = {
      userName: 'aa',
      content: 'bb',
    };
    const dialogRef = this.dialog.open(LogfilterComponent, {
      width: '250px',
      data: this.dialogFilterData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.dialogFilterData = result;
      this.dialogSubject.next(result);
    });
  }
}
