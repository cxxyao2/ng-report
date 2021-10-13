import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ContactPlan, ContactPlanForUpdate } from '../models/contact-plan';

@Injectable({
  providedIn: 'root',
})
export class ContactPlanService {
  configUrl = environment.apiUrl + '/contactplans';

  constructor(private http: HttpClient) {}

  getContactPlans(
    contactDate: string,
    salesperson: string
  ): Observable<ContactPlan[]> {
    const url =
      environment.apiUrl +
      `/contactplans?contactDate=${contactDate}&salesperson=${salesperson}`;
    return this.http.get<ContactPlan[]>(url).pipe(retry(1));
  }

  addContactPlan(addPart: ContactPlanForUpdate): Observable<ContactPlan> {
    return this.http.post<ContactPlan>(this.configUrl, addPart);
  }

  deleteContactPlan(planId: string): Observable<ContactPlan> {
    const url = `${this.configUrl}/${planId}`;
    return this.http.delete<ContactPlan>(url);
  }

  updateContactPlan(
    planId: string,
    updatePart: ContactPlanForUpdate
  ): Observable<ContactPlan> {
    const url = `${this.configUrl}/${planId}`;
    return this.http.put<ContactPlan>(url, updatePart);
  }
}
