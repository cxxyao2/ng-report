import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  HostListener,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ThemeService } from './services/theme.service';
import { CartService } from './services/cart.service';

import { NavItem } from './models/nav-item';
import { NavService } from './services/nav.service';
import { LoadingService } from './services/loading.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') appDrawer!: ElementRef;
  @ViewChild('spin') spin?: ElementRef;
  title = 'ng-center';
  isDark = false;
  currentLanguage = 'english';

  adminItems: NavItem[] = [
    { label: 'Products', icon: 'addchart', route: 'add-product' },
    { label: 'Authorization', icon: 'vpn_key', route: 'authorize' },
    { label: 'Logs', icon: 'event_note', route: 'list-logs' },
  ];

  managerItems: NavItem[] = [
    { label: 'By product', icon: 'bar_chart', route: 'by-product' },
    { label: 'By employee', icon: 'trending_up', route: 'by-employee' },
    { label: 'Planning', icon: 'edit_calendar', route: 'schedule' },
  ];

  salespersonItems: NavItem[] = [
    { label: 'My Orders', icon: 'sell', route: 'place-order' },
    {
      label: 'My TodoList',
      icon: 'edit_calendar',
      route: 'todo',
      children: [
        {
          label: 'My Supervisor',
          icon: 'supervisor_account',
          route: 'todo/client',
        },
        { label: 'My note', icon: 'edit_note', route: 'todo/note' },
      ],
    },
    { label: 'My clients', icon: 'contact_page', route: 'add-client' },
  ];

  othersItems: NavItem[] = [
    { label: 'AboutMe', icon: 'account_circle', route: 'about-me' },
    { label: 'Help', icon: 'help', route: 'todo' },
    { label: 'FAQs', icon: 'search', route: 'product-list' },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading$ = this.loader.laoding$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    private navService: NavService,
    public cartService: CartService,
    public loader: LoadingService
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
    if (this.spin) {
    }
  }

  logout(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
