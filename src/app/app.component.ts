import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  HostListener,
  OnInit,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CookiePopupComponent } from './components/cookie-popup/cookie-popup.component';

import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ThemeService } from './services/theme.service';
import { NavService } from './services/nav.service';
import { NavItem } from './models/nav-item';
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
  cookieValue = '';

  adminItems: NavItem[] = [
    { label: 'Products', icon: 'addchart', route: 'add-product' },
    { label: 'Authorization', icon: 'vpn_key', route: 'authorize' },
    { label: 'Logs', icon: 'event_note', route: 'list-logs' },
  ];

  managerItems: NavItem[] = [
    {
      label: 'Monthly Data Analyse',
      icon: 'bar_chart',
      route: 'monthly-analyze',
    },
    {
      label: 'Yearly Data Analyse',
      icon: 'bar_chart',
      route: 'yearly-analyze',
    },
    { label: 'Pipeline Management', icon: 'contact_page', route: 'pipeline' },
    { label: 'Team Tasks', icon: 'edit_calendar', route: 'schedule' },
  ];

  salespersonItems: NavItem[] = [
    { label: 'Contact Management', icon: 'location_on', route: 'todo' },
    { label: 'Place Order', icon: 'add_shopping_cart', route: 'product-list' },
    {
      label: 'Lead Management',
      icon: 'person_add',
      route: 'capture-client',
    },
    {
      label: 'Personal Data',
      icon: 'analytics',
      route: 'personal',
      children: [
        {
          label: 'Sales Pipeline',
          icon: 'contact_page',
          route: 'personal/clients',
        },
        { label: 'Sales Data', icon: 'sell', route: 'personal/orders' },
      ],
    },
  ];

  othersItems: NavItem[] = [
    { label: 'AboutMe', icon: 'account_circle', route: 'about-me' },
    { label: 'Help', icon: 'help', route: 'todo' },
    { label: 'FAQs', icon: 'search', route: 'product-list' },
  ];

  loading$ = this.loader.laoding$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    private navService: NavService,
    public cartService: CartService,
    public authService: AuthService,
    public loader: LoadingService,
    private cookieService: CookieService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .pipe(map((result) => result.matches))
      .subscribe((data) => {
        this.themeService.setHandset(data);
      });
  }

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
    this.cookieValue = this.cookieService.get('acceptCookie');
    if (this.cookieValue.trim() !== 'yes') {
      setTimeout(() => {
        this._bottomSheet.open(CookiePopupComponent);
      }, 1000);
    }
  }

  logout(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
