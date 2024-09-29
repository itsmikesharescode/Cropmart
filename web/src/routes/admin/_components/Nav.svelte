<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { ...props }: Props = $props();
</script>

<div class="grid lg:grid-cols-[300px,1fr]">
	<div class=""></div>
	<div class="">
		<nav class="sticky top-0 flex items-center justify-end border-b-2 border-l-2 px-5 py-2">
			<div class="flex items-center gap-2.5">
				<p class="font-semibold leading-7 text-muted-foreground">Admin, <strong>Kaloy</strong></p>
				<div class="h-[45px] w-[45px] rounded-full bg-red-500"></div>
			</div>
		</nav>

		<div class="min-h-screen border-l-2">
			{@render props.children()}
		</div>
	</div>
</div>
