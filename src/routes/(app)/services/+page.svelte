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
<!-- TODO: delete this -->
<!-- <div class="mt-52 md:mt-64 xl:mb-44 xl:px-12"> -->
<div class="md:hidden h-[120px]" />
<div
	class="flex flex-wrap pt-5 justify-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:pt-52 md:justify-end md:pr-12 md:pb-12 lg:pr-24 lg:pt-60 xl:pr-40 xl:pb-24"
>
	<h1 class="montserrat text-accent text-small-caps font-semibold">Nos Services</h1>
</div>
{#each services as service}
	<div class="flex flex-col w-full px-7 mt-12 lg:px-16 lg:mt-20">
		<h2
			class="montserrat uppercase text-primary font-bold self-start text-md md:text-2xl lg:text-4xl lg:tracking-widest"
		>
			{service.title}
		</h2>
		<br />
		<p
			class="self-end text-primary font-normal text-md md:text-lg lg:text-2xl lg:leading-10 lg:tracking-wide mt-2 lg:mt-8 ml-6 lg:ml-16"
			style="white-space: pre-line;"
		>
			{service.description}
		</p>
	</div>
{/each}
