import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { SelectionModel } from '@angular/cdk/collections';

import { LogfilterComponent } from '../logfilter/logfilter.component';
import { MatTableDataSource } from '@angular/material/table';
import { LogFilterData } from 'src/app/models/log-filter-data';
export interface LogElement {
  name: string;
  position: number;
  content: string;
  symbol: string; // E -error O - operation
  logDate: Date;
  loginIP: string;
}

const ELEMENT_DATA: LogElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 2,
    name: 'Helium',
    content:
      'delete data into table orders,elete delete delete delete delete delete delete delete ddata is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 3,
    name: 'LithiumLithiumLithiumLithiumLithium',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 4,
    name: 'Beryllium',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 5,
    name: 'Boron',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 6,
    name: 'Carbon',
    content: 'insert data into table orders,data is ...',
    symbol: 'E',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.02',
  },
  {
    position: 7,
    name: 'Nitrogen',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 8,
    name: 'Oxygen',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 9,
    name: 'Fluorine',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    logDate: new Date('2021-09-01'),
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
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
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  showDeleteAlert = true;
  displayedColumns: string[] = [
    'select',
    'position',
    'symbol',
    'logDate',
    'name',
    'content',
    'star',
  ];
  dataSource = new MatTableDataSource<LogElement>(ELEMENT_DATA);
  selection = new SelectionModel<LogElement>(true, []);

  constructor(public dialog: MatDialog) {}
  ngOnInit() {}
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: LogElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  deleteLogItem(itemPosition: any): void {
    console.log('position is ', itemPosition);
    // TODO
  }

  editLogItem(item: LogElement): void {
    // TODO call a edit dialog
    console.log('position is ', item);
  }

  hideDeleteAlert() {
    this.showDeleteAlert = false;
  }

  openDialog(): void {
    let filterData: LogFilterData = {
      username: 'aa',
      content: 'bb',
    };
    const dialogRef = this.dialog.open(LogfilterComponent, {
      width: '250px',
      data: filterData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      filterData = result;
    });
  }
}
