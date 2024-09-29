import { produce } from 'immer';
import { create } from 'zustand';
import { createSelectors } from '@/store/createSelectors';
import { RiderLayoutQ } from '@/lib/db_types/riderLayoutQ.types';

interface StatusStore {
  status: RiderLayoutQ['status'];
  setStatus: (p: RiderLayoutQ['status']) => void;
  resetStatus: () => void;
  stat: RiderLayoutQ['status'][number] | null;
  setStat: (p: RiderLayoutQ['status'][number]) => void;
  resetStat: () => void;
}

const statusStore = create<StatusStore>((set) => ({
  status: [],
  setStatus: (p) =>
    set(
      produce((state) => {
        state.status = p;
      }),
    ),
  resetStatus: () =>
    set(
      produce((state) => {
        state.status = [];
      }),
    ),

  stat: null,

  setStat: (p) =>
    set(
      produce((state) => {
        state.stat = p;
      }),
    ),
  resetStat: () =>
    set(
      produce((state) => {
        state.stat = null;
      }),
    ),
}));

export const useStatusSelector = createSelectors(statusStore);
