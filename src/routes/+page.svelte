<script lang="ts">
	import type { PageData } from './$types';
	import type { ReviewType } from '$lib/types';
	export let data: PageData;

	let reviews = data.revi satisfies ReviewType;

	import { Reviews } from '$components';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Accueil - Garage Parrot</title>
</svelte:head>

<div class="md:hidden h-[120px]" />

<div class="flex flex-wrap justify-end md:mt-72 xl:my-32">
	<div class="text-xl md:bg-primary/10 rounded-xl p-2 md:p-10 m-8 xl:max-w-[40vw]">
		Chez Garage V. Parrot, nous sommes fiers de vous offrir une large gamme de services pour prendre
		soin de votre voiture. Avec une expérience de deux ans dans le domaine, nous sommes spécialisés
		dans la réparation de la carrosserie et de la mécanique des voitures, ainsi que dans leur
		entretien régulier pour garantir leur performance et leur sécurité.
	</div>
</div>

<Reviews {reviews} />
