export interface OrderHeader {
  _id?: string;
  customerId: string;
  customerName?: string;
  salespersonId: string;
  salespersonName?: string;
  orderDate: string; // 2010-09-30
  createDate: Date;
}
