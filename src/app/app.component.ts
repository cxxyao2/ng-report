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
import { DOCUMENT } from '@angular/common';

import { ThemeService } from './services/theme.service';

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
  windowScrolled = false;

  navItems: NavItem[] = [
    { label: 'home', icon: 'home', route: 'home' },
    { label: 'todo', icon: 'todo', route: 'todo' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    private navService: NavService,
    @Inject(DOCUMENT) private document: Document
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('hi,scroll window is ', this.windowScrolled);
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  logout(): void {}
}
