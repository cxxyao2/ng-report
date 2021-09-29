export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  customerId: string;
  salespersonId: string;
  productName?: string;
  productCategory?: string;
  _id?: string;
  customerName?: string;
  salespersonName?: string;
  isPaid?: boolean; // 0-unpaid 1-paid
}
