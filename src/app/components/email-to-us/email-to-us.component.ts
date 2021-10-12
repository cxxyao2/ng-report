import { Component, OnInit } from '@angular/core';

import { routerTransition } from 'src/app/shared/animations/router.animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-email-to-us',
  templateUrl: './email-to-us.component.html',
  styleUrls: ['./email-to-us.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
})
export class EmailToUsComponent implements OnInit {
  name: string = '';
  comments: string = '';
  errorMessage = '';
  successMessage = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmit(myForm: NgForm) {
    this.errorMessage = '';
    this.successMessage = 'Data has been saved successfully.';
    myForm.reset();
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
  

  onReset(myForm: NgForm) {
    this.successMessage = '';
    this.errorMessage = 'Error Code 400: There are problems in Network ';
    myForm.reset();
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

}
