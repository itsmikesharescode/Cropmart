<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from './admin/_components/Nav.svelte';

	const { data: layoutSB, children } = $props();

	onMount(() => {
		const { data } = layoutSB.supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== layoutSB.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Nav {children} />
