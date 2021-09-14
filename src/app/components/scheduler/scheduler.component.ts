import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { DayInCalendar } from '../calendar/calendar.component';

import { DialogService } from 'src/app/services/dialog.service';
import {
  DataListComponent,
  ListElement,
  StringArrayWithTitle,
} from 'src/app/shared/data-list/data-list.component';
import { MatDialog } from '@angular/material/dialog';
export interface ScheduleElement {
  name: string | null;
  period: string;
}

const ELEMENT_DATA: ScheduleElement[] = [
  { name: null, period: '8:00-9:00' },
  { name: null, period: '9:00-10:00' },
  { name: 'Boron', period: '10:00-11:00' },
  { name: 'Carbon', period: '11:00-12:00' },
  { name: 'Nitrogen', period: '12:00-13:00' },
  { name: 'Oxygen', period: '13:00-14:00' },
  { name: 'Fluorine', period: '14:00-15:00' },
  { name: 'Neon', period: '15:00-16:00' },
  { name: 'Oxygen', period: '16:00-17:00' },
];
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  showPersonList = false;
  isValidPerson = false;
  selectedPerson = '';
  selectedDay: Date | null = null;
  allPersons: string[] = [
    'Alex',
    'Bob',
    'Tom',
    'Hans',
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];

  personList: string[] = ['Alex', 'Bob', 'Tom', 'Hans'];

  displayedColumns: string[] = ['action', 'name', 'period'];
  dataSource = [...ELEMENT_DATA];

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  ngOnInit(): void {}

  openDeleteDialog(arg: ScheduleElement) {
    this.dialogService
      .confirmDialog({
        title: 'Scheduling',
        message: 'Are you sure you want to delete this task?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe((confirm) => {
        if (confirm) {
          const idx = this.dataSource.findIndex(
            (element) => element.period === arg.period
          );
          if (idx >= 0) {
            this.dataSource[idx].name = null;
          }
        }
      });
  }

  inputPersonChange(inputPerson: string): void {
    this.isValidPerson = true;
    if (inputPerson.length > 0) {
      this.personList = this.allPersons.filter((person) =>
        person.toLowerCase().includes(inputPerson.toLowerCase())
      );
    } else {
      this.personList = this.allPersons.slice(0);
    }
    this.showPersonList = true;
  }

  selectPersonByEnter(inputPerson: string): void {
    let idx = -1;
    this.isValidPerson = false;
    if (inputPerson.trim().length === 0) {
      this.selectedPerson = '';
      this.isValidPerson = true;
    }
    if (inputPerson.trim().length > 0) {
      this.selectedPerson = inputPerson.trim();
      idx = this.allPersons.findIndex((person) =>
        person.toLowerCase().includes(inputPerson.toLowerCase())
      );
      if (idx >= 0) {
        this.isValidPerson = true;
        this.selectedPerson = this.allPersons[idx];
      }
    }

    this.showPersonList = false;
  }

  getTaskList(): void {
    if (!(this.isValidPerson && this.selectedPerson.length >= 1)) {
      return;
    }
  }
  selectDate(event: DayInCalendar | null): void {
    this.selectedDay = event ? event.dateElement : null;
  }

  selectPerson(event: MatSelectionListChange): void {
    this.showPersonList = false;
    this.isValidPerson = true;
    this.selectedPerson = event.source.selectedOptions.selected[0]?.value;
  }

  addClient(selectedPeriod: ScheduleElement): void {
    const dataList = {
      title: 'Select a Client',
      dataArray: [
        { _id: '1', name: 'aa', other: 'aa1' },
        { _id: '2', name: 'bb', other: 'bb1' },
      ],
    };
    const dialogRef = this.dialog.open(DataListComponent, {
      width: '80%',
      maxWidth: '600px',
      data: dataList,
    });
    dialogRef.afterClosed().subscribe((element) => {
      if (element !== false) {
        const idx = this.dataSource.findIndex(
          (data) => data.period === selectedPeriod.period
        );
        if (idx >= 0) {
          this.dataSource[idx].name = element.name;
        }
      }
    });
  }
}
