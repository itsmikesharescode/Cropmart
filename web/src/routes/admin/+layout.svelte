<script lang="ts">
	import Nav from './_components/Nav.svelte';

	const { data, children } = $props();
</script>

<Nav {children} />
