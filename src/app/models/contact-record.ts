export interface ContactRecord {
  customerId: string; // customerId
  customerName: string;
  contactDate: string; // 2021-09-21
  contactPeriod: string; // 09:00-10:00
  salespersonId: string;
  salespersonName: string;
  actualContactDT: Date;
  photoName: string;
  latitude: number;
  longitude: number;
  notes: string;
  isVisited: boolean;
  _id?: string;
}
