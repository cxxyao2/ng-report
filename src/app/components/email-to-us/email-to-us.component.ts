import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-email-to-us',
  templateUrl: './email-to-us.component.html',
  styleUrls: ['./email-to-us.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({ height: '600px', opacity: 1, backgroundColor: 'yellow' })
      ),
      state(
        'closed',
        style({ height: '100px', opacity: 0.8, backgroundColor: '#c6ecff' })
      ),
      transition('open=>closed', [animate('400ms')]),
      transition('closed=>open', [animate('200ms')]),
    ]),
  ],
})
export class EmailToUsComponent implements OnInit {
  isOpen = true;

  constructor() {}

  ngOnInit(): void {}
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
