import { produce } from 'immer';
import { create } from 'zustand';
import { createSelectors } from '@/store/createSelectors';
import { RiderLayoutQ } from '@/lib/db_types/riderLayoutQ.types';

interface ProcessingType {
	processings: RiderLayoutQ['processings'];
	setProcessings: (p: RiderLayoutQ['processings']) => void;
	resetProcessings: () => void;
	deleteProcessing: (id: number) => void;
	processing: RiderLayoutQ['processings'][number] | null;
	setProcessing: (p: RiderLayoutQ['processings'][number]) => void;
	resetProcessing: () => void;
}

const processingStore = create<ProcessingType>((set) => ({
	processings: [],
	setProcessings: async (p) =>
		set(
			produce((state) => {
				state.processings = p;
			})
		),
	resetProcessings: () =>
		set(
			produce((state) => {
				state.processings = [];
			})
		),
	deleteProcessing: (id) =>
		set(
			produce((state) => {
				const processRef = state.processings as RiderLayoutQ['processings'];

				state.processings = processRef.filter((item) => item.id !== id);
			})
		),
	processing: null,
	setProcessing: (p) =>
		set(
			produce((state) => {
				state.processing = p;
			})
		),
	resetProcessing: () =>
		set(
			produce((state) => {
				state.processing = null;
			})
		)
}));

export const useProcessingsSelector = createSelectors(processingStore);
