<script lang="ts">
  import UserNav from './_components/UserNav.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderUsers from './_components/RenderUsers.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<!-- <div class="sticky top-[4rem] z-20">
	<UserNav />
</div> -->
<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderUsers />
  </div>

  <div class="fixed bottom-6 right-0 w-full">
    <div class="mx-auto flex max-w-[1200px] justify-end">
      <Button>Create Account</Button>
    </div>
  </div>
</ScrollArea>
