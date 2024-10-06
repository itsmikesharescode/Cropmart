<script lang="ts">
  import UserNav from './_components/UserNav.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import RenderUsers from './_components/RenderUsers.svelte';
  import AddUser from './_components/operations/AddUser.svelte';
  import { fromUserManagementState } from '../_route_states/userRoute.svelte';
  import type { UserListType } from '$lib/types';

  const { data } = $props();
  const userManagementState = fromUserManagementState();

  let activeSite = $state('Farmers');
  let activeArray = $state<UserListType[] | null>(null);

  $effect(() => {
    if (activeSite === 'Farmers') {
      activeArray = userManagementState.getFarmers();
    }

    if (activeSite === 'Entrepreneurs') {
      activeArray = userManagementState.getEntrepreneurs();
    }

    if (activeSite === 'Riders') {
      activeArray = userManagementState.getRiders();
    }
  });
</script>

<div class="sticky top-[3.9rem] z-20">
  <UserNav bind:activeSite />
</div>
<ScrollArea class="w-[900px]" orientation="horizontal">
  <div class="p-4">
    <RenderUsers
      {activeArray}
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
