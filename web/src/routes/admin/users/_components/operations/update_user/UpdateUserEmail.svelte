<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Plus, X } from 'lucide-svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { updateUserEmailSchema, type UpdateUserEmailSchema } from '../schema';

  interface Props {
    updateUserEmailForm: SuperValidated<Infer<UpdateUserEmailSchema>>;
    updateEmailSignal: boolean;
  }

  let { updateEmailSignal = $bindable(), updateUserEmailForm }: Props = $props();

  const form = superForm(updateUserEmailForm, {
    validators: zodClient(updateUserEmailSchema),
    id: crypto.randomUUID()
  });

  const { form: formData, enhance, submitting } = form;
</script>

<AlertDialog.Root bind:open={updateEmailSignal}>
  <AlertDialog.Content>
    <button
      type="button"
      onclick={() => {
        updateEmailSignal = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-red-500"
    >
      <X class="h-4 w-4 text-primary " />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Update Email</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        Kindy provide all the information needed to upate an email.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" enctype="multipart/form-data" action="?/createCategoryEvent" use:enhance>
      <Form.Field {form} name="newEmail">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">New Email</Form.Label>
          <Input {...attrs} bind:value={$formData.newEmail} placeholder="Enter new email" />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <AlertDialog.Footer>
        <Form.Button>Update</Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
