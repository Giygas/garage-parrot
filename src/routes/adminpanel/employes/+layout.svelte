<script lang="ts">
	const employesOptions = [
		{ href: '/adminpanel/employes/create-user', name: 'Créer un utilisateur' },
		{ href: '/adminpanel/employes', name: 'Lister les employés' }
	];
</script>

<div class="flex w-full justify-between px-5 items-center">
	<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">
		Gestión des Employés
	</h1>
	<div class="flex gap-6">
		{#each employesOptions as employe}
			<a class="btn btn-primary" href={employe.href}>{employe.name}</a>
		{/each}
	</div>
</div>
<slot />
