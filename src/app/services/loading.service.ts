import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly laoding$ = this._loading.asObservable();

  constructor() {}
  show() {
    this._loading.next(true);
  }
  hide() {
    this._loading.next(false);
  }
}
