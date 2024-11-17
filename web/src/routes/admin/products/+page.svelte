<script lang="ts">
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderProducts from './_components/RenderProducts.svelte';

  const { data } = $props();
</script>

<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderProducts updateProductForm={data.updateProductForm} />
  </div>
</ScrollArea>
