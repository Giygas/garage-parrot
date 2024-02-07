<script lang="ts">
	import '../../app.postcss';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Garage Parrot Creation d'Administrateur</title>
</svelte:head>

<div class=" h-screen w-screen p-36 grid grid-cols-1 gap-0">
	<div class="contact-background m-auto p-20">
		<h2 class="mx-auto font-semibold text-4xl text-center font-montserrat text-accent">
			Creer l'identifiant pour l'administrateur
		</h2>
		{#if form?.error}
			<span class="text-accent text-lg block text-center"> {form.message} </span>
		{/if}
		<form method="POST" use:enhance>
			<div class="grid grid-cols-8 items-center gap-8 pt-10">
				<div class="col-span-2 text-end">
					<label for="name" class="text-2xl uppercase">Nom et prénom:</label>
				</div>
				<div class="col-span-6">
					<input
						type="text"
						class="input input-bordered w-full"
						name="name"
						value={form?.name ?? ''}
						required
					/>
				</div>
				<div class="col-span-2 text-end">
					<label for="email" class="text-2xl uppercase">Email:</label>
				</div>
				<div class="col-span-6">
					<input
						type="email"
						class="input input-bordered w-full"
						name="email"
						value={form?.email ?? ''}
						required
					/>
				</div>
				<div class="col-span-2 text-end">
					<label for="password" class="text-2xl uppercase">Mot de passe:</label>
				</div>
				<div class="col-span-6">
					<input type="password" class="input input-bordered w-full" name="password" required />
				</div>
				<div class=" col-span-8 justify-self-end content-center">
					<button class="btn btn-accent w-full lg:w-40">Creer Compte</button>
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	input {
		background-color: #d9d9d9;
	}

	.contact-background {
		background: #6a655c10;
		border-radius: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
</style>
