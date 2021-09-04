// 3D card, flip to front when tapped

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CardData } from './cardData';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      transition('default=>flipped', [animate('400ms')]),
      transition('flipped=>default', [animate('200ms')]),
    ]),
  ],
})
export class GameCardComponent implements OnInit {
  data: CardData = {
    imageId: 'pDGNBK9A0sk',
    state: 'default',
  };
  constructor() {}

  ngOnInit(): void {}

  cardClicked(): void {
    if (this.data.state === 'default') {
      this.data.state = 'flipped';
    } else {
      this.data.state = 'default';
    }
  }
}
