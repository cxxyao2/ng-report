import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { MessageService } from '../../../services/message.service';
import { PdfMakeService } from 'src/app/services/pdfmake.service';
import { constants } from 'src/app/config/constants';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem!: Product;
  showMore = false;

  constructor(
    private msg: MessageService,
    private cartService: CartService,
    private wishListService: WishListService,
    private pdfService: PdfMakeService
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

  handleRemoveFromWishList() {
    this.wishListService
      .removeFromWishList(this.productItem.id)
      .subscribe(() => {
        this.msg.sendMsg(this.productItem.name);
      });
  }

  openPdf(): void {
    const docDefinition = this.generateProductPDF();
    this.pdfService.generatePDF(docDefinition);
  }

  generateProductPDF(): any {
    const docDefinition = {
      header: 'Best Supplier of Gasoline',
      content: [
        {
          text: 'Best Gas Company',
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 32],
        },
        {
          text: 'https://wwww.goodcompany.com',
          link: 'http://google.com',
          margin: [0, 0, 0, 8],
        },

        {
          text: `Date of Issue: ${new Date().toLocaleDateString()}`,
          alignment: 'left',
          margin: [0, 0, 0, 8],
        },

        {
          margin: [0, 0, 16, 16],
          columns: [
            [
              {
                image: constants.testPrintImageData, //this.productItem.imageUrl,
                width: 200,
              },
            ],
            [
              {
                text: 'For its test, the lab operated an engine continuously for 100 hours on a cycle to represent 4,000 real-miles of use. The engine was then disassembled, photographed, and its key components weighed and measured to determine the thickness of carbon deposits.',

                margin: [0, 0, 0, 16],
              },
              {
                columns: [
                  { text: '$12.88', color: '#990099', align: 'right' },
                  {
                    text: '289 in stock',
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
    return docDefinition;
  }
}
