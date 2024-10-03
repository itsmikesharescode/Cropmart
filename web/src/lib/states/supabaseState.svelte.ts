import type { SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class SupabaseState {
  private supabase = $state<SupabaseClient | null>(null);
  set(p: SupabaseClient | null) {
    this.supabase = p;
  }
  get() {
    return this.supabase;
  }
}

const SB_STATE_KEY = Symbol('supabaseStateKey');

export const initSupabase = () => {
  return setContext(SB_STATE_KEY, new SupabaseState());
};

export const fromSupabaseState = () => {
  return getContext<ReturnType<typeof initSupabase>>(SB_STATE_KEY);
};
