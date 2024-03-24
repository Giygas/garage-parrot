<script lang="ts">
	import { browser } from '$app/environment';
	import '../../app.postcss';
	import { goto } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';

	export let data;

	let { supabase, session, options } = data;
	$: ({ supabase, session } = data);

	const disconnect = async () => {
		await supabase.auth.signOut();
		goto('/login');
	};

	const minAdminWidth = 1069;
	let innerWidth: number = 1070;

	$: if (innerWidth < minAdminWidth) {
		if (browser) {
			goto('/small-screen');
		}
	}
</script>

<svelte:head>
	<title>Admin Panel</title>

	<link rel="stylesheet" href="/fonts.css" />
</svelte:head>

<svelte:window bind:innerWidth />

<Toaster />

<div class="h-screen max-h-screen">
	<div class="w-screen p-8 xl:p-16">
		<div class="flex justify-end">
			<a href="/" class="btn btn-sm btn-primary text-background float-end mr-6">Retourner au site</a
			><button on:click={disconnect} class="btn btn-sm btn-primary text-background float-end"
				>Se deconnecter</button
			>
		</div>
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
		<div class="col-span-4 justify-self-center p-8 lg:px-16 lg:pl-5 w-full">
			<slot />
		</div>
	</div>
</div>
