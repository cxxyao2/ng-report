import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  categories: string[] = ['Clothing', 'Shoes', 'Electronics', 'Books'];
  chipsControl = new FormControl(['Books']);
  chipsControlValue$ = this.chipsControl.valueChanges;
  disabledControl = new FormControl(false);
  sub?: Subscription;
  setChipsValue(): void {
    this.chipsControl.setValue(['Shoes', 'Electronics']);
  }
  constructor() {}

  ngOnInit(): void {
    this.sub = this.disabledControl.valueChanges.subscribe((val) => {
      if (val) {
        this.chipsControl.disable();
      } else {
        this.chipsControl.enable();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
