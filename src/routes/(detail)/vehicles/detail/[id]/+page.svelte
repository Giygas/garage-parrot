<script lang="ts">
	import '../../../../../app.postcss';
	import { afterNavigate } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { DatabaseVoiture, userData } from '$lib/types';
	let windowWidth: number;
	let resizeListener: EventListener;

	onMount(() => {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;

			resizeListener = () => {
				windowWidth = window.innerWidth;
			};
			window.addEventListener('resize', resizeListener);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', resizeListener);
		}
	});

	afterNavigate(() => {
		if (windowWidth > 1023) {
			window.scrollTo({
				top: 250,
				left: 0,
				behavior: 'smooth'
			});
		} else if (windowWidth > 768) {
			window.scrollTo({
				top: 180,
				left: 0,
				behavior: 'smooth'
			});
		}
	});

	export let data;
	type Vehicle = NonNullable<DatabaseVoiture>;

	const vehicle = data.vehicle as Vehicle;

	let images: string[] = [];

	images.push(vehicle.image);

	if (vehicle.other_images) {
		for (let img of vehicle.other_images) {
			images.push(img);
		}
	}

	export const vehicleId = vehicle.id;
</script>

<svelte:head>
	<title>{vehicle.title} - Garage Parrot</title>
</svelte:head>

<div
	class="flex flex-wrap pt-5 justify-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:pt-52 md:justify-end md:pr-12 md:pb-12 lg:pr-24 lg:pt-60 xl:pr-40 xl:pb-24"
/>

<div class="flex flex-row w-full mt-24 md:mt-16 px-5 mb-10">
	<button class="flex place-items-center" on:click={() => history.back()}
		><Icon icon="ic:twotone-keyboard-arrow-left" width="48" height="48" style="color: #6A655C" />
		<span class="font-montserrat text-xl uppercase font-bold"> Retour </span>
	</button>
</div>

<div class="flex flex-col place-items-center px-10">
	<div class="carousel carousel-center sm:rounded-box">
		{#each images as img, i}
			<div class="carousel-item">
				<img
					src={img}
					alt="Vehicule image numero {i}"
					class=" h-[300px] md:h-[450px] lg:h-[600px]"
				/>
			</div>
		{/each}
	</div>

	<!-- TITLE -->
	<div class="flex mt-10 justify-between w-full place-items-center">
		<h1 class="montserrat text-accent text-xl md:text-2xl drop-shadow-lg">
			{vehicle.title}
		</h1>
		<h2 class="text-xl md:text-3xl font-semibold shrink-0">€ {vehicle.price}</h2>
	</div>

	<div class="divider divider-accent mt-8" />

	<div
		class="grid grid-cols-2 text-sm md:text-2xl text-primary w-full font-barlow items-center gap-2 md:gap-10 mt-4 md:mt-10"
	>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Année:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.year}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Moteur:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.engine ?? 'Non Renseigné'}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Kilometrage:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.kilometrage}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Traction:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.traction ?? 'Non Renseigné'}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Puissance:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.power ? vehicle.power + ' ch' : 'Non Renseigné'}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Portes:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.doors ?? 'Non Renseigné'}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Boîte:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.transmission ?? 'Non Renseigné'}
			</span>
		</div>
		<div class="flex gap-1 md:gap-6 items-baseline">
			<h3 class="font-barlow font-semibold">Sièges:</h3>
			<span class="font-light text-xs sm:text-sm md:text-2xl">
				{vehicle.seats ?? 'Non Renseigné'}
			</span>
		</div>
	</div>

	<div class="flex place-self-start text-secondary text-lg md:text-3xl mt-10 mb-4">EQUIPEMENT:</div>
	{#if vehicle.options?.length}
		<div class="flex flex-col px-24">
			<ul>
				{#each vehicle.options as option}
					<li
						class="font-barlow font-light text-xs sm:text-sm md:text-2xl list-disc text-primary w-full"
					>
						{option}
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class="flex text-2xl mt-4 md:mt-10">
			<span class="font-light sm:text-md md:text-2xl"> Non Renseigné </span>
		</div>
	{/if}
</div>
