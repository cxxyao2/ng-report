import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { LogfilterComponent } from '../logfilter/logfilter.component';
import { LogRecord } from 'src/app/models/log-record';
import { LogsService } from 'src/app/services/logs.service';

import { of, from as observableFrom, Subject } from 'rxjs';

import {
  catchError,
  concatMap,
  debounceTime,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import {
  ConfirmDialogData,
  DialogService,
} from 'src/app/services/dialog.service';
/**
 * Log Management: Remove Data
 * Sort, filter, Paginator
 */

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  destroy$: Subject<void> = new Subject<void>();

  displayedColumns: string[] = [
    'select',
    'logDate',
    'userName',
    'content',
    'loginIP',
    'star',
  ];
  dataSource = new MatTableDataSource<LogRecord>();

  dialogFilterData: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  showDeleteAlert = true;

  selection = new SelectionModel<LogRecord>(true, []);
  data: LogRecord[] = [];
  errorMessage = '';

  constructor(
    public dialog: MatDialog,
    private logService: LogsService,
    private dialogSrv: DialogService
  ) {}
  ngOnInit() {
    this.logService
      .getLogs()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.data = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  searchDate() {
    if (this.range.get('start')?.errors || this.range.get('end')?.errors) {
      this.errorMessage = 'Please enter valid date range.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
    const startDate = this.range.controls.start.value;
    const endDate = this.range.controls.end.value;

    this.logService
      .getLogs(
        startDate || new Date('Jan 1,1970'),
        endDate || new Date(),
        this.dialogFilterData?.userId,
        this.dialogFilterData?.content
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.dialogFilterData = null;
          this.data = data;
          this.dataSource.data = this.data;
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: LogRecord): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row _id ${
      row._id
    }`;
  }

  deleteAllLogsInSelection(): void {
    const deletedLogs = [...this.selection.selected];
    const errorArray = [];
    if (deletedLogs && deletedLogs.length > 0) {
      observableFrom(deletedLogs)
        .pipe(
          concatMap((log: LogRecord) => {
            return this.logService.deleteLog(log._id).pipe(
              catchError((err) => {
                errorArray.push(err);
                return of('error' + err);
              })
            );
          }),
          takeUntil(this.destroy$)
        )
        .subscribe(
          () => {
            // 1 , delete from data
            deletedLogs.forEach((deleteLog) => {
              let idx = this.data.findIndex((log) => log._id === deleteLog._id);
              if (idx >= 0) {
                this.data.splice(idx, 1);
              }
            });
            this.dataSource.data = this.data;
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
            // 2, delete from selection
            this.selection.clear();
          },
          (err) => {
            this.errorMessage = err;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        );
    }
  }

  deleteLogItem(deletedLog: LogRecord): void {
    let idx = this.data.findIndex((item) => item._id === deletedLog._id);
    if (idx >= 0) {
      this.data.splice(idx, 1);
      this.dataSource.data = this.data;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.logService
        .deleteLog(deletedLog._id)
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
  }

  editLogItem(item: LogRecord): void {
    this.dialogSrv
      .confirmDialog({
        title: 'Log Details',
        message: `userName: ${item.userName} operation: ${item.content}`,
        confirmText: 'OK',
        cancelText: 'Cancel',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  hideDeleteAlert() {
    this.showDeleteAlert = false;
    setTimeout(() => {
      this.showDeleteAlert = true;
    }, 10000); // after 10 seconds
  }

  openDialog(): void {
    this.dialogFilterData = {
      userName: 'Alex',
      content: 'login',
    };
    const dialogRef = this.dialog.open(LogfilterComponent, {
      width: '80%',
      data: this.dialogFilterData,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.dialogFilterData = result;
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
