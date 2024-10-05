<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import Menu from './Menu.svelte';
  import type { UpdateProductSchema } from './operations/schema';
  import { fromProductState } from '../../_route_states/prodRoute.svelte';
  import * as Avatar from '$lib/components/ui/avatar';

  interface Props {
    updateProductForm: SuperValidated<Infer<UpdateProductSchema>>;
  }

  const { updateProductForm }: Props = $props();

  const productState = fromProductState();
</script>

<Table.Root>
  <Table.Caption class="text-primary/80">No records.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[50px]"></Table.Head>
      <Table.Head class="w-[50px] text-primary">ID</Table.Head>
      <Table.Head class="truncate text-primary">Created At</Table.Head>
      <Table.Head class="truncate text-primary">Owner Name</Table.Head>
      <Table.Head class="truncate text-primary">Product Name</Table.Head>
      <Table.Head class="text-primary">Price</Table.Head>
      <Table.Head class="text-primary">Quantity</Table.Head>
      <Table.Head class="text-primary">Category</Table.Head>
      <Table.Head class="text-primary">Photo</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each productState.getProucts() ?? [] as product, index}
      <Table.Row>
        <Table.Cell class="">
          <div class="flex items-center">
            <Menu {updateProductForm} />
          </div>
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">
          {index + 1}
        </Table.Cell>
        <Table.Cell class="truncate text-xs text-primary/90">
          {new Date(product.created_at).toLocaleDateString()} @ {new Date(
            product.created_at
          ).toLocaleTimeString()}
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90 "
          >{product.user_meta_data.lastName}, {product.user_meta_data.firstName}</Table.Cell
        >
        <Table.Cell class="text-xs text-primary/90 ">{product.name}</Table.Cell>
        <Table.Cell class="truncate text-xs text-primary/90"
          >₱{product.price.toLocaleString()}/Kg</Table.Cell
        >
        <Table.Cell class="truncate text-xs text-primary/90"
          >{product.quantity.toLocaleString()} Kilos</Table.Cell
        >
        <Table.Cell class="truncate text-xs text-primary/90">{product.category}</Table.Cell>
        <Table.Cell class="text-xs text-primary/90">
          <div class="">
            <Avatar.Root class="h-[50px] w-[50px] rounded-lg">
              <Avatar.Image src={product.img_link} alt="@loading" />
              <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
          </div>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
