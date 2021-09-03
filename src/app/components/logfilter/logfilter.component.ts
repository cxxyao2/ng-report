import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LogFilterData } from 'src/app/models/log-filter-data';

@Component({
  selector: 'app-logfilter',
  templateUrl: './logfilter.component.html',
  styleUrls: ['./logfilter.component.scss'],
})
export class LogfilterComponent {
  constructor(
    public dialogRef: MatDialogRef<LogfilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogFilterData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
