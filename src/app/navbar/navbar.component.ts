import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isDark: boolean = false;
  currentLanguage: string = 'english';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService
  ) {}

  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setDarkTheme(this.isDark);
  }
  getThemeLabel() {
    return this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  toggleLanguage() {
    this.currentLanguage = 'english' ? 'french' : 'english';
  }
  getLanguageLabel() {
    return this.currentLanguage === 'english'
      ? 'Switch to french'
      : 'Switch to english';
  }
}
