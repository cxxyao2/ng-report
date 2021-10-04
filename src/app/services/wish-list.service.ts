import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  configUrl = environment.apiUrl + '/waitlists';

  constructor(private http: HttpClient, private cartSrv: CartService) {}

  addToWishList(itemId?: string): void {
    this.http
      .post(this.configUrl, {
        customerId: this.cartSrv.currentCustomer?._id,
        productId: itemId,
      })
      .subscribe();
  }

  removeFromWishList(id?: string) {
    const deleteUrl = this.configUrl + '/' + id;
    this.http.delete(deleteUrl).subscribe();
  }
}
