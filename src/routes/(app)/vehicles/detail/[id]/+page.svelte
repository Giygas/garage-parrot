<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';

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
	const { vehicle } = data;

	let images: string[] = [];

	images.push(vehicle.image);

	if (vehicle.other_images) {
		for (let img of vehicle.other_images) {
			images.push(img);
		}
	}
</script>

<svelte:head>
	<title>Services - Garage Parrot</title>
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

<div class="flex flex-col place-items-center h-[300px] md:h-[450px] lg:h-[600px] px-10">
	<div class="carousel carousel-center sm:rounded-box">
		{#each images as img, i}
			<div class="carousel-item">
				<img
					src={img}
					alt="Vehicule image numero {i}"
					class=" aspect-video h-[300px] md:h-[450px] lg:h-[600px]"
				/>
			</div>
		{/each}
	</div>
</div>
