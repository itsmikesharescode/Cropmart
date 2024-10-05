<script lang="ts">
  import Nav from './_components/Nav.svelte';
  import { fromProductState, initProductState } from './_route_states/prodRoute.svelte';

  const { data, children } = $props();

  initProductState();

  const productState = fromProductState();

  $effect(() => {
    productState.setProducts(data.adminLayoutQ.data?.products ?? null);
  });
</script>

<div class="mx-auto max-w-[1200px]">
  <Nav {children} />
</div>
