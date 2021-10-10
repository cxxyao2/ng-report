import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({
          position: 'absolute',
          left: '0',
          top: '0',
          transform: 'translateX(-100%)',
        }),
        animate(1000),
      ]),
      transition('* => void', [
        animate(
          1000,
          style({
            position: 'absolute',
            left: '0',
            top: '0',
            opacity: 0,
            transform: 'translateX(100%)',
          })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  activeSlideIdx = 0;
  slides = [0, 1, 2];
  constructor() {}

  ngOnInit(): void {}

  plusSlides(incrementIdx: number): void {
    this.activeSlideIdx += incrementIdx;
    if (this.activeSlideIdx > 2) {
      this.activeSlideIdx = 0;
    }
    if (this.activeSlideIdx < 0) {
      this.activeSlideIdx = 2;
    }
  }

  jumpToSlide(index: number): void {
    console.log('hi', index);
    this.activeSlideIdx = index;
  }
}
