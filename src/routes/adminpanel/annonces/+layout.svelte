<script lang="ts">
	const annoncesOptions = [
		{ href: '/adminpanel/annonces/new-annonce', name: 'Nouvel annonce' },
		{ href: '/adminpanel/annonces', name: 'Lister les annonces' }
	];
</script>

<div class="flex w-full justify-between px-5 items-center">
	<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">Annonces</h1>
	<div class="flex gap-6">
		{#each annoncesOptions as annonce}
			<a class="btn btn-primary" href={annonce.href}>{annonce.name}</a>
		{/each}
	</div>
</div>
<slot />
