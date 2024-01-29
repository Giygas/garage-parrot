<script lang="ts">
	import jsonServices from '$lib/db/services.json';
	import type { Services } from '$lib/types';

	const services = jsonServices as Services[];
	console.log(services);
</script>

<svelte:head>
	<title>Services - Garage Parrot</title>
</svelte:head>
<!-- #TODO: Responsive design here -->
<section class="container px-8 mb-56">
	<div class="mt-64 mb-44 px-12">
		<h1 class="montserrat text-accent text-small-caps text-6xl text-right font-semibold">
			Nos Services
		</h1>
	</div>
	{#each services as service}
		<div class="mt-16 h-80">
			<h2 class="montserrat uppercase text-5xl text-primary font-bold tracking-widest mb-14">
				{service.title}
			</h2>
			<p class="text-3xl text-primary leading-10 font-normal tracking-wide pl-28">
				{service.description}
			</p>
		</div>
	{/each}
</section>
