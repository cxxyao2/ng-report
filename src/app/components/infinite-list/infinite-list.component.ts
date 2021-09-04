import { Component, OnInit } from '@angular/core';

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
export class InfiniteListComponent implements OnInit {
  listItems: ImageItem[] = [];

  constructor() {}

  ngOnInit(): void {}
  fetchMore(): void {
    const images = [
      'IuLgi9PWETU',
      'fIq0tET6llw',
      'xcBWeU4ybqs',
      'YW3F-C5e8SE',
      'H90Af2TFqng',
    ];

    const newItems = [];
    for (let i = 0; i < 20; i++) {
      const randomListNumber = Math.round(Math.random() * 100);
      const randomPhotoId = Math.round(Math.random() * 4);
      newItems.push({
        title: 'List Item' + randomListNumber,
        content:
          'This is some description of the list - item #' + randomListNumber,
        image: `https://source.unsplash.com/${images[randomPhotoId]}/50x50`,
      });

      this.listItems = [...this.listItems, ...newItems];
    }
  }
}
