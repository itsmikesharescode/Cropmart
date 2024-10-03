import { CategoryType } from './category.types';
import { ProcessingType } from './processing.types';
import { ProductType } from './product.types';

export interface FarmerLayoutQ {
  products: ProductType[] | [];
  processings: ProcessingType[] | [];
  categories: CategoryType[] | [];
}
