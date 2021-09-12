import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface DayInCalendar {
  dateElement: Date | null;
  isWorkday: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Output() itemEvent = new EventEmitter<DayInCalendar>();
  calendar: DayInCalendar[] = [];
  today = new Date();
  startDayOfCalendar = new Date();

  constructor() {}

  ngOnInit(): void {
    const baseDay = new Date();
    const year = baseDay.getFullYear();
    const month = baseDay.getMonth();
    const date = baseDay.getDate();
    this.today = new Date(year, month, date, 0, 0, 0);
    this.getDaysOfMonth(this.today);
  }

  getDaysOfMonth(baseDay: Date): void {
    const year = baseDay.getFullYear();
    const month = baseDay.getMonth();
    const firstDayOfMonth = new Date(year, month, 1, 0, 0, 0);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    // Get the first day of this month
    const whatDayIsFirst = firstDayOfMonth.getDay();
    this.calendar = [];
    for (let i = 0; i < 35; i++) {
      this.calendar.push({ dateElement: null, isWorkday: false });
    }
    for (let i = 0; i < lastDayOfMonth; i++) {
      const dt = new Date(firstDayOfMonth.getTime());
      dt.setTime(dt.getTime() + 24 * 60 * 60 * 1000 * i);
      const dayInWeek = dt.getDay();
      let isWorkday = false;
      if (dayInWeek < 6 && dt >= this.today) {
        isWorkday = true;
      }

      this.calendar[whatDayIsFirst + i] = {
        dateElement: dt,
        isWorkday,
      };
    }
  }

  getCalendarOfNextMonth(): void {
    const now = this.startDayOfCalendar;
    let current = this.startDayOfCalendar;
    if (now.getMonth() === 11) {
      current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    this.startDayOfCalendar = current;
    this.getDaysOfMonth(this.startDayOfCalendar);
  }

  getCalendarOfLastMonth(): void {
    const now = this.startDayOfCalendar;
    let current = this.startDayOfCalendar;
    if (now.getMonth() === 0) {
      current = new Date(now.getFullYear() - 1, 11, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }
    this.startDayOfCalendar = current;
    this.getDaysOfMonth(this.startDayOfCalendar);
  }

  onClick(event: DayInCalendar): void {
    this.itemEvent.emit(event);
  }
}
