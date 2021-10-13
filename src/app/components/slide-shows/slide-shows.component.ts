import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slide-shows',
  templateUrl: './slide-shows.component.html',
  styleUrls: ['./slide-shows.component.scss'],
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
export class SlideShowsComponent implements OnInit, OnDestroy {
  activeSlideIdx = 0;
  slides = [0, 1, 2];
  slideId?: number;

  constructor() {}

  ngOnInit(): void {
    this.slideId = window.setInterval(() => {
      this.plusSlides(1);
    }, 5000);
  }

  ngOnDestroy() {
    window.clearInterval(this.slideId);
  }

  changeSlideManually(incrementIdx: number) {
    window.clearInterval(this.slideId);
    this.plusSlides(incrementIdx);
  }

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
    window.clearInterval(this.slideId);
    this.activeSlideIdx = index;
  }
}
