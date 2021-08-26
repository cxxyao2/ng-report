import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  public readonly isDarkTheme = this.darkTheme.asObservable();

  setDarkTheme(isDark: boolean): void {
    this.darkTheme.next(isDark);
  }
  constructor() {}
}
