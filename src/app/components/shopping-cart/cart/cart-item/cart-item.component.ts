import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem = {
    _id: 'aa',
    productId: 'bb',
    qty: 12,
    productName: 'productName',
    selected: true,
    imageUrl: 'xxx',
    price: 888,
  };
  @ViewChild('qty') qty!: ElementRef;
  myForm!: FormGroup;

  selected = false;
  showMore = false;
  qtyReadOnly = true;
  updateButtonText = 'edit';

  constructor(private service: CartService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
        productQty: new FormControl(this.item.qty, {
          validators: [
            Validators.required,
            Validators.min(0),
            Validators.max(1000),
          ],
          updateOn: 'blur',
        }),
      },
      { updateOn: 'submit' }
    ); // <-- add custom validator at the FormGroup level
  }

  get productQty() {
    return this.myForm.get('productQty');
  }
  onSelectedChange(value: boolean) {
    this.selected = value;
  }

  onDelete(): void {
    this.service.removeProductFromCart(this.item.productId);
  }

  onUpdate(): void {
    if (this.qtyReadOnly) {
      this.qtyReadOnly = false;
      this.qty.nativeElement.focus();
      this.updateButtonText = 'update';
    } else {
      // if value is valid or not
      if (this.productQty?.valid) {
        this.qtyReadOnly = true;
        this.updateButtonText = 'edit';
        this.service.updateProductQtyInCart(
          this.item.productId,
          this.productQty?.value
        );
      }
    }
  }
}
