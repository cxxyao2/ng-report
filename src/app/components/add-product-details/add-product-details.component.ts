import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  Form,
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductDialogData } from 'src/app/models/product-dialog-data';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss'],
})
export class AddProductDetailsComponent implements OnInit {
  productForm: FormGroup;
  product?: Product;
  errorMessage = '';

  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100),
  ]);
  descriptionControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ]);
  categoryControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ]);

  priceControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(10000),
  ]);

  stockControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(10000),
  ]);

  onSaleControl = new FormControl(false);

  constructor(
    fb: FormBuilder,
    private service: ProductService,
    public dialogRef: MatDialogRef<AddProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {
    this.productForm = fb.group({
      onSale: this.onSaleControl,
    });
  }

  onSubmit() {
    if (this.data.isAdd) {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  getNameErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.nameControl.hasError('minlength')) {
      return 'Name must be at least 5 characters long.';
    }

    if (this.nameControl.hasError('maxlength')) {
      return 'Name can be max 100 characters long.';
    }
  }

  getDescriptionErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.nameControl.hasError('minlength')) {
      return 'Name must be at least 5 characters long.';
    }

    if (this.nameControl.hasError('maxlength')) {
      return 'Name can be max 100 characters long.';
    }
  }

  getPriceErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.nameControl.hasError('minlength')) {
      return 'Name must be at least 5 characters long.';
    }

    if (this.nameControl.hasError('maxlength')) {
      return 'Name can be max 100 characters long.';
    }
  }

  getStockErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.nameControl.hasError('minlength')) {
      return 'Name must be at least 5 characters long.';
    }

    if (this.nameControl.hasError('maxlength')) {
      return 'Name can be max 100 characters long.';
    }
  }

  ngOnInit(): void {}

  OnCancelClick(){
    this.dialogRef.close();
  }

  addProduct() {
    if (this.product) {
      this.service.addProduct(this.product).subscribe(
        (data) => {},
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    }
  }

  updateProduct() {
    if (this.product) {
      this.service.updateProduct(this.product).subscribe(
        (data) => {},
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    }
  }
}
