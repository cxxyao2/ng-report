export interface Customer {
  name: string;
  phone: string;
  address: string;
  _id?: string;
  imageUrl?: string;
  credit?: string;

  latitude?: number;
  longitude?: number;
  isAuthorized?: boolean;

  createDate?: Date;
  updateDate?: Date;
  createUser?: string;
  updateUser?: string;
}
