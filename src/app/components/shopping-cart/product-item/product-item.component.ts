import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/Wish-list.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem!: Product;

  constructor(
    private msg: MessageService,
    private cartService: CartService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {}

  handleAddToCart() {
    this.cartService.addProductToCart(this.productItem).subscribe(() => {
      this.msg.sendMsg(this.productItem.name);
    });
  }

  handleAddToWishList() {
    this.wishListService.addToWishList(this.productItem.id).subscribe(() => {
      this.msg.sendMsg(this.productItem.name);
    });
  }

  handleRemoveFromWishList() {}
}
