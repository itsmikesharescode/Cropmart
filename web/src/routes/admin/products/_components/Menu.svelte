<script lang="ts">
  import { AlignJustify } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import UpdateProduct from './operations/UpdateProduct.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateProductSchema } from './operations/schema';
  import DeleteProduct from './operations/DeleteProduct.svelte';

  interface Props {
    updateProductForm: SuperValidated<Infer<UpdateProductSchema>>;
  }

  const { updateProductForm }: Props = $props();

  let updateSignal = $state(false);
  let deleteSignal = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <AlignJustify class="text-primary/90" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label class="text-primary">Actions</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item
        onclick={() => (updateSignal = true)}
        class="text-primary data-[highlighted]:bg-primary/50 data-[highlighted]:text-white"
        >Update</DropdownMenu.Item
      >
      <DropdownMenu.Item
        onclick={() => (deleteSignal = true)}
        class="text-primary data-[highlighted]:bg-primary/50 data-[highlighted]:text-white"
        >Delete</DropdownMenu.Item
      >
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<UpdateProduct bind:updateSignal {updateProductForm} />
<DeleteProduct bind:deleteSignal />
