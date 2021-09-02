import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  HostListener,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ThemeService } from './services/theme.service';
import { CartService } from './services/cart.service';

import { NavItem } from './models/nav-item';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') appDrawer!: ElementRef;
  title = 'ng-center';
  isDark = false;
  currentLanguage = 'english';

  adminItems: NavItem[] = [
    { label: 'Products', icon: 'addchart', route: 'home' },
    { label: 'Authorization', icon: 'vpn_key', route: 'todo' },
    { label: 'Logs', icon: 'event_note', route: 'loglist' },
  ];

  managerItems: NavItem[] = [
    { label: 'By product', icon: 'bar_chart', route: 'home' },
    { label: 'By employee', icon: 'trending_up', route: 'todo' },
    { label: 'Planning', icon: 'edit_calendar', route: 'product-list' },
  ];

  salespersonItems: NavItem[] = [
    { label: 'My Orders', icon: 'sell', route: 'product-list' },
    { label: 'My Calendar', icon: 'calendar_today', route: 'todo' },
    { label: 'My clients', icon: 'contact_page', route: 'product-list' },
  ];

  othersItems: NavItem[] = [
    { label: 'AboutMe', icon: 'account_circle', route: 'home' },
    { label: 'Help', icon: 'help', route: 'todo' },
    { label: 'FAQs', icon: 'search', route: 'product-list' },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    private navService: NavService,
    public cartService: CartService
  ) {}

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.themeService.setDarkTheme(this.isDark);
  }
  getThemeLabel(): string {
    return this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  toggleLanguage(): void {
    this.currentLanguage = 'english' ? 'french' : 'english';
  }

  getLanguageLabel(): string {
    return this.currentLanguage === 'english'
      ? 'Switch to french'
      : 'Switch to english';
  }

  ngAfterViewInit(): void {
    this.navService.appDrawer = this.appDrawer;
  }

  logout(): void {}
}
