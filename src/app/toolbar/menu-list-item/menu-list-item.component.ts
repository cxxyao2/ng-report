import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavItem } from 'src/app/models/nav-item';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
})
export class MenuListItemComponent implements OnInit {
  @Input() item!: NavItem;
  constructor(public navService: NavService, public router: Router) {}

  ngOnInit(): void {}

  onItemSelected(item: NavItem): void {
    if (this.navService.appDrawer.mode === 'over') {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    } else {
      this.router.navigate([item.route]);
    }
  }
}
