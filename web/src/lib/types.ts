import type { ProductType } from './db_types/product.types';

export interface Result<T> {
  status: number;
  type: string;
  data: T;
}

export interface UserMetaDataType {
  sub: string;
  role: string;
  email: string;
  address: string;
  lastName: string;
  firstName: string;
  mobileNumber: string;
  email_verified: boolean;
  phone_verified: boolean;
}

export interface AdminLayoutQ {
  products: (ProductType & { user_meta_data: UserMetaDataType }[]) | [];
}
