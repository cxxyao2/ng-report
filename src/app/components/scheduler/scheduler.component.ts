import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { DayInCalendar } from '../calendar/calendar.component';
import { DialogService } from 'src/app/services/dialog.service';
export interface ScheduleElement {
  name: string | null;
  period: string;
}

const ELEMENT_DATA: ScheduleElement[] = [
  { name: null, period: '8:00-9:00' },
  { name: null, period: '8:00-9:00' },
  { name: 'Lithium', period: '8:00-9:00' },
  { name: 'Beryllium', period: '8:00-9:00' },
  { name: 'Boron', period: '8:00-9:00' },
  { name: 'Carbon', period: '8:00-9:00' },
  { name: 'Nitrogen', period: '8:00-9:00' },
  { name: 'Oxygen', period: '8:00-9:00' },
  { name: 'Fluorine', period: '8:00-9:00' },
  { name: 'Neon', period: '8:00-9:00' },
  { name: 'Oxygen', period: '8:00-9:00' },
  { name: 'Fluorine', period: '8:00-9:00' },
  { name: 'Oxygen', period: '8:00-9:00' },
  { name: 'Fluorine', period: '8:00-9:00' },
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
  selectedDay = 'Sep 31,2021';
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
  dataSource = ELEMENT_DATA;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  openDeleteDialog() {
    this.dialogService.confirmDialog({
      title: 'Title',
      message: 'Are you sure you want to do this?',
      confirmText: 'Yes',
      cancelText: 'No',
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
  selectDate(event: DayInCalendar): void {
    console.log(event);
  }

  selectPerson(event: MatSelectionListChange): void {
    this.showPersonList = false;
    this.isValidPerson = true;
    this.selectedPerson = event.source.selectedOptions.selected[0]?.value;
  }
}
