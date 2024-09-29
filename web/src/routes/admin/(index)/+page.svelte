<script lang="ts">
	import BarChart from './_components/BarChart.svelte';
	import LineChart from './_components/LineChart.svelte';
</script>

{#snippet CounterCard()}
	<div class="max-w-[400px] rounded-lg border-2 border-primary p-4">
		<p class="text-center text-[2rem] font-bold text-primary">Products</p>
		<p class="text-center text-[3rem] font-bold text-primary/50">20</p>
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
		{@render CounterCard()}
		{@render CounterCard()}
		{@render CounterCard()}
	</div>
</div>
