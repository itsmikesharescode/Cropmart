import { create } from 'zustand';
import { produce } from 'immer';
import { ProductType } from '@/lib/db_types/product.types';
import { createSelectors } from '@/store/createSelectors';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { UserMetaDataType } from '@/lib/db_types/user.types';

export type Cart = EntrepLayoutQ['products'][number] & {
	clientQuantity: number;
	buyer: UserMetaDataType;
};

interface CartType {
	cart: Cart[];
	setCart: (p: Cart[]) => void;
	resetCart: () => void;
	pushCart: (p: Cart) => void;
	deleteCart: (id: number) => void;
	increment: (id: number, q: number) => void;
}

const cartStore = create<CartType>((set) => ({
	cart: [],
	setCart: (p) =>
		set(
			produce((state) => {
				state.cart = p;
			})
		),
	resetCart: () =>
		set(
			produce((state) => {
				state.cart = [];
			})
		),
	pushCart: (p) =>
		set(
			produce((state) => {
				const productRef = state.cart as Cart[];
				const ids = productRef.map((item) => item.id);
				if (ids.includes(p.id)) return;
				state.cart.push(p);
			})
		),
	deleteCart: (id) =>
		set(
			produce((state) => {
				const cartRef = state.cart as Cart[];
				state.cart = cartRef.filter((item) => item.id !== id);
			})
		),
	increment: (id, q) =>
		set(
			produce((state) => {
				const cartRef = state.cart as Cart[];
				const Ids = cartRef.map((item) => item.id);
				const index = Ids.indexOf(id);
				let newObj = { ...cartRef[index], clientQuantity: q };
				state.cart[index] = newObj;
			})
		)
}));

export const useCartSelector = createSelectors(cartStore);
