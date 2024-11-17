<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result, UserListType } from '$lib/types';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Loader } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  interface Props {
    deleteSignal: boolean;
    activeUser: UserListType;
  }

  let { deleteSignal = $bindable(), activeUser }: Props = $props();

  let deleteLoader = $state(false);
  const deleteUserEvent: SubmitFunction = () => {
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
      await update();
      deleteLoader = false;
    };
  };
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        This action cannot be undone. This will permanently delete <strong>Mike John</strong> from our
        database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel class="text-primary hover:text-primary" disabled={deleteLoader}
        >Cancel</AlertDialog.Cancel
      >
      <form method="post" action="?/deleteUserEvent" use:enhance={deleteUserEvent}>
        <input name="userId" type="hidden" value={activeUser.user_id} />
        <Button type="submit" disabled={deleteLoader} variant="destructive" class="relative">
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
