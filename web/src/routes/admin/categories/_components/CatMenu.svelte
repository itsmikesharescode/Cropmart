<script lang="ts">
  import { AlignJustify } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import UpdateCategory from './operations/UpdateCategory.svelte';
  import type { UpdateCatSchema } from './operations/schema';
  import DeleteCategory from './operations/DeleteCategory.svelte';
  import type { AdminLayoutQ } from '$lib/types';

  interface Props {
    updateCatForm: SuperValidated<Infer<UpdateCatSchema>>;
    category: AdminLayoutQ['categories'][number];
  }

  const { updateCatForm, category }: Props = $props();

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

<UpdateCategory bind:updateSignal {updateCatForm} {category} />
<DeleteCategory bind:deleteSignal />
