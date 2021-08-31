export interface CartItem {
  selected: boolean;
  productId: string;
  productName: string;
  imageUrl: string;
  qty: number;
  price: number;
  stock?: number;
  clientId?: string;
  salePersonId?: string;
  id?: string;
}
