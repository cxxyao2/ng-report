import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];

  personList: string[] = ['Alex', 'Bob', 'Tom', 'Hans'];

  calendar: string[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 35; i++) {
      this.calendar.push('');
    }
    this.getCalendarOfThisMonth();
  }

  getCalendarOfThisMonth(): void {
    // calculate the calendar array
    // get the first day of this month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const whatDayIsFirst = firstDayOfMonth.getDay();
    for (let i = 0; i < lastDayOfMonth; i++) {
      this.calendar[whatDayIsFirst + i] = (i + 1).toString();
    }
  }
  getCalendarOfNextMonth(): void {
    for (let i = 0; i < 35; i++) {
      this.calendar[i] = '';
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const whatDayIsFirst = firstDayOfMonth.getDay();
    for (let i = 0; i < lastDayOfMonth; i++) {
      this.calendar[whatDayIsFirst + i] = (i + 1).toString();
    }
  }
  getCalendarOfLastMonth(): void {
    this.calendar = ['', '', '1', '2', '28'];
  }
}
