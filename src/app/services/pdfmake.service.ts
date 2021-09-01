import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfmakeService {
  generatePDF() {
    let docDefinition = {
      header: 'C#Corner PDF Header',
      content:
        'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
