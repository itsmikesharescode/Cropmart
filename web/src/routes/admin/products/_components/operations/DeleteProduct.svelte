<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { AdminLayoutQ, Result } from '$lib/types';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Loader } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  interface Props {
    deleteSignal: boolean;
    product: AdminLayoutQ['products'][number];
  }

  let { deleteSignal = $bindable(), product }: Props = $props();

  let deleteLoader = $state(false);
  const deleteProductEvent: SubmitFunction = () => {
    deleteLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          deleteLoader = false;
          deleteSignal = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
      await update();
    };
  };
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        This action cannot be undone. It will permanently delete all related data, including ongoing
        transactions and other associated information of product <strong>{product.name}</strong>
        owned by
        <strong>{product.user_meta_data.lastName}, {product.user_meta_data.firstName}</strong> from our
        database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel class="text-primary hover:text-primary">Cancel</AlertDialog.Cancel>
      <form method="post" action="?/deleteProductEvent" use:enhance={deleteProductEvent}>
        <input name="userId" type="hidden" value={product.user_id} />
        <input name="productId" type="hidden" value={product.id} />
        <Button disabled={deleteLoader} type="submit" variant="destructive" class="relative">
          {#if deleteLoader}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}

          Continue
        </Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
