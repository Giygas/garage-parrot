<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;
	let { session, supabase } = data;

	$: {
		session, supabase;
	}

	$: if (form?.success) {
		toast.success(form.message);
		// Reset form by clearing the form data
		const formElement = document.getElementById('password-form') as HTMLFormElement;
		if (formElement) {
			formElement.reset();
		}
	}

	$: if (form?.error) {
		toast.error(form.message);
	}

	let currentPassword: string = '';
	let newPassword: string = '';
	let confirmPassword: string = '';
</script>

<div class="w-full">
	<div class="contact-background m-auto p-10">
		<h2 class="font-semibold text-3xl text-center font-montserrat text-accent mb-8">
			Paramètres utilisateur
		</h2>

		<div class="mb-8">
			<h3 class="text-xl font-semibold text-accent mb-4">Informations du compte</h3>
			<div class="grid grid-cols-1 gap-4">
				<div class="flex justify-between items-center p-3 bg-base-200 rounded">
					<span class="font-medium">Nom:</span>
					<span>{session?.user.user_metadata.name || 'Non défini'}</span>
				</div>
				<div class="flex justify-between items-center p-3 bg-base-200 rounded">
					<span class="font-medium">Email:</span>
					<span>{session?.user.email}</span>
				</div>
			</div>
		</div>

		<div class="border-t pt-8">
			<h3 class="text-xl font-semibold text-accent mb-6">Changer le mot de passe</h3>
			<form id="password-form" method="POST" use:enhance>
				<div class="grid grid-cols-1 gap-6">
					<div>
						<label for="currentPassword" class="block text-lg font-medium mb-2">
							Mot de passe actuel:
						</label>
						<input
							type="password"
							class="input input-bordered w-full"
							name="currentPassword"
							id="currentPassword"
							autocomplete="current-password"
							required
							bind:value={currentPassword}
						/>
					</div>

					<div>
						<label for="newPassword" class="block text-lg font-medium mb-2">
							Nouveau mot de passe:
						</label>
						<input
							type="password"
							class="input input-bordered w-full"
							name="newPassword"
							id="newPassword"
							autocomplete="new-password"
							required
							minlength="6"
							bind:value={newPassword}
						/>
						<p class="text-sm text-gray-600 mt-1">Minimum 6 caractères</p>
					</div>

					<div>
						<label for="confirmPassword" class="block text-lg font-medium mb-2">
							Confirmer le nouveau mot de passe:
						</label>
						<input
							type="password"
							class="input input-bordered w-full"
							name="confirmPassword"
							id="confirmPassword"
							autocomplete="new-password"
							required
							minlength="6"
							bind:value={confirmPassword}
						/>
					</div>

					<div class="flex justify-end">
						<button type="submit" class="btn btn-accent w-full lg:w-48">
							Mettre à jour le mot de passe
						</button>
					</div>
				</div>
			</form>
		</div>
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
