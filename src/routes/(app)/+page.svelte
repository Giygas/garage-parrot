<script lang="ts">
	import type { PageData } from './$types';
	import { Reviews } from '$components';
	import { onDestroy, onMount } from 'svelte';

	export let data: PageData;

	const reviews: any = data.revs;
	import vehicle_small from '$lib/assets/vehicle.webp';
	import reparation_small from '$lib/assets/reparation.webp';
	import { afterNavigate, replaceState } from '$app/navigation';
	import { page } from '$app/stores';

	// Manage windows size for dynamic class generation
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
		replaceState('', $page.url.href.split('#')[0]);
	});

	$: isSmallScreen = windowWidth < imageBreakpoint;
</script>

<svelte:head>
	<title>Accueil - Garage Parrot</title>
</svelte:head>
<div class="md:hidden h-[120px]" />
<section class="md:h-full">
	<div class="flex flex-wrap justify-end md:mt-72 xl:mt-32 xl:mb-12">
		<div
			class="text-base text-justify md:text-xl md:bg-primary/10 rounded-xl md:p-10 m-8 xl:max-w-[40vw]"
		>
			Chez Garage V. Parrot, nous sommes fiers de vous offrir une large gamme de services pour
			prendre soin de votre voiture. Avec une expérience de deux ans dans le domaine, nous sommes
			spécialisés dans la réparation de la carrosserie et de la mécanique des voitures, ainsi que
			dans leur entretien régulier pour garantir leur performance et leur sécurité.
		</div>
	</div>

	<h2 class="text-small-caps text-accent p-2 px-10 md:text-2xl">Temoignages</h2>
	<Reviews {reviews} />
</section>

<section class="container">
	<div class="flex flex-wrap bg-primary/20 sm:rounded-lg p-8 mt-10 md:mt-24 2xl:mt-40 lg:mx-20">
		<div class="text-secondary md:text-lg lg:text-2xl">
			La confiance est notre priorité. Nous considérons notre atelier comme un lieu de confiance
			pour nos clients, où ils peuvent être assurés que leurs voitures seront entre de bonnes mains.
			Nous nous engageons à fournir un service honnête, transparent et personnalisé. Votre
			satisfaction est notre objectif ultime.
		</div>
	</div>

	<div
		class="grid md:grid-cols-3 xl:grid-cols-4 items-center p-0 mt-10 md:mt-20 2xl:mt-40 lg:mx-20 sm:rounded-lg md:bg-primary/20 rounded-md"
	>
		<div
			class="col-span-3 md:col-span-2 xl:col-span-3 text-secondary md:text-lg p-8 md:pe-0 lg:text-2xl {isSmallScreen
				? 'text-content reparation'
				: ''} text-right"
		>
			Notre équipe de professionnels qualifiés est dévouée à fournir un travail de haute qualité, en
			utilisant les dernières technologies et équipements pour diagnostiquer et résoudre
			efficacement les problèmes de votre véhicule. Que ce soit pour des réparations mineures ou
			majeures, nous mettons tout en œuvre pour vous offrir des résultats exceptionnels.
		</div>
		{#if !isSmallScreen}
			<div class=" relative h-full w-full">
				<img
					src={reparation_small}
					class="absolute h-3/4 2xl:h-[120%] object-cover -right-10 lg:-right-20 top-0 2xl:-top-20 bottom-0 left-0 m-auto rounded-2xl"
					alt="A group of mechanics working in the vehicle"
					loading="lazy"
				/>
			</div>
		{/if}
	</div>

	<div
		class="grid md:grid-cols-3 xl:grid-cols-4 items-center p-0 mt-10 md:mt-20 2xl:mt-40 lg:mx-20 sm:rounded-lg md:bg-primary/20 rounded-md"
	>
		{#if !isSmallScreen}
			<div class=" relative h-full w-full">
				<img
					src={vehicle_small}
					class="absolute h-3/4 2xl:h-[120%] object-cover -left-10 lg:-left-20 top-0 2xl:-top-20 bottom-0 right-0 m-auto rounded-2xl"
					alt="A vehicle door"
					loading="lazy"
				/>
			</div>
		{/if}
		<div
			class="col-span-3 md:col-span-2 xl:col-span-3 text-secondary md:text-lg p-8 md:ps-0 lg:text-2xl {isSmallScreen
				? 'text-content vehicule'
				: ''}"
		>
			En plus de nos services de réparation, nous proposons également une sélection de véhicules
			d'occasion soigneusement inspectés et entretenus. Nous comprenons l'importance d'avoir un
			moyen de transport fiable, c'est pourquoi nous offrons des véhicules de qualité à des prix
			compétitifs. Vous pouvez compter sur nous pour vous aider à trouver la voiture d'occasion qui
			correspond à vos besoins et à votre budget.
		</div>
	</div>
</section>

<style lang="postcss">
	.text-content {
		position: relative;
		--background-image: none;

		&.reparation {
			--background-image: url('$lib/assets/reparation_small.webp');
		}

		&.vehicule {
			--background-image: url('$lib/assets/vehicle_small.webp');
		}
	}

	.text-content::after {
		content: '';
		position: absolute;
		background-size: cover;
		background-position: center;
		inset: 0;
		background-image: var(--background-image);
		mix-blend-mode: overlay;
		opacity: 0.6;
		z-index: -1;
	}

	@media screen and (min-width: 640px) {
		.text-content::after {
			border-radius: 0.75rem;
		}
	}
</style>
