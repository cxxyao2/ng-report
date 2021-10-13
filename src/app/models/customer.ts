export interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
  _id?: string;
  imageUrl?: string;
  credit: string;

  latitude?: string;
  longitude?: string;
  isAuthorized?: boolean;

  createDate?: Date;
  updateDate?: Date;
  createUser?: string;
  updateUser?: string;
}


export interface CustomerForUpdate {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  _id?: string;
  imageUrl?: string;
  credit?: string;

  latitude?: string;
  longitude?: string;
  isAuthorized?: boolean;

  createDate?: Date;
  updateDate?: Date;
  createUser?: string;
  updateUser?: string;
}
