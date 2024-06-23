<script lang="ts">
	import '../app.postcss';
</script>

<svelte:head>
	<title>Page not Found</title>
</svelte:head>

<div
	class="h-screen w-screen flex flex-col gap-8 justify-center align-middle items-center content-center p-5"
>
	<h1 class="font-montserrat text-bold text-2xl md:text-4xl text-center text-accent">
		La page que vous cherchez n'existe pas
	</h1>
	<button class="btn btn-xs sm:btn-sm md:btn-md" on:click={() => history.back()}
		>Retour en Arrière</button
	>
</div>
