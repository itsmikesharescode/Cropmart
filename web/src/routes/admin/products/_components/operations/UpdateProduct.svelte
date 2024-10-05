<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Popover from '$lib/components/ui/popover';
  import { CircleUser } from 'lucide-svelte';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateProductSchema } from './schema';

  interface Props {
    updateSignal: boolean;
    updateProductForm: SuperValidated<Infer<UpdateProductSchema>>;
  }

  let { updateSignal = $bindable(), updateProductForm }: Props = $props();
</script>

<Popover.Root>
  <AlertDialog.Root bind:open={updateSignal}>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title class="text-primary">Update Product</AlertDialog.Title>
        <AlertDialog.Description class="flex items-center">
          <div class="flex items-center gap-1.5">
            <p>Repolyo</p>
            <Popover.Trigger class="underline">View Owner</Popover.Trigger>
          </div>
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Continue</AlertDialog.Action>
      </AlertDialog.Footer>
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
