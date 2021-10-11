import { Component, OnInit } from '@angular/core';

import { routerTransition } from 'src/app/shared/animations/router.animations';

@Component({
  selector: 'app-email-to-us',
  templateUrl: './email-to-us.component.html',
  styleUrls: ['./email-to-us.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
})
export class EmailToUsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
  
}
