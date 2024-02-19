<script lang="ts">
	import type { DatabaseVoiture } from '$lib/types';
	import VehicleCard from './../../../lib/components/VehicleCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { vehicles } = data;

	let firstOne: DatabaseVoiture;
	if (vehicles) {
		firstOne = vehicles[0];
	}
</script>

<svelte:head>
	<title>Services - Garage Parrot</title>
</svelte:head>

<div class="md:hidden h-[120px]" />
<div
	class="flex flex-wrap pt-5 justify-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:pt-52 md:justify-end md:pr-12 md:pb-12 lg:pr-24 lg:pt-60 xl:pr-40 xl:pb-24"
>
	<h1 class="montserrat text-accent text-small-caps font-semibold">Nos Vehicules</h1>
</div>

<div class="grid grid-autofill gap-8 place-items-center mt-10 p-10">
	<VehicleCard vehicle={firstOne} />
	<VehicleCard vehicle={vehicles[1]} />
	<VehicleCard vehicle={firstOne} />
	<VehicleCard vehicle={firstOne} />
	<VehicleCard vehicle={firstOne} />
	<VehicleCard vehicle={firstOne} />
	<VehicleCard vehicle={firstOne} />
	<VehicleCard vehicle={firstOne} />
</div>

<style>
	.grid-autofill {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	}
</style>
