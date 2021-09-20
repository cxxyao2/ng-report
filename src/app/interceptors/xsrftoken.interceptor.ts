import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class XsrftokenInterceptor implements HttpInterceptor {
  private readonly tokenHeaderName = 'X-XSRF-TOKEN';
  private readonly cookieName = 'XSRF-TOKEN';

  constructor(public cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token;
    let reqClone;
    token = this.cookieService.get(this.cookieName);
    if (token !== null && !request.headers.has(this.tokenHeaderName)) {
      reqClone = request.clone({
        headers: request.headers.set(this.tokenHeaderName, token),
        withCredentials: true,
        body: request.body,
      });
      return next.handle(reqClone);
    }
    return next.handle(request);
  }
}
