import { create } from 'zustand';
import { createSelectors } from './createSelectors';
import { User } from '@supabase/supabase-js';
import { produce } from 'immer';

interface UserStateType {
  userState: User | null;
  setUser: (p: User) => void;
  resetUser: () => void;
}

const useUser = create<UserStateType>((set) => ({
  userState: null,
  setUser: async (p) =>
    set(
      produce((state) => {
        state.userState = p;
      })
    ),
  resetUser: () =>
    set(
      produce((state) => {
        state.userState = null;
      })
    )
}));

export const useUserSelector = createSelectors(useUser);
