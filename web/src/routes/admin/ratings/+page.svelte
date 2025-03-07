<script lang="ts">
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderCategories from './_components/RenderCategories.svelte';

  const { data } = $props();
</script>

<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderCategories ratings={data.getAllRatings} />
  </div>
</ScrollArea>
