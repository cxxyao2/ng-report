import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient) {}
  addToWishList(itemId: string): Observable<any> {
    return this.http.get('');
  }

  removeFromWishList(e: string){
     return this.http.delete('');
  }
}
