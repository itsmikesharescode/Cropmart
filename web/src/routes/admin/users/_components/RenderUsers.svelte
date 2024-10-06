<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import UserMenu from './UserMenu.svelte';
  import type {
    UpdateUserEmailSchema,
    UpdateUserInfoSchema,
    UpdateUserPwdSchema
  } from './operations/schema';

  interface Props {
    updateUserInfoForm: SuperValidated<Infer<UpdateUserInfoSchema>>;
    updateUserEmailForm: SuperValidated<Infer<UpdateUserEmailSchema>>;
    updateUserPwdForm: SuperValidated<Infer<UpdateUserPwdSchema>>;
  }

  const { updateUserInfoForm, updateUserEmailForm, updateUserPwdForm }: Props = $props();
</script>

<Table.Root>
  <Table.Caption class="text-primary/80">No records.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[50px]"></Table.Head>
      <Table.Head class="w-[50px] text-primary">ID</Table.Head>
      <Table.Head class="text-primary">Fullname</Table.Head>
      <Table.Head class="truncate text-primary">Home Address</Table.Head>
      <Table.Head class="text-primary">Email</Table.Head>
      <Table.Head class="truncate text-primary">Phone Number</Table.Head>
      <Table.Head class="truncate text-primary">Created At</Table.Head>
      <Table.Head class="text-primary">Photo</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Array(10) as _, index}
      <Table.Row>
        <Table.Cell class="font-medium">
          <div class="flex items-center">
            <UserMenu {updateUserInfoForm} {updateUserEmailForm} {updateUserPwdForm} />
          </div>
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{index + 1}</Table.Cell>
        <Table.Cell class="truncate text-xs text-primary/90">Phac Khu Kha</Table.Cell>
        <Table.Cell class="text-xs text-primary/90"
          >Pasig City, Client Change So Hot Philippines</Table.Cell
        >
        <Table.Cell class="text-xs text-primary/90">Malignos@gmail.com</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">+631425648272</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{new Date().toLocaleDateString()}</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">
          <div class="h-[50px] w-[50px] rounded-lg bg-red-500"></div>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
