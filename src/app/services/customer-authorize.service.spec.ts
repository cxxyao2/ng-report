import { TestBed } from '@angular/core/testing';

import { CustomerAuthorizeService } from './customer-authorize.service';

describe('CustomerAuthorizeService', () => {
  let service: CustomerAuthorizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAuthorizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
