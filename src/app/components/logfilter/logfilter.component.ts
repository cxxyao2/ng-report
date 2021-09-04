import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LogRecord } from 'src/app/models/log-record';

@Component({
  selector: 'app-logfilter',
  templateUrl: './logfilter.component.html',
  styleUrls: ['./logfilter.component.scss'],
})
export class LogfilterComponent {
  constructor(
    public dialogRef: MatDialogRef<LogfilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogRecord
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
