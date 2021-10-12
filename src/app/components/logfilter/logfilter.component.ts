import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-logfilter',
  templateUrl: './logfilter.component.html',
  styleUrls: ['./logfilter.component.scss'],
})
export class LogfilterComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  contentControl = new FormControl('', Validators.maxLength(10));
  myForm!: FormGroup;
  userArray: User[] = [];
  errorMessage = '';
  filteredOptions = new Observable<User[]>();

  constructor(
    private service: UserService,
    public dialogRef: MatDialogRef<LogfilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myForm = new FormGroup({
      name: this.nameControl,
      content: this.contentControl,
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.service
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.userArray = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    this.filteredOptions = this.nameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.userArray.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    if (this.myForm.touched && this.nameControl.errors) {
      this.errorMessage = 'Please enter valid name. Max length is 10.';
      return;
    }
    if (this.contentControl.errors) {
      this.errorMessage = 'Please enter valid content. Max length is 10.';
      return;
    }

    let userId: string | null = null;
    if (this.nameControl.value.trim().length > 0) {
      const idx = this.userArray.findIndex(
        (item) =>
          item.name.toLowerCase() ===
          this.nameControl.value.trim().toLowerCase()
      );

      if (idx >= 0) {
        userId = this.userArray[idx]._id || '';
      } else {
        this.errorMessage = 'Please enter valid name. Max length is 10.';
        return;
      }
    }

    this.dialogRef.close({
      userId,
      content: this.contentControl.value.trim(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
