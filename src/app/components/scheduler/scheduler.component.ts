import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { DayInCalendar } from '../calendar/calendar.component';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  showPersonList = false;
  isValidPerson = false;
  selectedPerson = '';
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

  constructor() {}

  ngOnInit(): void {}

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

    // search button is clicked...
    // 1, set TaskList null
    // 2, set Data to TaskList
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
