import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.scss'],
})
export class AddRoleToUserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['name', 'locked', 'salesperson', 'manager', 'admin'];
  userArray: User[] = [];
  positionFilter = new FormControl();
  dataSource = new MatTableDataSource();
  nameFilter = new FormControl();
  errorMessage = '';

  constructor(private service: UserService) {}

  ngOnInit() {
    this.service.getUsers().subscribe(
      (data) => {
        this.userArray = data;
        this.dataSource.data = data;
      },
      (err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  toggleRole(user: User, columnName: string, columnValue: boolean) {
    let updatePart;
    const idx = this.userArray.findIndex((item) => item._id === user._id);
    if (idx < 0) {
      return;
    }
    const newUser = { ...this.userArray[idx] };

    switch (columnName) {
      case 'isFrozen':
        updatePart = { isFrozen: columnValue };
        newUser.isFrozen = columnValue;
        break;
      case 'isAdmin':
        updatePart = { isAdmin: columnValue };
        newUser.isAdmin = columnValue;
        break;
      case 'isManager':
        updatePart = { isManager: columnValue };
        newUser.isManager = columnValue;
        break;
      case 'isSalesperson':
        updatePart = { isSalesperson: columnValue };
        newUser.isSalesperson = columnValue;
        break;
    }

    this.userArray.splice(idx, 1, { ...newUser });

    this.service.updateUser(user._id, updatePart).subscribe(
      () => {},
      (err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}
