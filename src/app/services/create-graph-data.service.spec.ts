import { TestBed } from '@angular/core/testing';

import { CreateGraphDataService } from './create-graph-data.service';

describe('CreateGraphDataService', () => {
  let service: CreateGraphDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGraphDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
