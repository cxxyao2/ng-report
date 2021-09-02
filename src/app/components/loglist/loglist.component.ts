import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';

export interface LogElement {
  name: string;
  position: number;
  content: string;
  symbol: string; // E -error O - operation
  loginIP: string;
}

const ELEMENT_DATA: LogElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 2,
    name: 'Helium',
    content:
      'delete data into table orders,elete delete delete delete delete delete delete delete ddata is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 3,
    name: 'LithiumLithiumLithiumLithiumLithium',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 4,
    name: 'Beryllium',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 5,
    name: 'Boron',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 6,
    name: 'Carbon',
    content: 'insert data into table orders,data is ...',
    symbol: 'E',
    loginIP: '201.01.11.02',
  },
  {
    position: 7,
    name: 'Nitrogen',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 8,
    name: 'Oxygen',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 9,
    name: 'Fluorine',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
  {
    position: 10,
    name: 'Neon',
    content: 'insert data into table orders,data is ...',
    symbol: 'O',
    loginIP: '201.01.11.01',
  },
];

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit {
  showDeleteAlert = true;
  displayedColumns: string[] = [
    'select',
    'position',
    'symbol',
    'name',
    'content',
    'star',
  ];
  dataSource = new MatTableDataSource<LogElement>(ELEMENT_DATA);
  selection = new SelectionModel<LogElement>(true, []);

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

  hideDeleteAlert(){
    this.showDeleteAlert = false;
  }
}
