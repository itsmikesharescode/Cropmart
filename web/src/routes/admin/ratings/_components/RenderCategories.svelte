<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import * as Avatar from '$lib/components/ui/avatar';
  import type { PostgrestSingleResponse } from '@supabase/supabase-js';
  import type { UserListType } from '$lib/types';
  import { page } from '$app/stores';

  const getFarmerById = async (id: string) => {
    if (!$page.data.supabase) return null;

    const { data, error } = (await $page.data.supabase
      .from('farmer_list_tb')
      .select('*')
      .eq('user_id', id)
      .single()) as PostgrestSingleResponse<UserListType>;
    console.log(data, error?.message);
    if (error) return null;
    return data;
  };

  interface Props {
    ratings: { farmer_id: string; average_rating: number }[] | null;
  }

  const { ratings }: Props = $props();
</script>

<Table.Root>
  {#if !ratings?.length}
    <Table.Caption class="text-primary/80">No records.</Table.Caption>
  {/if}
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-full text-primary">Farmer Name</Table.Head>
      <Table.Head class="w-full truncate text-primary">Average Rating</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each ratings ?? [] as rating, index}
      <Table.Row>
        <Table.Cell class="text-xs text-primary/90">
          {#await getFarmerById(rating.farmer_id)}
            loading...
          {:then farmer}
            <div class="flex items-center gap-2">
              <Avatar.Root>
                <Avatar.Image src={farmer?.user_meta_data.avatarLink} alt="picture" />
                <Avatar.Fallback>
                  {farmer?.user_meta_data.firstName.charAt(0)}
                  {farmer?.user_meta_data.lastName.charAt(0)}
                </Avatar.Fallback>
              </Avatar.Root>
              <span>
                {farmer?.user_meta_data.firstName}
                {farmer?.user_meta_data.lastName}
              </span>
            </div>
          {/await}
        </Table.Cell>
        <Table.Cell class="text-xs text-primary/90">{rating.average_rating}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
