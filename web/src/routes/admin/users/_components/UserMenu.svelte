<script lang="ts">
  import { AlignJustify } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import DeleteUser from './operations/DeleteUser.svelte';
  import * as Menubar from '$lib/components/ui/menubar';
  import Label from '$lib/components/ui/label/label.svelte';
  import UpdateUserEmail from './operations/update_user/UpdateUserEmail.svelte';
  import type { UpdateUserEmailSchema, UpdateUserInfoSchema } from './operations/schema';
  import UpdateUserInfo from './operations/update_user/UpdateUserInfo.svelte';

  interface Props {
    updateUserEmailForm: SuperValidated<Infer<UpdateUserEmailSchema>>;
    updateUserInfoForm: SuperValidated<Infer<UpdateUserInfoSchema>>;
  }

  const { updateUserEmailForm, updateUserInfoForm }: Props = $props();

  let updateInfoSignal = $state(false);
  let updateEmailSignal = $state(false);
  let deleteSignal = $state(false);

  let open = $state(false);
</script>

<Menubar.Root preventScroll={true}>
  <Menubar.Menu bind:open>
    <Menubar.Trigger class="cursor-pointer data-[state=open]:bg-inherit">
      <AlignJustify class="text-primary/90" />
    </Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Label class="text-primary">Actions</Menubar.Label>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger
          class="text-primary data-[highlighted]:bg-primary/50 data-[state=open]:bg-primary/50 data-[highlighted]:text-white data-[state=open]:text-white"
          >Update</Menubar.SubTrigger
        >
        <Menubar.SubContent>
          <Menubar.Item
            onclick={() => (updateInfoSignal = true)}
            class="text-primary data-[highlighted]:bg-primary/50 data-[state=open]:bg-primary/50 data-[highlighted]:text-white data-[state=open]:text-white"
            >Update Information</Menubar.Item
          >
          <Menubar.Item
            onclick={() => (updateEmailSignal = true)}
            class="text-primary data-[highlighted]:bg-primary/50 data-[state=open]:bg-primary/50 data-[highlighted]:text-white data-[state=open]:text-white"
            >Update Email</Menubar.Item
          >
          <Menubar.Item
            class="text-primary data-[highlighted]:bg-primary/50 data-[state=open]:bg-primary/50 data-[highlighted]:text-white data-[state=open]:text-white"
            >Update Password</Menubar.Item
          >
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Item
        onclick={() => (deleteSignal = true)}
        class="text-primary data-[highlighted]:bg-primary/50 data-[state=open]:bg-primary/50 data-[highlighted]:text-white data-[state=open]:text-white"
        >Delete</Menubar.Item
      >
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>

<UpdateUserInfo bind:updateInfoSignal {updateUserInfoForm} />
<UpdateUserEmail bind:updateEmailSignal {updateUserEmailForm} />
<DeleteUser bind:deleteSignal />
