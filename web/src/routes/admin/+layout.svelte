<script lang="ts">
  import Nav from './_components/Nav.svelte';

  const { data, children } = $props();
</script>

<div class="mx-auto max-w-[1200px]">
  <Nav {children} />
</div>
