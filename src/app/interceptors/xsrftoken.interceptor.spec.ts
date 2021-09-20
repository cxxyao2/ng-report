import { TestBed } from '@angular/core/testing';

import { XsrftokenInterceptor } from './xsrftoken.interceptor';

describe('XsrftokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      XsrftokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: XsrftokenInterceptor = TestBed.inject(XsrftokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
