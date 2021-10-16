import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss'],
})
export class ChangeColorComponent implements OnInit {
  favoriteColor = 'abc';
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    window.alert(this.favoriteColor);
  }
}
