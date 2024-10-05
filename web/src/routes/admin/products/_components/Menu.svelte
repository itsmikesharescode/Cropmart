<script lang="ts">
  import { AlignJustify } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
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
        class="text-primary data-[highlighted]:bg-primary/50 data-[highlighted]:text-white"
        >Update</DropdownMenu.Item
      >
      <DropdownMenu.Item
        class="text-primary data-[highlighted]:bg-primary/50 data-[highlighted]:text-white"
        >Delete</DropdownMenu.Item
      >
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
