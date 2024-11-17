import { create } from 'zustand';
import { createSelectors } from '@/store/createSelectors';
import { FarmerLayoutQ } from '@/lib/db_types/farmerLayoutQ.types';
import { produce } from 'immer';

interface ProductStore {
  products: FarmerLayoutQ['products'];
  setProducts: (p: FarmerLayoutQ['products']) => void;
  resetProducts: () => void;
  deleteProduct: (id: number) => void;
}

const productStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: async (p) =>
    set(
      produce((state) => {
        state.products = p;
      })
    ),

  resetProducts: () =>
    set(
      produce((state) => {
        state.products = [];
      })
    ),
  deleteProduct: (id) =>
    set(
      produce((state) => {
        const productRef = state.products as FarmerLayoutQ['products'];

        state.products = productRef.filter((item) => item.id !== id);
      })
    )
}));

export const useProductsSelector = createSelectors(productStore);
