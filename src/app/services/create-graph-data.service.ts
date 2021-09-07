import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export const MAX_LINES = 20000;
export enum PRODUCT_CATEGORY {
  ALevel = 'A',
  BLevel = 'B',
  CLevel = 'C',
}

export interface SalesRecord {
  productId: string;
  category: PRODUCT_CATEGORY;
  cost: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CreateGraphDataService {
  worker = new Worker('../web-workers/product-profit.worker', {
    type: 'module',
  });

  constructor() {}

  createProductData(recordCount = 0): Observable<[]> {
    const resultSubject = new BehaviorSubject<[]>([]);
    if (typeof Worker !== 'undefined') {
      this.worker.onmessage = ({ data }) => {
        resultSubject.next(data);
      };
      this.worker.postMessage(recordCount);
    }

    return resultSubject;
  }
}
