import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { PdfMakeService } from 'src/app/services/pdfmake.service';

import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem!: Product;
  imgSrc = '';
  imgSrcset = '';
  showMore = false;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private wishListService: WishListService,
    private pdfService: PdfMakeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getImageSrcset();
  }

  getImageSrcset() {
    const apiUrl = environment.imageUrl + '/' + this.productItem.imageUrl + '/';

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

  handleAddToCart() {
    if (!this.cartService.currentCustomer) {
      this.errorMessage =
        'Please select a customer before add products to cart.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    this.cartService.addProductToCart(this.productItem);
  }

  handleAddToWishList() {
    if (!this.cartService.currentCustomer) {
      this.errorMessage =
        'Please select a customer before add products to cart.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    }
    this.wishListService.addToWishList(this.productItem._id);
  }

  handleRemoveFromWishList() {
    this.wishListService.removeFromWishList(this.productItem._id);
  }

  openPdf(): void {
    if (!this.imgSrc.trim()) {
      this.errorMessage =
        'This product has no image.It is not subject to print.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    this.generateProductPDF();
  }

  generateProductPDF(): any {
    let imageData = null;
    let endpoint = this.imgSrc.trim();
    let docDefinition: any;
    this.http.get(endpoint, { responseType: 'blob' }).subscribe(
      (data) => {
        // show image
        if (data) {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = (result) => {
            imageData = result.target?.result;
            docDefinition = {
              header: 'Best Supplier of Gasoline',
              content: [
                {
                  text: 'Best Gas Company',
                  fontSize: 16,
                  alignment: 'center',
                  color: '#047886',
                  margin: [0, 0, 0, 24],
                },
                {
                  margin: [0, 0, 0, 16],
                  columns: [
                    {
                      text: 'https://www.goodcompany.com',
                      link: 'http://google.com',
                    },
                    {
                      text: `Date of Issue: ${new Date().toLocaleDateString()}`,
                      align: 'left',
                    },
                  ],
                },

                {
                  margin: [0, 0, 16, 16],
                  columns: [
                    [
                      {
                        image: imageData, //this.productItem.imageUrl,
                        width: 200,
                        height: 150,
                      },
                    ],
                    [
                      {
                        text: this.productItem.name,

                        margin: [0, 0, 0, 16],
                      },
                      {
                        columns: [
                          {
                            text: '$' + this.productItem.price,
                            color: '#990099',
                          },
                          {
                            text: this.productItem.stock + ' in stock',
                            align: 'right',
                            fontSize: 10,
                          },
                        ],
                      },
                      {
                        text: 'Customer Satisfaction',
                        bold: true,
                        margin: [0, 16, 0, 8],
                      },
                      { text: 'very satisfied: 80%' },
                      { text: 'satisfied     : 15%' },
                      { text: 'not satisfied : 5%' },
                    ],
                  ],
                },

                {
                  text: 'Terms and Conditions:',
                  bold: true,
                  decoration: 'underline',
                  ontSize: 18,
                  margin: [0, 16, 0, 16],
                },
                {
                  lineHeight: 1.2,
                  ul: [
                    'Please visit our online stores to find best prices for your favorite goods.',
                    'You can receive free delivery with your first order of $24 or more.',
                    'You can call 08-900-088 when you have technical problem.',
                  ],
                },
              ],
              // common styles
              styles: {
                selectionHeader: {
                  fontSize: 18,
                  bold: true,
                  alignment: 'center',
                  decoration: 'underline',
                  color: 'skyblue',
                  margin: [0, 15, 0, 15],
                },
              },
            };
            this.pdfService.generatePDF(docDefinition);
          };
        }
      },
      (err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}
