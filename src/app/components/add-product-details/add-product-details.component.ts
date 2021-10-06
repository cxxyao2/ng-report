import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  Form,
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductDialogData } from 'src/app/models/product-dialog-data';

@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss'],
})
export class AddProductDetailsComponent implements OnInit {
  productForm: FormGroup;
  errorMessage = '';
  isOnsale = false;

  nameControl = new FormControl(this.data.product.name, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
  ]);
  descriptionControl = new FormControl(this.data.product.description, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ]);
  categoryControl = new FormControl(this.data.product.category, [
    Validators.required,
  ]);

  priceControl = new FormControl(this.data.product.price, [
    Validators.required,
    Validators.min(0),
    Validators.max(10000),
  ]);

  stockControl = new FormControl(this.data.product.stock, [
    Validators.required,
    Validators.min(0),
    Validators.max(10000),
  ]);

  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {
    this.productForm = fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      category: this.categoryControl,
      price: this.priceControl,
      stock: this.stockControl,
    });
  }

  getProductId() {
    return this.data.product._id ? this.data.product._id : '';
  }

  getTitle() {
    return this.data.isAdd ? 'Add A Product' : 'Edit A Product';
  }

  onSubmit() {
    if (
      this.productForm.untouched &&
      this.isOnsale === this.data.product.isOnsale
    ) {
      this.dialogRef.close();
      return;
    }
    if (this.productForm.touched && this.productForm.invalid) {
      this.errorMessage = 'Please enter valid product data.';
      return;
    }

    const product: Product = {
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      category: this.categoryControl.value,
      price: this.priceControl.value,
      stock: this.stockControl.value,
      isOnsale: this.isOnsale,
    };
    if (!this.data.isAdd) {
      product._id = this.data.product._id;
    }

    this.dialogRef.close(product);
  }

  getNameErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.nameControl.hasError('minlength')) {
      return 'Name must be at least 5 characters long.';
    }

    if (this.nameControl.hasError('maxlength')) {
      return 'Name can be max 20 characters long.';
    }
    return 'Enter a valid name';
  }

  getDescriptionErrorMessage() {
    if (this.descriptionControl.hasError('required')) {
      return 'You must enter a description';
    }
    if (this.descriptionControl.hasError('minlength')) {
      return 'Description must be at least 5 characters long.';
    }

    if (this.descriptionControl.hasError('maxlength')) {
      return 'Description can be max 200 characters long.';
    }
    return 'Enter a valid description';
  }

  getPriceErrorMessage() {
    if (this.priceControl.hasError('required')) {
      return 'You must enter a price';
    }
    if (this.priceControl.hasError('min')) {
      return 'Price must be bigger than  0.';
    }

    if (this.priceControl.hasError('max')) {
      return 'Price should be less than 10000.';
    }
    return 'Enter a valid price';
  }

  getStockErrorMessage() {
    if (this.stockControl.hasError('required')) {
      return 'You must enter a stock';
    }
    if (this.stockControl.hasError('min')) {
      return 'Stock must be bigger than 0';
    }

    if (this.stockControl.hasError('max')) {
      return 'Stock should be less than 10000.';
    }
    return 'Enter a valid stock';
  }

  ngOnInit(): void {
    this.isOnsale = this.data.product.isOnsale;
  }

  setOnsale(isOnsale: boolean) {
    this.isOnsale = isOnsale;
  }
}
