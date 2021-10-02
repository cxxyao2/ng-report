import {
  Component,
  Input,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { constants } from 'src/app/config/constants';
import { PdfMakeService } from 'src/app/services/pdfmake.service';
import * as fileConvert from 'src/app/utils/file-convert.util';
import { OrderService } from '../../../services/order.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute } from '@angular/router';

import { Customer } from 'src/app/models/customer';
import { OrderItem } from '../../../models/order-item';
import { switchMap, tap, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss'],
})
export class PrintInvoiceComponent implements OnInit, AfterViewInit {
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'name', 'price', 'quantity'];
  dataSource!: MatTableDataSource<OrderItem>;
  orderCustomer?: Customer;
  errorMessage = '';
  orderDetails!: OrderItem[];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pdfService: PdfMakeService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getOrderDetails(): void {
    const orderHeaderId =
      this.route.snapshot.paramMap.get('orderHeaderId') || '';
    if (orderHeaderId.trim().length < 1) {
      this.errorMessage = 'Please select an valid order.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.orderService
      .getOrderByHeaderId(orderHeaderId)
      .pipe(
        tap((data) => {
          this.orderDetails = data;
          this.dataSource = new MatTableDataSource([...data]);
        }),
        switchMap((data) => {
          if (data && data.length >= 1) {
            return this.customerService.getCustomer(data[0].customerId);
          } else {
            return throwError(of('No valid customer for this order.'));
          }
        })
      )
      .subscribe(
        (data) => {
          this.orderCustomer = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  getCustomerDetails(): void {
    if (this.orderCustomer !== undefined && this.orderCustomer._id) {
      this.customerService.getCustomer(this.orderCustomer._id).subscribe(
        (data) => {
          this.orderCustomer = data;
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    }
  }

  /** Gets the total cost of all transactions. */
  getTotalCost(): number {
    return this.orderDetails
      .map((t) => t.quantity * t.price)
      .reduce((acc, value) => acc + value, 0);
  }

  openPdf(): void {
    if (!(this.orderDetails && this.orderDetails.length > 0)) {
      this.errorMessage = 'No data for output.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
    const docDefinition = this.generateInvoiceData();
    this.pdfService.generatePDF(docDefinition);
  }

  generateInvoiceData(): any {
    //  myClient: Client;
    //   myCompany: MyCompany;
    //   items: CartItem[];

    const items = [...this.orderDetails];
    const subTotal = this.getTotalCost();
    const taxTPS = subTotal * constants.tps;
    const taxTVQ = subTotal * constants.tvq;
    const total = subTotal + taxTPS + taxTVQ;
    const docDefinition = {
      header: 'Best Supplier of Gasoline',
      content: [
        {
          text: 'Best Gas Company',
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: 'INVOICE',
          style: 'selectionHeader',
        },
        {
          text: `Date of Issue: ${new Date().toLocaleDateString()}`,
          alignment: 'left',
        },
        {
          text: `Bill No:${(Math.random() * 1000).toFixed(0)}`,
          alignment: 'left',
          margin: [0, 0, 16, 16],
        },
        {
          margin: [0, 0, 16, 16],
          columns: [
            [
              {
                text: 'BILLED TO',
                bold: true,
              },
              { text: this.orderCustomer?.name },
              { text: this.orderCustomer?.address },
              { text: this.orderCustomer?.email },
              { text: this.orderCustomer?.phone },
            ],
            [
              {
                text: 'FROM',
                bold: true,
              },
              { text: 'My company is best gas supplier' },
              { text: '8882 golden street' },
              { text: 'software@gmail.com' },
              { text: '01-514-111-222' },
            ],
          ],
        },

        {
          margin: [0, 0, 16, 16],
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...items.map((item) => [
                item.productName,
                item.price,
                item.quantity,
                (item.price * item.quantity).toFixed(2),
              ]),
              [
                { text: 'SubTotal', colSpan: 3, alignment: 'right' },
                {},
                {},
                subTotal.toFixed(2),
              ],
              [
                { text: 'T.P.S', colSpan: 3, alignment: 'right' },
                {},
                {},
                taxTPS.toFixed(2),
              ],
              [
                { text: 'T.V.Q', colSpan: 3, alignment: 'right' },
                {},
                {},
                taxTVQ.toFixed(2),
              ],
              [
                { text: 'Total Amount', colSpan: 3, alignment: 'right' },
                {},
                {},
                total.toFixed(2),
              ],
            ],
          },
        },
        {
          text: 'Terms and Conditions:',
          bold: true,
          decoration: 'underline',
          ontSize: 18,
          margin: [0, 0, 0, 8],
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warranty of all products will be subject to manufacturers',
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

  downloadCSV() {
    if (!(this.orderDetails && this.orderDetails.length > 0)) {
      this.errorMessage = 'No data for output.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const initData = [...this.orderDetails];
    if (!(initData && initData.length >= 1)) {
      return;
    }
    const output = [];
    const fields = Object.keys(initData[0]);
    output.push(fields);
    initData.forEach((row) => {
      const rowData = [];
      for (const [key, value] of Object.entries(row)) {
        rowData.push(value);
      }
      output.push(rowData);
    });

    const csvFileData = fileConvert.makeCSV(output);
    const fileName = 'order-details';
    fileConvert.saveBlobtoLocalFile(csvFileData, fileName + '.csv', 'text/csv');
  }
}
