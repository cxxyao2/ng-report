import { TestBed } from '@angular/core/testing';

import { ContactPlanService } from './contact-plan.service';

describe('ContactPlanService', () => {
  let service: ContactPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
