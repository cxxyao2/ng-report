// import {
//   ComponentFixture,
//   TestBed,
//   tick,
//   waitForAsync,
// } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PrintInvoiceComponent } from './print-invoice.component';

// import { RouteSnapshotStub } from '../../../../testing/route-snapshot-stub';
// import { ActivatedRoute } from '@angular/router';
// import { PdfMakeService } from 'src/app/services/pdfmake.service';
// import { OrderService } from 'src/app/services/order.service';
// import { CustomerService } from 'src/app/services/customer.service';
// import { OrderItem } from 'src/app/models/order-item';
// import { Customer } from 'src/app/models/customer';
// import { of } from 'rxjs';
// import { MaterialModule } from 'src/app/material.module';

// describe('PrintInvoiceComponent', () => {
//   let component: PrintInvoiceComponent;
//   let fixture: ComponentFixture<PrintInvoiceComponent>;
//   const myOrderItems: OrderItem[] = [
//     {
//       productId: 'product1',
//       quantity: 10,
//       price: 10,
//       amount: 10,
//       customerId: 'customer1',
//       salespersonId: 'salesperson1',
//     },
//   ];
//   const myCustomer: Customer = {
//     name: 'aa',
//     phone: '122',
//     email: '12@gmail.com',
//     address: 'Canada Montreal',
//     credit: '$1k',
//   };
//   const pdfMakeServiceSpy = jasmine.createSpyObj('PdfMakeService', [
//     'generatePDF',
//   ]);
//   let generatePDFSpy: jasmine.Spy;
//   generatePDFSpy = pdfMakeServiceSpy.generatePDF.and.returnValue({});

//   const orderServiceSpy = jasmine.createSpyObj('OrderService', [
//     'getOrderByHeaderId',
//   ]);
//   let getOrderByHeaderIdSpy: jasmine.Spy;
//   getOrderByHeaderIdSpy = orderServiceSpy.getOrderByHeaderId.and.returnValue(
//     of(myOrderItems)
//   );

//   const customerServiceSpy = jasmine.createSpyObj('CustomerService', [
//     'getCustomer',
//   ]);
//   let getCustomerSpy: jasmine.Spy;
//   getCustomerSpy = customerServiceSpy.getCustomer.and.returnValue(
//     of(myCustomer)
//   );

//   const activatedRouteSpy = new RouteSnapshotStub();
//   const NeedPrintOrderHeaderId = 'aaa';

//   beforeEach(async () => {
//     activatedRouteSpy.setParamMap({ orderHeaderId: NeedPrintOrderHeaderId });
//     await TestBed.configureTestingModule({
//       declarations: [PrintInvoiceComponent],
//       imports: [BrowserAnimationsModule, MaterialModule],

//       providers: [
//         { provide: PdfMakeService, useValue: pdfMakeServiceSpy },
//         { provide: OrderService, useValue: orderServiceSpy },
//         { provide: CustomerService, useValue: customerServiceSpy },
//         { provide: ActivatedRoute, useValue: activatedRouteSpy },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PrintInvoiceComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create PrintInvoiceComponent successfully', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should get orderItem array after running async test with observable ', (done: DoneFn) => {
//     component.ngOnInit();
//     fixture.detectChanges();
//     done();

//     const clientInfo: HTMLDivElement =
//       fixture.nativeElement.querySelector('.client-section');
//     expect(getOrderByHeaderIdSpy).toHaveBeenCalled();
//     expect(getCustomerSpy).toHaveBeenCalled();
//     expect(clientInfo.textContent).toContain(myCustomer.name);
//   });
// });
