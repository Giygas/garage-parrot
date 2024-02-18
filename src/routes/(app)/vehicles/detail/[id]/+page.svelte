<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { vehicleSchema } from '$lib/schemas';
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

<div class="flex flex-col justify-center">
	<div class="grid grid-cols-12 h-[576px]">
		<div class="col-span-12 md:col-span-8 h-[570px]">
			<img src={vehicle.image} alt="Principal" />
		</div>
		<div class="col-span-12 md:col-span-4 bg-slate-400">
			{#if vehicle.other_images}
				<div class="carousel carousel-vertical h-full max-h-fit">
					{#each vehicle.other_images as img}
						<div class="carousel-item h-1/2">
							<img src={img} class="w-full" alt="Vehicle" />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- <style>
	.carousel {
		height: 100cqb;
	}
</style> -->
