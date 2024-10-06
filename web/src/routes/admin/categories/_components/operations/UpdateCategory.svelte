<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Loader } from 'lucide-svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { updateCatSchema, type UpdateCatSchema } from './schema';
  import ImgUploader from '$lib/components/general/ImgUploader.svelte';
  import type { AdminLayoutQ, Result } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    updateSignal: boolean;
    updateCatForm: SuperValidated<Infer<UpdateCatSchema>>;
    category: AdminLayoutQ['categories'][number];
  }

  let { updateSignal = $bindable(), updateCatForm, category }: Props = $props();

  const form = superForm(updateCatForm, {
    validators: zodClient(updateCatSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          updateSignal = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (updateSignal) {
      const parts = category.img_link.split('/');
      const fullPath = parts[parts.length - 1];
      $formData.oldName = category.name;
      $formData.imgPath = fullPath;
      $formData.newCatName = category.name;
    }
  });
</script>

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
      <AlertDialog.Title class="text-primary">Update Category</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        Kindy provide all the information needed to update this category.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" enctype="multipart/form-data" action="?/updateCategoryEvent" use:enhance>
      <Form.Field {form} name="imgPath" class="hidden">
        <Form.Control let:attrs>
          <Input {...attrs} bind:value={$formData.imgPath} />
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="oldName" class="hidden">
        <Form.Control let:attrs>
          <Input {...attrs} bind:value={$formData.oldName} />
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="newCatPhoto">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">Category Photo</Form.Label>
          <ImgUploader hasLink={category.img_link} {attrs} bind:file={$formData.newCatPhoto} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="newCatName">
        <Form.Control let:attrs>
          <Form.Label class="text-primary">Category Name</Form.Label>
          <Input
            {...attrs}
            bind:value={$formData.newCatName}
            placeholder="Enter new category name"
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
