import { create } from 'zustand';
import { createSelectors } from '@/store/createSelectors';
import { FarmerLayoutQ } from '@/lib/db_types/farmerLayoutQ.types';
import { produce } from 'immer';

interface ProductStore {
  products: FarmerLayoutQ['products'];
  product: FarmerLayoutQ['products'][number] | null;
  setProducts: (p: FarmerLayoutQ['products']) => void;
  setProduct: (p: FarmerLayoutQ['products'][number]) => void;
  resetProducts: () => void;
  deleteProduct: (id: number) => void;
}

const productStore = create<ProductStore>((set) => ({
  products: [],
  product: null,
  setProducts: async (p) =>
    set(
      produce((state) => {
        state.products = p;
      })
    ),
  setProduct: (p) =>
    set(
      produce((state) => {
        state.product = p;
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
