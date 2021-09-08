import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';
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
  items = [];
  worker: Worker;

  constructor(private loader: LoadingService) {
    this.worker = new Worker(
      new URL('../product-profit.worker', import.meta.url)
    );
  }

  createProductData(): Observable<number> {
    const resultSubject = new BehaviorSubject<number>(0);
    this.worker.onmessage = ({ data }) => {
      resultSubject.next(data);
      console.log(`calculate result is : ${data} `);
      this.loader.hide();
    };
    this.worker.postMessage(600000000); // TODO
    return resultSubject;
  }
}
