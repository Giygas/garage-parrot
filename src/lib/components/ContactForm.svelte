<script lang="ts">
	import { page } from '$app/stores';

	async function sendData(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		await fetch('/formSubmit', {
			method: 'POST',
			body: data
		});
	}

	const fields = [
		{ name: 'prenom', label: 'PRENOM:', type: 'text' },
		{ name: 'nom', label: 'NOM:', type: 'text' },
		{ name: 'email', label: 'EMAIL:', type: 'email' },
		{ name: 'telephone', label: 'TEL:', type: 'tel' }
	];
</script>

<div
	class="container flex flex-col items-center gap-2 justify-center sm:flex-row sm:justify-between mt-16 mb-10"
>
	<h2 class="text-small-caps text-accent text-lg">Voulez-vous nous contacter?</h2>
	<h4 class="text-center">07 08 09 10 20</h4>
</div>
<div
	class="contact-background m-8 p-4 sm:m-10 md:m-20 md:p-20 xl:w-[1000px] xl:mx-auto text-secondary text-sm md:text-lg"
>
	<form method="POST" action="/formSubmit?url={$page.url.pathname}">
		<div class="flex flex-col gap-4 mx-auto justify-center w-full lg:w-[600px]">
			{#each fields as field}
				<div class="flex flex-col lg:flex-row lg:items-center">
					<label for={field.name} class="pe-4 w-full lg:w-40 lg:text-right">{field.label}</label>
					<input
						type={field.type}
						name={field.name}
						class="input input-bordered input-sm md:input-md input-primary input-md grow w-full"
					/>
				</div>
			{/each}
			<div class="flex flex-col gap-2 justify-start mt-4">
				<label for="message" class="pe-2 w-32">MESSAGE:</label>
				<textarea
					name="message"
					class="textarea textarea-primary grow w-full h-40"
					maxlength="255"
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
