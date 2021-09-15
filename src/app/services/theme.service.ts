import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  private handsetFlag = new BehaviorSubject<boolean>(false);
  public readonly isDarkTheme = this.darkTheme.asObservable();
  public readonly isHandset = this.handsetFlag.asObservable();

  setDarkTheme(isDark: boolean): void {
    this.darkTheme.next(isDark);
  }

  setHandset(isHand: boolean): void {
    this.handsetFlag.next(isHand);
  }
  constructor() {}
}
