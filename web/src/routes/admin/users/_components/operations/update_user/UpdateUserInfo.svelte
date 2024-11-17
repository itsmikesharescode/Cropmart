<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Plus, X, Loader } from 'lucide-svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { updateUserInfoSchema, type UpdateUserInfoSchema } from '../schema';
  import type { Result, UserListType } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    updateUserInfoForm: SuperValidated<Infer<UpdateUserInfoSchema>>;
    updateInfoSignal: boolean;
    activeUser: UserListType;
  }

  let { updateInfoSignal = $bindable(), updateUserInfoForm, activeUser }: Props = $props();

  const form = superForm(updateUserInfoForm, {
    validators: zodClient(updateUserInfoSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          updateInfoSignal = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (updateInfoSignal) {
      $formData.userId = activeUser.user_id;
      $formData.newFname = activeUser.user_meta_data.firstName;
      $formData.newLname = activeUser.user_meta_data.lastName;
      $formData.newAddress = activeUser.user_meta_data.address;
      $formData.newMobileNum = activeUser.user_meta_data.mobileNumber;
    }
  });
</script>

<AlertDialog.Root bind:open={updateInfoSignal}>
  <AlertDialog.Content>
    <button
      type="button"
      onclick={() => {
        updateInfoSignal = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-red-500"
    >
      <X class="h-4 w-4 text-primary " />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Update Information</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        Kindy provide all the information needed to upate information.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateUserInfoEvent" use:enhance>
      <Form.Field {form} name="userId" class="hidden">
        <Form.Control let:attrs>
          <Input {...attrs} bind:value={$formData.userId} />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="newFname">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">New First Name</Form.Label>
          <Input {...attrs} bind:value={$formData.newFname} placeholder="Enter new first name" />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="newLname">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">New Last Name</Form.Label>
          <Input {...attrs} bind:value={$formData.newLname} placeholder="Enter new last name" />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="newAddress">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">New Address</Form.Label>
          <Input {...attrs} bind:value={$formData.newAddress} placeholder="Enter new address" />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="newMobileNum">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">New Mobile Number</Form.Label>
          <Input
            {...attrs}
            bind:value={$formData.newMobileNum}
            placeholder="Enter new mobile number"
          />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <AlertDialog.Footer>
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Update
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
