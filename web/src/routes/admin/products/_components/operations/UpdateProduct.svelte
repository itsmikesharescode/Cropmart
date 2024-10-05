<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Popover from '$lib/components/ui/popover';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { updateProductSchema, type UpdateProductSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { X } from 'lucide-svelte';

  interface Props {
    updateSignal: boolean;
    updateProductForm: SuperValidated<Infer<UpdateProductSchema>>;
  }

  let { updateSignal = $bindable(), updateProductForm }: Props = $props();

  const form = superForm(updateProductForm, {
    validators: zodClient(updateProductSchema),
    id: crypto.randomUUID()
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Popover.Root>
  <AlertDialog.Root bind:open={updateSignal}>
    <AlertDialog.Content>
      <button
        onclick={() => {
          updateSignal = false;
          form.reset();
        }}
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-red-500"
      >
        <X class="h-4 w-4 text-primary " />
        <span class="sr-only">Close</span>
      </button>
      <AlertDialog.Header>
        <AlertDialog.Title class="text-primary">Update Product</AlertDialog.Title>
        <AlertDialog.Description class="flex items-center text-primary">
          <div class="flex items-center gap-1.5">
            <p>Repolyo</p>
            <Popover.Trigger class="font-medium underline">View Owner</Popover.Trigger>
          </div>
        </AlertDialog.Description>
      </AlertDialog.Header>

      <form method="POST" use:enhance>
        <Form.Field {form} name="price">
          <Form.Control let:attrs>
            <Form.Label class="text-primary">Product Price</Form.Label>
            <Input type="number" {...attrs} bind:value={$formData.price} />
          </Form.Control>

          <Form.FieldErrors />
        </Form.Field>
        <AlertDialog.Footer>
          <Form.Button>Update</Form.Button>
        </AlertDialog.Footer>
      </form>
    </AlertDialog.Content>
  </AlertDialog.Root>
  <Popover.Content>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
    <p class="text-sm font-semibold text-primary">Mike John Eviota</p>
    <p class="text-sm text-primary/90">+639213456784</p>
    <p class="text-sm text-primary/90">Blk 33 Lakas Tao, St Bernadeth Pasig City</p>
  </Popover.Content>
</Popover.Root>
