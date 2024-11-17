import { create } from 'zustand';
import { produce } from 'immer';
import { createSelectors } from '@/store/createSelectors';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';

interface ProcessingStore {
  processings: EntrepLayoutQ['processings'];
  setProcessings: (p: EntrepLayoutQ['processings']) => void;
  resetProcessings: () => void;
}

const processingStore = create<ProcessingStore>((set) => ({
  processings: [],
  setProcessings: (p) =>
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
    )
}));

export const useProcessingsSelector = createSelectors(processingStore);
