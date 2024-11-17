import { produce } from 'immer';
import { create } from 'zustand';
import { createSelectors } from '@/store/createSelectors';
import { FarmerLayoutQ } from '@/lib/db_types/farmerLayoutQ.types';

interface ProcessingType {
  processings: FarmerLayoutQ['processings'];
  setProcessings: (p: FarmerLayoutQ['processings']) => void;
  resetProcessings: () => void;
  deleteProcessing: (id: number) => void;
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
        const processRef = state.processings as FarmerLayoutQ['processings'];

        state.processings = processRef.filter((item) => item.id !== id);
      })
    )
}));

export const useProcessingsSelector = createSelectors(processingStore);
