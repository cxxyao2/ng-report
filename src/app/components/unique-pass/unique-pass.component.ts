import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unique-pass',
  templateUrl: './unique-pass.component.html',
  styleUrls: ['./unique-pass.component.scss'],
})
export class UniquePassComponent implements OnInit {
  public model = {
    newPassword: '',
    newRepeatPassword: '',
  };
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.model = {
      newPassword: 'aaa',
      newRepeatPassword: 'aaa',
    };
  }
}
