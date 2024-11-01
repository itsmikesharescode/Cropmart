import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class UserState {
  #user = $state<User | null>(null);

  set(p: User | null) {
    this.#user = p;
  }

  get() {
    return this.#user;
  }
}

const userStateKey = Symbol('userState');

export const initUserState = () => {
  return setContext(userStateKey, new UserState());
};

export const fromUserState = () => {
  return getContext<ReturnType<typeof initUserState>>(userStateKey);
};
