import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyCompany } from 'src/app/models/my-company';

import { constants } from 'src/app/config/constants';
import { PdfMakeService } from 'src/app/services/pdfmake.service';
import { CartService } from 'src/app/services/cart.service';
import * as fileConvert from 'src/assets/js/filetypeConvert.js';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss'],
})
export class PrintInvoiceComponent {
  @Input() myCompany!: MyCompany;

  panelOpenState = false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pdfService: PdfMakeService,
    private cartService: CartService
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    // return this.transactions
    //   .map((t) => t.cost)
    //   .reduce((acc, value) => acc + value, 0);
    return 1111;
  }

  openPdf(): void {
    const docDefinition = this.generateInvoiceData();
    this.pdfService.generatePDF(docDefinition);
  }

  generateInvoiceData(): any {
    //  myClient: Client;
    //   myCompany: MyCompany;
    //   items: CartItem[];
    //   subTotal: number;
    //   discount: number;
    //   taxTPS: number;
    //   taxTVQ: number;
    //   total: number;
    const items = this.cartService.items;
    const subTotal = this.cartService.getAmount();
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
              { text: 'best client is google' },
              { text: '2322 golden street' },
              { text: 'software@gmail.com' },
              { text: '01-514-111-222' },
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
                item.qty,
                (item.price * item.qty).toFixed(2),
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
    // PeriodicElement
    const initData = [...ELEMENT_DATA];
    if (!(initData && initData.length >= 1)) {
      return;
    }
    const output = [];
    const fields = Object.keys(initData[0]);
    output.push(fields);
    initData.forEach((row) => {
      let rowData = [];
      for (const [key, value] of Object.entries(row)) {
        rowData.push(value);
      }
      output.push(rowData);
    });

    const csvFileData = fileConvert.makeCSV(output);
    const fileName = 'testcsv';
    fileConvert.saveBlobtoLocalFile(csvFileData, fileName + '.csv', 'text/csv');
  }
}
