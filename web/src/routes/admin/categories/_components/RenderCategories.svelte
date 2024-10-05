<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import CatMenu from './CatMenu.svelte';
</script>

<Table.Root>
  <Table.Caption class="text-primary/80">No records.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[50px]"></Table.Head>
      <Table.Head class="w-[50px] text-primary">ID</Table.Head>
      <Table.Head class="w-full text-primary">Name</Table.Head>
      <Table.Head class="w-full truncate text-primary">Created At</Table.Head>
      <Table.Head class="w-full text-primary">Photo</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Array(10) as _, index}
      <Table.Row>
        <Table.Cell class="font-medium">
          <div class="flex items-center">
            <CatMenu />
          </div>
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{index + 1}</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">Poultry</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{new Date().toLocaleDateString()}</Table.Cell>

        <Table.Cell class="text-xs text-primary/90">
          <div class="h-[50px] w-[50px] rounded-lg bg-red-500"></div>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
