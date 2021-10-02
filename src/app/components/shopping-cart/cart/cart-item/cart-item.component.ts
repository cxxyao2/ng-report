import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItem;
  @Output() deletedItemEvent = new EventEmitter<string>();
  @ViewChild('qty') qty!: ElementRef;
  myForm!: FormGroup;
  imgSrc = '';
  imgSrcset = '';

  showMore = false;
  qtyReadOnly = true;
  updateButtonText = 'edit';

  constructor(private service: CartService) {}

  ngOnInit(): void {
    this.getImageSrcset();
    this.myForm = new FormGroup(
      {
        productQty: new FormControl(this.item.quantity, {
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
    this.item.selected = value;
    this.service.toggleProductSelected(this.item._id, value).subscribe();
  }

  onDelete(): void {
    this.service.removeProductFromCart(this.item._id).subscribe();
    // this.deletedItemEvent.emit(this.item._id);
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
        this.service
          .updateProductQtyInCart(this.item._id, this.productQty?.value)
          .subscribe();
      }
    }
  }

  getImageSrcset() {
    const apiUrl = environment.imageUrl + '/' + this.item.imageUrl + '/';

    // products/e2 => https://xxx.xxx.xxx.xx:5000/products/e2/w-200.jpg 200w,
    this.imgSrcset =
      apiUrl +
      'w_200.jpg 200w,' +
      apiUrl +
      'w_699.jpg 699w,' +
      apiUrl +
      'w_1080.jpg 1080w,';
    this.imgSrc = apiUrl + 'w_1080.jpg';
  }
}
