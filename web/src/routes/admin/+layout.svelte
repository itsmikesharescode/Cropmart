<script lang="ts">
    import { fromUserState, initUserState } from '$lib/states/userState.svelte';
  import Nav from './_components/Nav.svelte';
  import { fromCategoryState, initCategoryState } from './_route_states/catRoute.svelte';
  import { fromProductState, initProductState } from './_route_states/prodRoute.svelte';
  import {
    fromUserManagementState,
    initUserManagementState
  } from './_route_states/userRoute.svelte';

  const { data, children } = $props();

  initProductState();
  initCategoryState();
  initUserManagementState();
  initUserState();

  const productState = fromProductState();
  const categoryState = fromCategoryState();
  const userManagementState = fromUserManagementState();
  const userState = fromUserState();
  $effect(() => {
    productState.setProducts(data.adminLayoutQ.data?.products ?? null);
    categoryState.setCategories(data.adminLayoutQ.data?.categories ?? null);
    userManagementState.setFarmers(data.adminLayoutQ.data?.farmers ?? null);
    userManagementState.setEntrepreneurs(data.adminLayoutQ.data?.entrepreneurs ?? null);
    userManagementState.setRiders(data.adminLayoutQ.data?.riders ?? null);
    userState.set(data.user);
  });
</script>

<div class="mx-auto max-w-[1200px]">
  <Nav {children} />
</div>
