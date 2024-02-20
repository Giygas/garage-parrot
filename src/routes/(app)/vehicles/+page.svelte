<script lang="ts">
	import type { DatabaseVoiture } from '$lib/types';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import type { PageData } from './$types';
	import RangeSlider from 'svelte-range-slider-pips';

	export let data: PageData;

	const { vehicles } = data;

	let minKilometrage = 9999999;
	let maxKilometrage = 0;
	let minYear = 9999999;
	let maxYear = 0;
	let minPrice = 9999999;
	let maxPrice = 0;
	let vehiclesDisplay: DatabaseVoiture[] = [];
	if (vehicles) {
		for (let vehicle of vehicles) {
			if (vehicle.kilometrage > maxKilometrage) maxKilometrage = vehicle.kilometrage;
			if (vehicle.kilometrage < minKilometrage) minKilometrage = vehicle.kilometrage;
			if (vehicle.year > maxYear) maxYear = vehicle.year;
			if (vehicle.year < minYear) minYear = vehicle.year;
			if (vehicle.price > maxPrice) maxPrice = vehicle.price;
			if (vehicle.price < minPrice) minPrice = vehicle.price;
		}
	}

	let kilometrageValues = [minKilometrage, maxKilometrage, 100, 0];
	let yearValues = [minYear, maxYear, 100, 0];
	let priceValues = [minPrice, maxPrice, 100, 0];

	$: if (vehicles) {
		vehiclesDisplay = vehicles.filter(
			(v) =>
				v.price >= priceValues[0] &&
				v.price <= priceValues[1] &&
				v.kilometrage >= kilometrageValues[0] &&
				v.kilometrage <= kilometrageValues[1] &&
				v.year >= yearValues[0] &&
				v.year <= yearValues[1]
		);
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

<div class="grid xs:max-lg:grid-rows-3 lg:grid-cols-3 gap-2 md:gap-15 lg:gap-20 p-10 w-full">
	<div class="flex flex-col shrink-0 w-full mt-2">
		<h3>Price:</h3>
		<div>
			<RangeSlider
				id="price"
				max={maxPrice}
				min={minPrice}
				range="true"
				bind:values={priceValues}
			/>
		</div>
		<div class="flex flex-row gap-2 justify-between align-top pt-2 md:pt-0">
			<p class="flex items-center md:self-start text-xs self-center h-full">
				{priceValues[0]} - {priceValues[1]}
			</p>
			<button
				class="btn btn-primary btn-xs max-w-24 place-self-end"
				on:click={() => (priceValues = [minPrice, maxPrice])}>Réinitialiser</button
			>
		</div>
	</div>
	<div class="flex flex-col shrink-0 w-full mt-2">
		<h3>Kilométrage:</h3>
		<div>
			<RangeSlider
				id="kilometrage"
				max={maxKilometrage}
				min={minKilometrage}
				range="true"
				bind:values={kilometrageValues}
			/>
		</div>
		<div class="flex flex-col md:flex-row gap-2 justify-between align-top">
			<p class="flex items-center md:self-start text-xs self-center h-full">
				{kilometrageValues[0]} - {kilometrageValues[1]}
			</p>
			<button
				class="btn btn-primary btn-xs max-w-24 place-self-end"
				on:click={() => (kilometrageValues = [minKilometrage, maxKilometrage])}
				>Réinitialiser</button
			>
		</div>
	</div>
	<div class="flex flex-col shrink-0 w-full mt-2">
		<h3>Année:</h3>
		<RangeSlider
			id="price"
			max={maxYear}
			min={minYear}
			range="true"
			bind:values={yearValues}
			float
		/>
		<div class="flex flex-col md:flex-row gap-2 justify-between align-top">
			<p class="flex items-center md:self-start text-xs self-center h-full">
				{yearValues[0]} - {yearValues[1]}
			</p>
			<button
				class="btn btn-primary btn-xs max-w-24 place-self-end"
				on:click={() => (yearValues = [minYear, maxYear])}>Réinitialiser</button
			>
		</div>
	</div>
</div>

{#if vehiclesDisplay.length}
	<div class="grid grid-autofill gap-8 place-items-center mt-10 p-10">
		{#each vehiclesDisplay as vehicle}
			<VehicleCard {vehicle} />
		{/each}
	</div>
{:else}
	<div class="w-full flex justify-center align-middle mt-10">
		<h2 class="text-6xl text-primary/80 font-montserrat tracking-wide small-caps text-center">
			Pas de vehicules pour le moment
		</h2>
	</div>
{/if}

<style>
	.grid-autofill {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	}

	:root {
		/* --range-slider: #a51d2d; */
		/* --range-slider: #6A655C; */
		--range-slider: #f3f2f1;
		--range-handle-inactive: #a51d2d;
		--range-handle: #a51d2d;
		--range-handle-focus: #e62f44d8;
		/* --range-handler: #f3f2f1; */
		/* --range-range: #a51d2d;
		--range-handle-border: #6c2828; */
	}
</style>
