/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';
import { NetworkInterceptor } from './network.interceptor';
import { XsrftokenInterceptor } from './xsrftoken.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: XsrftokenInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
