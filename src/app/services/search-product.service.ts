import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchProductService {
  private searchTerms = new BehaviorSubject<string | null>(null);
  public readonly searchTermObs = this.searchTerms.asObservable();

  constructor() {}
  setSearchTerms(term: string) {
    this.searchTerms.next(term);
  }
}
