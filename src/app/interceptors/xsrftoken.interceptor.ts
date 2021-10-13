import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class XsrftokenInterceptor implements HttpInterceptor {
  constructor(public cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token;
    let reqClone;
    token = this.cookieService.get(environment.cookieName);
    if (token !== null && !request.headers.has(environment.tokenHeaderName)) {
      reqClone = request.clone({
        headers: request.headers.set(environment.tokenHeaderName, token),
        withCredentials: true,
        body: request.body,
      });

      return next.handle(reqClone);
    }
    return next.handle(request);
  }
}
