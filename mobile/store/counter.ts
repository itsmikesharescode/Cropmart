import { create } from 'zustand';
import { produce } from 'immer';
import { createSelectors } from './createSelectors';

interface CounterState {
	value: number;
	incValue: () => void;
	decValue: () => void;
}

export const useCounter = create<CounterState>((set) => ({
	value: 0,
	incValue: () => set((state) => ({ value: state.value })),
	decValue: () =>
		set(
			produce((state) => {
				state.value--;
			})
		)
}));

export const useCounterSelectors = createSelectors(useCounter);
