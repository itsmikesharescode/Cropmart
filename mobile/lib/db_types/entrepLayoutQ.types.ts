import { Bookmark } from './bookmark.types';
import { CategoryType } from './category.types';
import { ProcessingType } from './processing.types';
import { ProductType } from './product.types';
import { UserMetaDataType } from './user.types';

export interface ProductLJUser extends ProductType {
  user_meta_data: UserMetaDataType;
}

export interface BookmarkLJProduct extends Bookmark {
  name: string;
  price: number;
  quantity: number;
  category: string;
  img_link: string;
}

export interface EntrepLayoutQ {
  products: ProductLJUser[] | [];
  categories: CategoryType[] | [];
  bookmarks: BookmarkLJProduct[] | [];
  processings: ProcessingType[] | [];
}
