<script lang="ts">
  import UserNav from './_components/UserNav.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderUsers from './_components/RenderUsers.svelte';
  import AddUser from './_components/operations/AddUser.svelte';

  const { data } = $props();
</script>

<div class="sticky top-[3.9rem] z-20">
  <UserNav />
</div>
<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderUsers
      updateUserInfoForm={data.updateUserInfoForm}
      updateUserEmailForm={data.updateUserEmailForm}
      updateUserPwdForm={data.updateUserPwdForm}
    />
  </div>

  <div class="fixed bottom-6 right-0 w-full">
    <div class="mx-auto flex max-w-[1200px] justify-end">
      <AddUser createUserForm={data.createUserForm} />
    </div>
  </div>
</ScrollArea>
