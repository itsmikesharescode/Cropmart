<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';

  interface Props {
    deleteSignal: boolean;
  }

  let { deleteSignal = $bindable() }: Props = $props();
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-primary">Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        This action cannot be undone. This will permanently delete <strong>Repolyo</strong> from our
        database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel class="text-primary hover:text-primary">Cancel</AlertDialog.Cancel>
      <form>
        <Button variant="destructive">Continue</Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
