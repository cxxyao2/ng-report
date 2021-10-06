import { TestBed } from '@angular/core/testing';

import { ContactRecordService } from './contact-record.service';

describe('ContactRecordService', () => {
  let service: ContactRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
