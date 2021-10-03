export interface CartItem {
  selected?: boolean;
  // productId: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  price: number;
  stock: number;
  customerId?: string;
  customerName?: string;
  salespersonId?: string;
  salespersonName?: string;
  _id: string;
}
