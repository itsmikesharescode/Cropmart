import { create } from 'zustand';
import { produce } from 'immer';
import { createSelectors } from '@/store/createSelectors';
import { FarmerLayoutQ } from '@/lib/db_types/farmerLayoutQ.types';

interface CategoryStore {
  categories: FarmerLayoutQ['categories'];
  setCategories: (p: FarmerLayoutQ['categories']) => void;
  resetCategories: () => void;
}

const categoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (p) =>
    set(
      produce((state) => {
        state.categories = p;
      }),
    ),
  resetCategories: () =>
    set(
      produce((state) => {
        state.categories = [];
      }),
    ),
}));

export const useCategorySelector = createSelectors(categoryStore);
