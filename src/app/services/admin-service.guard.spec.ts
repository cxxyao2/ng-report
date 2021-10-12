import { TestBed } from '@angular/core/testing';

import { AdminServiceGuard } from './admin-service.guard';

describe('AdminServiceGuard', () => {
  let guard: AdminServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
