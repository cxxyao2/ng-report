import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ContactRecord, ContactRecordForUpdate } from '../models/contact-record';

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

  addContactRecord(addPart: ContactRecordForUpdate): Observable<ContactRecord> {
    return this.http.post<ContactRecord>(this.configUrl, addPart);
  }

  deleteContactRecord(planId: string): Observable<ContactRecord> {
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

  updateContactRecord(
    planId: string,
    updatePart: ContactRecordForUpdate
  ): Observable<ContactRecord> {
    const url = `${this.configUrl}/${planId}`;
    return this.http.put<ContactRecord>(url, updatePart);
  }
}
