<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { fromSupabaseState } from '$lib/states/supabaseState.svelte';
	import { LogOut, Loader } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let open = $state(false);

	const supabase = fromSupabaseState();

	let loader = $state(false);

	const handleLogout = async () => {
		const sb = supabase.get();
		if (sb) {
			loader = true;
			const { error } = await sb.auth.signOut();
			loader = false;
			if (error) return toast.error('', { description: error.message });
			toast.success('', { description: 'Thank you come back again!' });
			invalidateAll();
		}
	};
</script>

<Button class="gap-1.5" onclick={() => (open = true)}>
	<LogOut class="h-[20px] w-[20px]" />
	Log out
</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				You are about to log out of the <strong>Crop Mart Management Portal.</strong>
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<Button disabled={loader} onclick={handleLogout} class="relative">
				{#if loader}
					<div
						class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
					>
						<Loader class="h-[15px] w-[15px] animate-spin" />
					</div>
				{/if}
				Proceed
			</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
