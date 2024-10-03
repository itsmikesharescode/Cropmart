<script>
	import '@fontsource/poppins/100.css';
	import '@fontsource/poppins/200.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '@fontsource/poppins/900.css';
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';
	import { fromSupabaseState, initSupabase } from '$lib/states/supabaseState.svelte';
	const { data: layoutSB, children } = $props();

	onMount(() => {
		const { data } = layoutSB.supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== layoutSB.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	initSupabase();
	const supabase = fromSupabaseState();

	$effect(() => {
		supabase.set(layoutSB.supabase ?? null);
	});
</script>

<Toaster />
<div class="bg-yellow-500/20">
	{@render children()}
</div>

<style>
	:global(html) {
		font-family: 'Poppins', sans-serif;
	}
</style>
