<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { afterNavigate, replaceState } from '$app/navigation';

	export let data: PageData;

	const services = data.services;

	afterNavigate(() => {
		replaceState('', $page.url.href.split('#')[0]);
	});
</script>

<svelte:head>
	<title>Services - Garage Parrot</title>
</svelte:head>
<!-- #TODO: Responsive design here -->
<!-- <div class="mt-52 md:mt-64 xl:mb-44 xl:px-12"> -->
<div class="md:hidden h-[120px]" />
<div class="flex flex-wrap pt-5 justify-center text-3xl">
	<h1 class="montserrat text-accent text-small-caps font-semibold">Nos Services</h1>
</div>
{#each services as service}
	<div class="flex flex-col w-full px-7 mt-10">
		<!-- <h2 class="montserrat uppercase text-5xl text-primary font-bold tracking-widest mb-14"> -->
		<h2 class="montserrat uppercase text-primary font-bold self-start text-xl">
			{service.title}
		</h2>
		<br />
		<p
			class="self-end text-primary font-normal lg:leading-10 lg:tracking-wide mt-2 ml-6"
			style="white-space: pre-line;"
		>
			{service.description}
		</p>
	</div>
{/each}
