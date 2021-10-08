import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ContactRecord } from '../models/contact-record';

@Injectable({
  providedIn: 'root',
})
export class ContactRecordService {
  configUrl = environment.apiUrl + '/contactrecords';

  constructor(private http: HttpClient) {}

  getContactRecords(
    contactDate: string,
    salesperson: string
  ): Observable<ContactRecord[]> {
    const url =
      this.configUrl + `?contactDate=${contactDate}&salesperson=${salesperson}`;
    return this.http.get<ContactRecord[]>(url).pipe(retry(1));
  }

  addContactPlan(addPart: any): Observable<ContactRecord> {
    return this.http.post<ContactRecord>(this.configUrl, addPart);
  }

  deleteContactPlan(planId: string): Observable<ContactRecord> {
    const url = `${this.configUrl}/${planId}`;
    return this.http.delete<ContactRecord>(url);
  }

  deleteSpecificDatePlan(
    contactDate: string,
    createUserId: string
  ): Observable<ContactRecord[]> {
    const deleteUrl =
      this.configUrl +
      '?contactDate=' +
      contactDate +
      '&createUser=' +
      createUserId;
    return this.http.delete<ContactRecord[]>(deleteUrl);
  }

  updateContactPlan(
    planId: string,
    updatePart: any
  ): Observable<ContactRecord> {
    const url = `${this.configUrl}/${planId}`;
    return this.http.put<ContactRecord>(url, updatePart);
  }
}
