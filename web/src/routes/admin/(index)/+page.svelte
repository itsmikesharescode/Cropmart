<script lang="ts">
  import { fromCategoryState } from '../_route_states/catRoute.svelte';
  import { fromProductState } from '../_route_states/prodRoute.svelte';
  import { fromUserManagementState } from '../_route_states/userRoute.svelte';
  import BarChart from './_components/BarChart.svelte';
  import LineChart from './_components/LineChart.svelte';

  const productState = fromProductState();
  const categoryState = fromCategoryState();
  const userManagementState = fromUserManagementState();
</script>

{#snippet CounterCard(title: string, count: number)}
  <div class="max-w-[400px] rounded-lg border-2 border-primary p-4">
    <p class="text-center text-[2rem] font-bold text-primary">{title}</p>
    <p class="text-center text-[3rem] font-bold text-primary/50">{count}</p>
  </div>
{/snippet}

<div class="flex flex-col gap-2.5 p-4">
  <div class="grid grid-cols-2 gap-2.5">
    <div class="h-[30dvh]">
      <LineChart />
    </div>
    <div class="h-[30dvh]">
      <BarChart />
    </div>
  </div>

  <div class="grid grid-cols-3 gap-2.5">
    {@render CounterCard('Products', productState.getProucts()?.length ?? 0)}
    {@render CounterCard('Categories', categoryState.getCategories()?.length ?? 0)}
    {@render CounterCard(
      'Users',
      (userManagementState.getFarmers()?.length ?? 0) +
        (userManagementState.getEntrepreneurs()?.length ?? 0) +
        (userManagementState.getRiders()?.length ?? 0)
    )}
  </div>
</div>
