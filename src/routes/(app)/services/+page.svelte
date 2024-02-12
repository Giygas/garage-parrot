<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const services = data.services;
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
			<br />
			<p
				class="text-3xl text-primary leading-10 font-normal tracking-wide pl-28"
				style="white-space: pre-line;"
			>
				{service.description}
			</p>
		</div>
	{/each}
</section>
