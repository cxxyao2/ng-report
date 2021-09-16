import { Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrls: ['./cookie-popup.component.scss'],
})
export class CookiePopupComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CookiePopupComponent>,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  acceptCookie(result: string): void {
    this.cookieService.set('acceptCookie', result, {
      expires: 2,
      sameSite: 'Lax',
    });
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }
}
