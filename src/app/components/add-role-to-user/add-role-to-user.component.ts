import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { COMMA, TAB, SPACE, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatChipInputEvent } from '@angular/material/chips';
import { User } from 'src/app/models/user';

export interface SearchItem {
  name: string;
}

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.scss'],
})
export class AddRoleToUserComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'locked', 'salesperson', 'manager', 'admin'];

  positionFilter = new FormControl();
  dataSource = new MatTableDataSource([]); // TODO
  nameFilter = new FormControl();
  private filterValues = { id: '', name: '' };
  @ViewChild(MatSort) sort!: MatSort;

  filteredValues = {
    position: '',
    name: '',
    weight: '',
    symbol: '',
    topFilter: false,
  };

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [COMMA, TAB, ENTER];
  searchItems: SearchItem[] = [];

  ngOnInit() {
    this.positionFilter.valueChanges.subscribe((positionFilterValue) => {
      console.log(positionFilterValue);

      this.filteredValues['position'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
    });

    this.nameFilter.valueChanges.subscribe((value) => {
      this.filterValues['name'] = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.dataSource.filterPredicate = this.createFilter();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log('event', event);

    // Add our fruit
    if ((value || '').trim()) {
      this.searchItems.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: SearchItem): void {
    const index = this.searchItems.indexOf(item);

    if (index >= 0) {
      this.searchItems.splice(index, 1);
    }
  }

  applyFilter(filterValue: string) {
    let filter = {
      name: filterValue.trim().toLowerCase(),
      position: filterValue.trim().toLowerCase(),
      topFilter: true,
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let idSearch = data.id.toString().indexOf(searchTerms.id) != -1;
      let nameSearch = () => {
        let found = false;
        searchTerms.name
          .trim()
          .toLowerCase()
          .split(' ')
          .forEach((word: any) => {
            if (data.name.toLowerCase().indexOf(word) != -1) {
              found = true;
            }
          });
        return found;
      };
      return idSearch && nameSearch();
    };
    return filterFunction;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
