<script lang="ts">
	import { enhance } from '$app/forms';
	import '../../app.postcss';

	import { page } from '$app/stores';
	import { Toasts, toast } from 'svoast';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';

	let userCreated: boolean;

	userCreated = $page.url.searchParams.get('success') === 'true';
	$: if (userCreated) {
		toast.success('Utilisateur crée avec succès');
	}

	export let form: ActionData;

	$: if (form?.wrongId || form?.incomplete) {
		toast.error(form.message, { duration: 3000 });
	}

	if (form?.success) {
		goto('/adminpanel');
	}
</script>

<svelte:head>
	<title>Garage Parrot Admin Login</title>
	<link rel="stylesheet" href="/fonts.css" />
</svelte:head>

<Toasts position="top-right" />

<div class=" h-screen w-screen p-36 grid grid-cols-1 gap-0">
	<div class="contact-background m-auto p-20">
		<h2 class="mx-auto font-semibold text-4xl text-center font-montserrat text-accent">
			Connexion
		</h2>
		<form method="POST" use:enhance>
			<div class="grid grid-cols-8 items-center gap-8 pt-10">
				<div class="col-span-2 text-end">
					<label for="email" class="text-2xl uppercase">Email:</label>
				</div>
				<div class="col-span-6">
					<input
						type="email"
						class="input input-bordered w-full"
						name="email"
						required
						value={form?.email ?? ''}
					/>
				</div>
				<div class="col-span-2 text-end">
					<label for="password" class="text-2xl uppercase">Mot de passe:</label>
				</div>
				<div class="col-span-6">
					<input type="password" class="input input-bordered w-full" name="password" required />
				</div>
				<div class=" col-span-8 justify-self-end content-center">
					<button class="btn btn-accent w-full lg:w-40" type="submit">Se connecter</button>
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
