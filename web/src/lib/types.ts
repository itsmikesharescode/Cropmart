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

interface ProductView extends ProductType {
  user_meta_data: UserMetaDataType;
}

export interface AdminLayoutQ {
  products: ProductView[] | [];
}
