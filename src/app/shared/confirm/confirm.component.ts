import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmDialogData } from 'src/app/services/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

  ngOnInit(): void {}
}
