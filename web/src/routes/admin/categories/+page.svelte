<script lang="ts">
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import AddCategory from './_components/operations/AddCategory.svelte';
  import RenderCategories from './_components/RenderCategories.svelte';

  const { data } = $props();
</script>

<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderCategories updateCatForm={data.upateCatForm} />
  </div>

  <div class="fixed bottom-6 right-0 w-full">
    <div class="mx-auto flex max-w-[1200px] justify-end">
      <AddCategory createCategoryForm={data.createCatForm} />
    </div>
  </div>
</ScrollArea>
