<script lang="ts">
	import { page } from '$app/stores';
	import type { userData } from '$lib/types';

	export let userData: userData | null = null;
	export let vehicleId: string | null = null;

	const fields = [
		{ name: 'prenom', label: 'PRENOM:', type: 'text' },
		{ name: 'nom', label: 'NOM:', type: 'text' },
		{ name: 'email', label: 'EMAIL:', type: 'email' },
		{ name: 'telephone', label: 'TEL:', type: 'tel' }
	];
</script>

<div
	class="container flex flex-col gap-2 justify-center items-center sm:flex-row sm:justify-between mt-16 lg:mt-24 mb-10 sm:px-16"
>
	{#if vehicleId}
		<h2 class="text-small-caps text-accent text-lg lg:text-2xl">
			Voulez-vous nous contacter par rapport a cet vehicule?
		</h2>
	{:else}
		<h2 class="text-small-caps text-accent text-lg lg:text-3xl">Voulez-vous nous contacter?</h2>
	{/if}
	<h4 class="text-center lg:text-2xl">Téléphone: 07 08 09 10 20</h4>
</div>
<div
	class="contact-background m-8 p-4 sm:m-10 md:mt-20 md:p-20 xl:w-[1000px] xl:mx-auto text-secondary text-sm md:text-lg"
>
	<form method="POST" action="/formSubmit?/contact">
		<input type="hidden" id="url" name="url" value={$page.url.pathname} />

		<input type="hidden" name="vehicleId" value={vehicleId} id="vehicleId" />

		<div class="flex flex-col gap-4 mx-auto justify-center w-full lg:w-[600px]">
			{#each fields as field}
				{@const fieldName = field.name}
				<div class="flex flex-col lg:flex-row lg:items-center">
					<label for={field.name} class="pe-4 w-full lg:w-40 lg:text-right">{field.label}</label>
					<input
						type={field.type}
						name={field.name}
						class="input input-bordered input-sm md:input-md input-primary input-md grow w-full"
						value={userData ? userData[fieldName] : ''}
					/>
				</div>
			{/each}
			<div class="flex flex-col gap-2 justify-start mt-4">
				<label for="message" class="pe-2 w-32">MESSAGE:</label>
				<textarea
					name="message"
					class="textarea textarea-primary grow w-full h-40"
					maxlength="255"
					value={userData ? userData.message : ''}
				/>
			</div>
			<button class="btn btn-accent mt-5 w-full lg:w-40 self-end">ENVOYER</button>
		</div>
	</form>
</div>

<style lang="postcss">
	input,
	textarea {
		background-color: #d9d9d9;
	}

	.contact-background {
		background: #6a655c10;
		border-radius: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
</style>
