import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  generatePDF(docDefinition: any, action: string = 'open'): void {
    // TODO 替换成真实的数据
    // docDefinition = {
    //   header: 'C#Corner PDF Header',
    //   content:
    //     'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
    // };

    switch (action) {
      case 'open': {
        pdfMake.createPdf(docDefinition).open();
        break;
      }
      case 'download': {
        pdfMake.createPdf(docDefinition).download();
        break;
      }
      case 'print': {
        pdfMake.createPdf(docDefinition).print();
        break;
      }
      default: {
        pdfMake.createPdf(docDefinition).open();
        break;
      }
    }
  }
}
