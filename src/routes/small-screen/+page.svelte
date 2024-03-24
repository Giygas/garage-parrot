<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	const minAdminWidth = 1069;
	let innerWidth: number = 1068;

	$: if (innerWidth > minAdminWidth) {
		if (browser) {
			goto('/adminpanel', { replaceState: true });
		}
	}
</script>

<svelte:window bind:innerWidth />

<div class="h-screen w-screen flex justify-center align-middle items-center content-center">
	<h1 class="font-montserrat font-medium text-4xl text-center">
		Veuillez utiliser un écran plus grand pour utiliser le panneau d'administration
	</h1>
</div>
