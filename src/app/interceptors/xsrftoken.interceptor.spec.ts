import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

import { XsrftokenInterceptor } from './xsrftoken.interceptor';

fdescribe('XsrftokenInterceptor with Cookie Service', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: XsrftokenInterceptor,
          multi: true,
        },
        CookieService,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should set x-xsrf-token header when an API is called', () => {
    const cookieValue = 'aaa';
    cookieService.set(environment.cookieName, cookieValue);
    httpClient.get('api/orders').subscribe();

    const req = httpTestingController.expectOne('api/orders');
    req.flush([]);

    expect(req.request.headers.get(environment.tokenHeaderName)).toEqual(
      cookieValue
    );
  });
});

fdescribe('XsrftokenInterceptor with mock Cookie Service', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let cookieService: any;
  let getCookie: jasmine.Spy;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['get']);
    getCookie = cookieService.get;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: XsrftokenInterceptor,
          multi: true,
        },
        { provide: CookieService, useValue: cookieService },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call get method of cookie service  and set x-xsrf-token header when an API is called', () => {
    const cookieValue = 'aaa';
    getCookie.and.returnValue(cookieValue);
    httpClient.get('api/orders').subscribe();
    const req = httpTestingController.expectOne('api/orders');
    req.flush([]);
    expect(cookieService.get).toHaveBeenCalled();
    expect(req.request.headers.get(environment.tokenHeaderName)).toEqual(
      cookieValue
    );
  });
});
