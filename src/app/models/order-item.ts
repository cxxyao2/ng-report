export interface OrderItem {
  productId: string;
  productName: string;
  qty: number;
  price: number;
  id?: string;
  clientId: string;
  salePersonId: string;
  status: string; // 0-unpaid 1-paid
}
