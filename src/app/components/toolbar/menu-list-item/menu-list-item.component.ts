import {
  Component,
  HostBinding,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { NavItem } from 'src/app/models/nav-item';
import { NavService } from 'src/app/services/nav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg' })),
      transition('expanded <=> collapsed', animate('225ms')),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth?: number;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.navService.currentUrl
      .pipe(takeUntil(this.destroy$))
      .subscribe((url) => {
        if (this.item.route && url) {
          this.expanded = url.indexOf(`/${this.item.route}`) === 0;
          this.ariaExpanded = this.expanded;
        }
      });
  }

  onItemSelected(item: NavItem): void {
    if (!item.children || !item.children.length) {
      if (this.navService.appDrawer.mode === 'over') {
        this.router.navigate([item.route]);
        this.navService.closeNav();
      } else {
        this.router.navigate([item.route]);
      }
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
