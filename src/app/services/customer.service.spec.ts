import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CustomerService } from './customer.service';
import { Customer, CustomerForUpdate } from '../models/customer';
import { environment } from 'src/environments/environment';

/**
 * CRUD SERVICE TEST
 */
describe('CustomerService CRUD', () => {
  let service: CustomerService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  // configUrl should be same as setting in environment.ts
  const configUrl = environment.apiUrl + '/customers';
  const customer: Customer = {
    name: 'customer1',
    email: 'customer1@gmail.com',
    address: 'Andy Street,NY',
    phone: '12-11--111',
    credit: '$10k',
    _id: '61671bd4bf8d0d258dc57903',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CustomerService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a customer', () => {
    let result!: Customer;
    const url = configUrl + '/' + customer._id;
    service.getCustomer(customer._id || '').subscribe((t: Customer) => {
      result = t;
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url,
    });
    req.flush(customer);
    expect(result).toEqual(customer);
  });

  it('should call delete customer API', () => {
    service.deleteCustomer(customer._id || '').subscribe();
    const id = customer._id;
    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${configUrl}/${id}`,
    });

    expect(req).toBeDefined();
  });

  it('should call POST API to create a new customer', () => {
    service.addCustomer(customer).subscribe();

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: configUrl,
    });

    expect(req.request.body).toEqual(customer);
  });

  it('should call put API to update an customer', () => {
    service.updateCustomer(customer._id || '', customer).subscribe();

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${configUrl}/${customer._id}`,
    });

    expect(req.request.body).toEqual(customer);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    http.get('/data').subscribe(
      (data) => fail('should have failed with 404 errors'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne('/data');
    req.flush(emsg, {
      status: 404,
      statusText: 'No Found',
    });
  });

  it('can test for network ', () => {
    const errorMsg = 'simulated network error';

    http.get<Customer[]>(configUrl).subscribe(
      (data) => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(errorMsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(configUrl);

    // Create mock ErrorEvent, raised when something goes wrong
    // at the network level.
    // Connection timeout, DNS error, offline,etc
    const errorEvent = new ErrorEvent('so bad', {
      message: errorMsg,
      filename: ' customerService.ts',
      lineno: 21,
      colno: 21,
    });

    req.error(errorEvent);
  });

  it('should be ok returning no customers', () => {
    service
      .getCustomers()
      .subscribe(
        (customers) =>
          expect(customers.length).toEqual(0, 'should ok when no customers'),
        fail
      );

    const req = httpTestingController.expectOne(configUrl);

    req.flush([]); // response with no customers
  });
});
