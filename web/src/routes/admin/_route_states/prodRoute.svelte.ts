import type { AdminLayoutQ } from '$lib/types';
import { getContext, setContext } from 'svelte';

class ProductState {
  private products = $state<AdminLayoutQ['products'][number][] | null>(null);

  setProducts(p: typeof this.products) {
    this.products = p;
  }

  getProucts() {
    return this.products;
  }
}

const ProdStateKey = Symbol(crypto.randomUUID());

export const initProductState = () => {
  return setContext(ProdStateKey, new ProductState());
};

export const fromProductState = () => {
  return getContext<ReturnType<typeof initProductState>>(ProdStateKey);
};
