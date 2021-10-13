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
    // this.getIPAddress();
  }

  getLog(id: string): Observable<LogRecord> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<LogRecord>(url);
  }

  deleteLog(id: string): Observable<LogRecord> {
    const url = `${this.configUrl}/${id}`;
    return this.http.delete<LogRecord>(url);
  }

  getLogs(
    startDate?: Date,
    endDate?: Date,
    userId?: string,
    content?: string
  ): Observable<LogRecord[]> {
    let url = this.configUrl;

    if (
      startDate !== undefined &&
      endDate !== undefined &&
      userId !== undefined &&
      userId !== null
    ) {
      url = `${this.configUrl}?startDate=${startDate}&endDate=${endDate}&userId=${userId}&content=${content}`;
    } else if (startDate !== undefined && endDate !== undefined) {
      url = `${this.configUrl}?startDate=${startDate}&endDate=${endDate}`;
    }

    return this.http.get<LogRecord[]>(url).pipe(retry(1));
  }

  addLog(content: string): void {
    this.http
      .post(this.configUrl, {
        content,
      })
      .subscribe();
  }

  getIPAddress(): void {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }
}
