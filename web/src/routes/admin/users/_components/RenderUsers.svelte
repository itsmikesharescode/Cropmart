<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import UserMenu from './UserMenu.svelte';
  import type {
    UpdateUserEmailSchema,
    UpdateUserInfoSchema,
    UpdateUserPwdSchema
  } from './operations/schema';
  import type { UserListType } from '$lib/types';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Popover from '$lib/components/ui/popover';

  interface Props {
    updateUserInfoForm: SuperValidated<Infer<UpdateUserInfoSchema>>;
    updateUserEmailForm: SuperValidated<Infer<UpdateUserEmailSchema>>;
    updateUserPwdForm: SuperValidated<Infer<UpdateUserPwdSchema>>;
    activeArray: UserListType[] | null;
  }

  const { updateUserInfoForm, updateUserEmailForm, updateUserPwdForm, activeArray }: Props =
    $props();
</script>

<Table.Root>
  {#if !activeArray?.length}
    <Table.Caption class="text-primary/80">No records.</Table.Caption>
  {/if}
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[50px]"></Table.Head>
      <Table.Head class="w-[50px] text-primary">ID</Table.Head>
      <Table.Head class="text-primary">Fullname</Table.Head>
      <Table.Head class="truncate text-primary">Home Address</Table.Head>
      <Table.Head class="text-primary">Email</Table.Head>
      <Table.Head class="truncate text-primary">Phone Number</Table.Head>
      <Table.Head class="truncate text-primary">Created At</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each activeArray ?? [] as activeUser, index}
      <Table.Row>
        <Table.Cell class="font-medium">
          <div class="flex items-center">
            <UserMenu {activeUser} {updateUserInfoForm} {updateUserEmailForm} {updateUserPwdForm} />
          </div>
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{index + 1}</Table.Cell>
        <Table.Cell class="truncate text-xs text-primary/90">
          <Avatar.Root class="">
            <Avatar.Image src={activeUser.user_meta_data.avatarLink} alt="@loading" />
            <Avatar.Fallback>
              {activeUser.user_meta_data.lastName[0].toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          {activeUser.user_meta_data.lastName},
          {activeUser.user_meta_data.firstName}
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">
          <Popover.Root>
            <Popover.Trigger class="underline">View Address</Popover.Trigger>
            <Popover.Content>
              <p class="text-xs text-primary/90">{activeUser.user_meta_data.address}</p>
            </Popover.Content>
          </Popover.Root>
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{activeUser.user_meta_data.email}</Table.Cell>
        <Table.Cell class="text-xs text-primary/90"
          >{activeUser.user_meta_data.mobileNumber}</Table.Cell
        >
        <Table.Cell class="truncate text-xs text-primary/90">
          {new Date(activeUser.created_at).toLocaleDateString()} @ {new Date(
            activeUser.created_at
          ).toLocaleTimeString()}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
