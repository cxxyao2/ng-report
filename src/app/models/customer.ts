export interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
  _id?: string;
  imageUrl?: string;
  credit: string;

  latitude?: number;
  longitude?: number;
  isAuthorized?: boolean;

  createDate?: Date;
  updateDate?: Date;
  createUser?: string;
  updateUser?: string;
}
