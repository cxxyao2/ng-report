import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LogRecord } from 'src/app/models/log-record';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  ipAddress = '';
  configUrl = environment.apiUrl + '/logs';

  constructor(private http: HttpClient) {
    this.getIPAddress();
  }

  getLog(id: string): Observable<LogRecord> {
    const url = `${this.configUrl}/${id}`; // DELETE api/heroes/42
    return this.http.get<LogRecord>(url);
  }

  getLogs(): Observable<LogRecord[]> {
    return this.http
      .get<LogRecord[]>(this.configUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  // href = 'https://api.github.com/search/issues';
  // requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
  //   page + 1
  // }`;

  getFilterdLogs(
    startDate: Date,
    endDate: Date,
    userName = '',
    content = ''
  ): Observable<LogRecord[]> {
    // http://localhost:5000/api/logs?startDate=2021-01-01&endDate=2022-12-01&userName=&content=insert
    const requestUrl = `${this.configUrl}?startDate=${startDate}&endDate=${endDate}&userName=${userName}&content=${content}`;
    return this.http
      .get<LogRecord[]>(requestUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  addLog(content: string) {
    // name ,categoryId='600103a5ffa4a7376471d64f'
    // code ?
    this.http
      .post(this.configUrl, {
        ip: this.ipAddress,
        content: content,
      })
      .subscribe();
  }

  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: any, caught: Observable<any>): Observable<any> {
    if (
      error &&
      error.error &&
      (error.error.status === 'INVALID_TOKEN' ||
        error.error.status === 'MAX_TOKEN_ISSUE_REACHED')
    ) {
      // this.logout(); this.router.navigate(['/login'])
      return error;
    }
    return error;
  }
}
