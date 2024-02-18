<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';

	let windowWidth: number;
	let resizeListener: EventListener;

	let imageBreakpoint: number = 768;

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

	$: console.log(windowWidth);

	export let data;

	console.log(data);
</script>

<svelte:head>
	<title>Services - Garage Parrot</title>
</svelte:head>

<div
	class="flex flex-wrap pt-5 justify-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:pt-52 md:justify-end md:pr-12 md:pb-12 lg:pr-24 lg:pt-60 xl:pr-40 xl:pb-24"
/>

<div class="flex flex-row w-full mt-24 md:mt-16 px-5">
	<button class="flex place-items-center" on:click={() => history.back()}
		><Icon icon="ic:twotone-keyboard-arrow-left" width="48" height="48" style="color: #6A655C" />
		<span class="font-montserrat text-xl uppercase font-bold"> Retour </span>
	</button>
</div>

<div class="flex flex-col justify-center">
	<div class="grid grid-cols-12">
		<div class="col-span-12 md:col-span-8 bg-blue-100">Image Principale</div>
		<div class="col-span-12 md:col-span-4 bg-slate-400">Other Images</div>
	</div>
</div>
