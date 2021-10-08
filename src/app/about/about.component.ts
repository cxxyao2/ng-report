import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  categories: string[] = ['Clothing', 'Shoes', 'Electronics', 'Books'];
  chipsControl = new FormControl(['Books']);
  chipsControlValue$ = this.chipsControl.valueChanges;
  disabledControl = new FormControl(false);

  setChipsValue(): void {
    this.chipsControl.setValue(['Shoes', 'Electronics']);
  }
  constructor() {}

  ngOnInit(): void {
    this.disabledControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (val) {
          this.chipsControl.disable();
        } else {
          this.chipsControl.enable();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
