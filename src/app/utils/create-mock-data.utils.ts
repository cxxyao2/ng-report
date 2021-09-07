import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

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

export const createProductProfitData = (
  recordCount = MAX_LINES
): Observable<number[]> => {
  const analyzeObj: SalesRecord[] = [];
  for (let i = 0; i < recordCount; i++) {
    const categoryCur = Math.floor(Math.random() * 3);
    const randomName = new Date().toUTCString();
    let categoryName: PRODUCT_CATEGORY;
    switch (categoryCur) {
      case 0:
        categoryName = PRODUCT_CATEGORY.ALevel;
        break;
      case 1:
        categoryName = PRODUCT_CATEGORY.BLevel;
        break;
      case 2:
        categoryName = PRODUCT_CATEGORY.CLevel;
        break;
      default:
        categoryName = PRODUCT_CATEGORY.ALevel;
        break;
    }

    analyzeObj.push({
      productId: randomName,
      category: categoryName,
      cost: 12,
      price: 13,
    });
  }

  // calculate the profit of 3 categories respectively
  let a1 = 0;
  let b1 = 0;
  let c1 = 0;
  analyzeObj.forEach((product) => {
    switch (product.category) {
      case PRODUCT_CATEGORY.ALevel:
        a1 += product.price - product.cost;
        break;
      case PRODUCT_CATEGORY.BLevel:
        b1 += product.price - product.cost;
        break;
      case PRODUCT_CATEGORY.CLevel:
        c1 += product.price - product.cost;
        break;
      default:
        a1 += product.price - product.cost;
        break;
    }
  });
  const result = [];
  result.push(a1);
  result.push(b1);
  result.push(c1);

  return of(result);
};
