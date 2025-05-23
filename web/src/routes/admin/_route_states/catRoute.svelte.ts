import type { AdminLayoutQ } from '$lib/types';
import { getContext, setContext } from 'svelte';

class CategoryState {
  private categories = $state<AdminLayoutQ['categories'][number][] | null>(null);

  setCategories(p: typeof this.categories) {
    this.categories = p;
  }

  getCategories() {
    return this.categories;
  }
}

const CategoryKey = Symbol(crypto.randomUUID());

export const initCategoryState = () => {
  return setContext(CategoryKey, new CategoryState());
};

export const fromCategoryState = () => {
  return getContext<ReturnType<typeof initCategoryState>>(CategoryKey);
};
