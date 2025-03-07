<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import * as Avatar from '$lib/components/ui/avatar';
</script>

<Table.Root>
  {#if ![]?.length}
    <Table.Caption class="text-primary/80">No records.</Table.Caption>
  {/if}
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
    {#each [] as category, index}
      <Table.Row>
        <Table.Cell class="font-medium">
          <div class="flex items-center">Menu</div>
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{index + 1}</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{category.name}</Table.Cell>
        <Table.Cell class="truncate text-xs text-primary/90">
          {new Date(category.created_at).toLocaleDateString()} @ {new Date(
            category.created_at
          ).toLocaleTimeString()}
        </Table.Cell>

        <Table.Cell class="text-xs text-primary/90">
          <div class="">
            <Avatar.Root class="h-[50px] w-[50px] rounded-lg">
              <Avatar.Image src={category.img_link} alt="@loading" />
              <Avatar.Fallback>
                {category.name[0].toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
