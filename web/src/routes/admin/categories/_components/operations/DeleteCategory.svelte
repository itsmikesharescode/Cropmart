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
    category: AdminLayoutQ['categories'][number];
  }

  let { deleteSignal = $bindable(), category }: Props = $props();

  let deleteLoader = $state(false);
  const deleteCategoryEvent: SubmitFunction = () => {
    deleteLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          deleteSignal = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
      deleteLoader = false;
      await update();
    };
  };
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        This action cannot be undone. This will permanently delete "category <strong
          >{category.name}</strong
        >" from our database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel class="text-primary hover:text-primary">Cancel</AlertDialog.Cancel>
      <form method="post" action="?/deleteCategoryEvent" use:enhance={deleteCategoryEvent}>
        <input
          name="imgPath"
          type="hidden"
          value={category.img_link.split('category_bucket/')[1].split('?')[0]}
        />
        <input name="catId" type="hidden" value={category.id} />
        <Button disabled={deleteLoader} type="submit" variant="destructive" class="relative">
          {#if deleteLoader}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-destructive"
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
