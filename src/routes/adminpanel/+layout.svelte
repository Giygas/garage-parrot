<script lang="ts">
	import '../../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Admin Panel</title>

	<link rel="stylesheet" href="/fonts.css" />
</svelte:head>

<div class="grid grid-cols-4 h-screen max-h-screen">
	<div class="col-span-1">
		<aside class="bg-slate-400 h-full">
			<h1>Panel d'administration du garage</h1>
		</aside>
	</div>
	<div class="col-span-3">
		<slot />
	</div>
</div>
