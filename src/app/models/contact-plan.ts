export interface ContactPlan {
  customerId: string; // customerId
  customerName: string;
  contactDate: string; // 2021-09-21
  contactPeriod: string; // 09:00-10:00
  salespersonId: string;
  salespersonName: string;
  _id: string;
}


export interface ContactPlanForUpdate {
  customerId?: string; // customerId
  customerName?: string;
  contactDate?: string; // 2021-09-21
  contactPeriod?: string; // 09:00-10:00
  salespersonId?: string;
  salespersonName?: string;
  _id?: string;
}
