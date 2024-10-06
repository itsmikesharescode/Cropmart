import { getContext, setContext } from 'svelte';

class UserState {
  private riders = $state<any[] | null>(null);

  setRiders(p: typeof this.riders) {
    this.riders = p;
  }

  getRiders() {
    return this.riders;
  }

  private farmers = $state<any[] | null>(null);

  setFarmers(p: typeof this.farmers) {
    this.farmers = p;
  }

  getFarmers() {
    return this.farmers;
  }

  private entrepreneurs = $state<any[] | null>(null);

  setEntrepreneurs(p: typeof this.entrepreneurs) {
    this.entrepreneurs = p;
  }

  getEntrepreneurs() {
    return this.entrepreneurs;
  }
}

const UserStateKey = Symbol(crypto.randomUUID());

export const initUserManagementState = () => {
  return setContext(UserStateKey, new UserState());
};

export const fromUserManagementState = () => {
  return getContext<ReturnType<typeof initUserManagementState>>(UserStateKey);
};
