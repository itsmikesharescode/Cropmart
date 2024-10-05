<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderCategories from './_components/RenderCategories.svelte';
  import { Plus } from 'lucide-svelte';
</script>

<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderCategories />
  </div>

  <div class="fixed bottom-6 right-0 w-full">
    <div class="mx-auto flex max-w-[1200px] justify-end">
      <Button class="gap-1.5">
        <Plus class="h-4 w-4" />
        New Category
      </Button>
    </div>
  </div>
</ScrollArea>
