import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.scss'],
})
export class AddRoleToUserComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatSort) sort!: MatSort;
  destroy$: Subject<void> = new Subject<void>();
  displayedColumns = ['name', 'locked', 'salesperson', 'manager', 'admin'];
  userArray: User[] = [];
  positionFilter = new FormControl();
  dataSource = new MatTableDataSource<User>();
  nameFilter = new FormControl();
  errorMessage = '';

  constructor(private route: ActivatedRoute, private service: UserService) {}

  ngOnInit(): void {
    this.userArray = this.route.snapshot.data['users'];
    this.dataSource.data = [...this.userArray];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  toggleRole(user: User, columnName: string, columnValue: boolean): void {
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

    this.service
      .updateUser(user._id, updatePart)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {},
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
