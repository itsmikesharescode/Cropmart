<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Plus, X, Loader } from 'lucide-svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createCatSchema, type CreateCatSchema } from './schema';
  import ImgUploader from '$lib/components/general/ImgUploader.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    createCategoryForm: SuperValidated<Infer<CreateCatSchema>>;
  }

  const { createCategoryForm }: Props = $props();

  let open = $state(false);

  const form = superForm(createCategoryForm, {
    validators: zodClient(createCatSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          open = false;
          break;
        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button class="gap-1.5" onclick={() => (open = true)}>
  <Plus class="h-4 w-4" />
  New Category
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      onclick={() => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-red-500"
    >
      <X class="h-4 w-4 text-primary " />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Add Category</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        Kindy provide all the information needed to create a new category.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" enctype="multipart/form-data" action="?/createCategoryEvent" use:enhance>
      <Form.Field {form} name="catPhoto">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">Category Photo</Form.Label>
          <ImgUploader hasLink="" {attrs} bind:file={$formData.catPhoto} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="catName">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">Category Name</Form.Label>
          <Input {...attrs} bind:value={$formData.catName} />
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

          Upload
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
