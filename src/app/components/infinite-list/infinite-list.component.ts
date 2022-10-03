import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { filter, map, pairwise, throttleTime, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

export interface ImageItem {
  title: string;
  content: string;
  image: string;
}
@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
})
export class InfiniteListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  destroy$: Subject<void> = new Subject<void>();

  listItems: ImageItem[] = [];
  loading = false;

  constructor(private ngZone: NgZone) {}
  ngOnInit(): void {
    this.fetchMore();
  }

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        //  the CDK virtual scroller runs outside the ngZone for performance reasons.
        this.ngZone.run(() => {
          this.fetchMore();
        });
      });
  }
  
  fetchMore(): void {
    const images = [
      'IuLgi9PWETU',
      'fIq0tET6llw',
      'xcBWeU4ybqs',
      'YW3F-C5e8SE',
      'H90Af2TFqng',
    ];

    const newItems: ImageItem[] = [];
    for (let i = 0; i < 20; i++) {
      const randomListNumber = Math.round(Math.random() * 100);
      const randomPhotoId = Math.round(Math.random() * 4);
      newItems.push({
        title: 'List Item' + randomListNumber,
        content:
          'This is some description of the list - item #' + randomListNumber,
        image: `https://source.unsplash.com/${images[randomPhotoId]}/50x50`,
      });
      this.loading = true;
      timer(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
          this.listItems = [...this.listItems, ...newItems];
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
