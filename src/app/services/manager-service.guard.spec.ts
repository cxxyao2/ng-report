import { TestBed } from '@angular/core/testing';

import { ManagerServiceGuard } from './manager-service.guard';

describe('ManagerServiceGuard', () => {
  let guard: ManagerServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
