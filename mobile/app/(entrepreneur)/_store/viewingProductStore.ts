import { create } from 'zustand';
import { produce } from 'immer';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { createSelectors } from '@/store/createSelectors';

interface ViewingProduct {
	product: EntrepLayoutQ['products'][number] | null;
	setProduct: (p: EntrepLayoutQ['products'][number] | null) => void;
	resetProduct: () => void;
}

const viewProduct = create<ViewingProduct>((set) => ({
	product: null,
	setProduct: (p) =>
		set(
			produce((state) => {
				state.product = p;
			})
		),
	resetProduct: () =>
		set(
			produce((state) => {
				state.product = null;
			})
		)
}));

export const viewProductSelector = createSelectors(viewProduct);
