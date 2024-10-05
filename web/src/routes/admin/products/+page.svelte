<script lang="ts">
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderProducts from './_components/RenderProducts.svelte';
</script>

<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderProducts />
  </div>
</ScrollArea>
