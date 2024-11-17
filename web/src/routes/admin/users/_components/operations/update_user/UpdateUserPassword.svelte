<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { X, Loader } from 'lucide-svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { updateUserPwdSchema, type UpdateUserPwdSchema } from '../schema';
  import type { Result, UserListType } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    updateUserPwdForm: SuperValidated<Infer<UpdateUserPwdSchema>>;
    updatePwdSignal: boolean;
    activeUser: UserListType;
  }

  let { updatePwdSignal = $bindable(), updateUserPwdForm, activeUser }: Props = $props();

  const form = superForm(updateUserPwdForm, {
    validators: zodClient(updateUserPwdSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          updatePwdSignal = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (updatePwdSignal) {
      $formData.userId = activeUser.user_id;
    }
  });
</script>

<AlertDialog.Root bind:open={updatePwdSignal}>
  <AlertDialog.Content>
    <button
      disabled={$submitting}
      type="button"
      onclick={() => {
        updatePwdSignal = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-red-500"
    >
      <X class="h-4 w-4 text-primary " />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Update Password</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        Kindy provide all the information needed to update the password.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateUserPwdEvent" use:enhance>
      <Form.Field {form} name="userId" class="hidden">
        <Form.Control let:attrs>
          <Input {...attrs} bind:value={$formData.userId} />
        </Form.Control>
      </Form.Field>
      <Form.Field {form} name="newPwd">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">New Password</Form.Label>
          <Input
            type="password"
            {...attrs}
            bind:value={$formData.newPwd}
            placeholder="Enter new password"
          />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="confirmNewPwd">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">Confirm New Password</Form.Label>
          <Input
            type="password"
            {...attrs}
            bind:value={$formData.confirmNewPwd}
            placeholder="Confirm new password"
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
