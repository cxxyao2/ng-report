import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-spacing
// import  * as pdfMake from 'pdfmake/build/pdfMake';
// tslint:disable-next-line: import-spacing
// import  * as pdfFonts from 'pdfmake/build/vfs_fonts';

// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  generatePDF(docDefinition: any, action: string = 'open'): void {
    //
    // docDefinition = {
    //   header: 'C#Corner PDF Header',
    //   content:
    //     'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
    // };
    // switch (action) {
    //   case 'open': {
    //     pdfMake.createPdf(docDefinition).open();
    //     break;
    //   }
    //   case 'download': {
    //     pdfMake.createPdf(docDefinition).download();
    //     break;
    //   }
    //   case 'print': {
    //     pdfMake.createPdf(docDefinition).print();
    //     break;
    //   }
    //   default: {
    //     pdfMake.createPdf(docDefinition).open();
    //     break;
    //   }
    // }
  }
}
