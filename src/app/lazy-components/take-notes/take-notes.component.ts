import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-take-notes',
  templateUrl: './take-notes.component.html',
  styleUrls: ['./take-notes.component.scss'],
})
export class TakeNotesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule],
  declarations: [TakeNotesComponent],
})
export class MyTakeNotesModule {}
