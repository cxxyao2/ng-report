import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ListElement {
  _id: string;
  name: string;
}

export interface StringArrayWithTitle {
  title: string;
  dataArray: ListElement[];
}

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent  {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<ListElement>();

  constructor(
    public dialogRef: MatDialogRef<DataListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StringArrayWithTitle
  ) {
    this.dataSource.data = data.dataArray;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectOneElement(selectedRow: ListElement) {
    this.dialogRef.close(selectedRow);
  }
}
