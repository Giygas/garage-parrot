<script lang="ts">
	import '../../app.postcss';
	import { goto, invalidate } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { ActionData } from './$types.js';

	export let data;

	let { supabase, session, options } = data;
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

	const disconnect = async () => {
		await supabase.auth.signOut();
		goto('/login');
	};
</script>

<svelte:head>
	<title>Admin Panel</title>

	<link rel="stylesheet" href="/fonts.css" />
</svelte:head>

<Toaster />

<div class="h-screen max-h-screen">
	<div class="w-screen p-8 xl:p-16">
		<button on:click={disconnect} class="btn btn-sm btn-primary text-background float-end"
			>Se deconnecter</button
		>
		<h1 class="text-4xl text-accent font-montserrat uppercase font-semibold">
			Panel d'administration du garage
		</h1>
		<p class="text-lg pt-1">Utilisateur: {session?.user.user_metadata.name}</p>
	</div>
	<div class="grid grid-cols-5 pt-4">
		<div class="col-span-1">
			<aside class="p-8 justify-self-center flex flex-col gap-6">
				{#each options as option}
					<a href={option.link} class="btn btn-accent">{option.name}</a>
				{/each}
			</aside>
		</div>
		<div class="col-span-4 justify-self-center p-8 lg:p-16 w-full max-w-[1200px]">
			<slot />
		</div>
	</div>
</div>
