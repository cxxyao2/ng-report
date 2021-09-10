export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  price: number;
  qtyInStock: number;
}
