import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
export const MAX_LINES = 20000;

@Injectable({
  providedIn: 'root',
})
export class CreateGraphDataService {
  items = [];
  worker: Worker;

  constructor() {
    this.worker = new Worker(
      new URL('../yearly-data-create.worker', import.meta.url)
    );
  }

  createProductData(counter: number): Observable<number> {
    const resultSubject = new BehaviorSubject<number>(0);
    this.worker.onmessage = ({ data }) => {
      resultSubject.next(data);
    };
    this.worker.postMessage(counter);
    return resultSubject;
  }
}
