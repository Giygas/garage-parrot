<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let reviews = data.revi;

	import { Reviews } from '$components';
</script>

<svelte:head>
	<title>Accueil - Garage Parrot</title>
</svelte:head>
<div class="md:hidden h-[120px]" />
<section>
	<div class="flex flex-wrap justify-end md:mt-72 xl:my-32">
		<div
			class="text-base text-justify md:text-xl md:bg-primary/10 rounded-xl md:p-10 m-8 xl:max-w-[40vw]"
		>
			Chez Garage V. Parrot, nous sommes fiers de vous offrir une large gamme de services pour
			prendre soin de votre voiture. Avec une expérience de deux ans dans le domaine, nous sommes
			spécialisés dans la réparation de la carrosserie et de la mécanique des voitures, ainsi que
			dans leur entretien régulier pour garantir leur performance et leur sécurité.
		</div>
	</div>

	<h2 class="text-small-caps text-accent text-center p-2">Temoignages</h2>
	<Reviews {reviews} />
</section>

<section>
	<div class="flex flex-wrap bg-primary/10 md:rounded-lg p-8 mt-10 md:mt-36 lg:mx-20">
		<div class="text-primary md:text-lg lg:text-2xl">
			La confiance est notre priorité. Nous considérons notre atelier comme un lieu de confiance
			pour nos clients, où ils peuvent être assurés que leurs voitures seront entre de bonnes mains.
			Nous nous engageons à fournir un service honnête, transparent et personnalisé. Votre
			satisfaction est notre objectif ultime.
		</div>
	</div>

	<div class="flex flex-wrap md:rounded-lg p-0 pt-5 md:mt-36 lg:mx-20">
		<div class="text-black md:text-lg p-8 lg:text-2xl text-content reparation text-right">
			Notre équipe de professionnels qualifiés est dévouée à fournir un travail de haute qualité, en
			utilisant les dernières technologies et équipements pour diagnostiquer et résoudre
			efficacement les problèmes de votre véhicule. Que ce soit pour des réparations mineures ou
			majeures, nous mettons tout en œuvre pour vous offrir des résultats exceptionnels.
		</div>
	</div>

	<div class="flex flex-wrap md:rounded-lg p-0 pt-5 md:mt-36 lg:mx-20">
		<div class="text-black md:text-lg p-8 lg:text-2xl text-content vehicule">
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
			--background-image: url('reparation_small.png');
		}

		&.vehicule {
			--background-image: url('vehicle_small.png');
		}
	}

	.text-content::after {
		content: '';
		position: absolute;
		background-size: cover;
		inset: 0;
		background-image: var(--background-image);
		mix-blend-mode: overlay;
		z-index: -1;
	}
</style>
