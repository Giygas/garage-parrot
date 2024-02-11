<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Service } from '$lib/types';
	import DOMPurify from 'dompurify';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	export let form: ActionData;

	let services: Service[];

	$: {
		form;
	}
	$: if (form?.services) {
		services = form.services as Service[];
	} else {
		services = data.services as Service[];
	}

	$: if (form?.success) {
		toast.success(form.message);
	}
	$: if (form?.error) {
		toast.error(form.message);
	}

	let modal: HTMLDialogElement;

	function openModal() {
		modal.showModal();
	}

	function closeModal() {
		modal.close();
	}

	$: newService = false;

	let title: string;
	let description: string;

	function handleInput(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			const inputElement = event.target;
			if (inputElement.name === 'name') {
				title = DOMPurify.sanitize(inputElement.value);
			} else if (inputElement.name === 'message') {
				description = DOMPurify.sanitize(inputElement.value);
			}
		}
	}
</script>

<section>
	<div class="flex justify-between">
		<h1 class="montserrat text-accent text-small-caps text-4xl font-semibold">
			Modifier les services
		</h1>
		<button
			class="btn btn-accent w-fit"
			on:click={() => {
				newService = !newService;
			}}>Ajouter un nouveau service</button
		>
	</div>
	<div class="flex flex-col w-full">
		{#if newService}
			<form method="POST" action="?/newService">
				<div class="flex flex-col min-w-full h-fit gap-6 pt-12">
					<div class="grid grid-cols-5 gap-5 items-center">
						<div class="col-span-1 text-end">
							<label for="title" class="uppercase items-end justify-end text-lg">Titre:</label>
						</div>
						<div class="col-span-4">
							<input
								type="text"
								name="title"
								class="input input-primary w-full text-lg bg-primary/5"
							/>
						</div>
					</div>

					<div class="grid grid-cols-5 gap-5">
						<div class="col-span-1 text-end">
							<label for="description" class="uppercase text-lg">Paragraphe:</label>
						</div>
						<div class="col-span-4">
							<textarea
								name="description"
								class="textarea textarea-primary grow bg-primary/5 w-full h-44 text-lg"
							/>
						</div>
					</div>
				</div>

				<div class="flex gap-2 justify-end mt-2">
					<button class="btn btn-accent w-fit"> Sauvegarder</button>
				</div>
			</form>
		{/if}
		{#key services}
			{#each services as service (service.id)}
				<form method="POST" action="?/updateService" use:enhance>
					<input type="hidden" value={service.id} name="serviceId" />
					<div class="flex flex-col min-w-full h-fit gap-6 pt-12">
						<div class="grid grid-cols-5 gap-5 items-center">
							<div class="col-span-1 text-end">
								<label for="title" class="uppercase items-end justify-end text-lg">Titre:</label>
							</div>
							<div class="col-span-4">
								<input
									type="text"
									name="title"
									class="input input-primary w-full text-lg bg-primary/5"
									value={service.title}
								/>
							</div>
						</div>

						<div class="grid grid-cols-5 gap-5">
							<div class="col-span-1 text-end">
								<label for="description" class="uppercase text-lg">Paragraphe:</label>
							</div>
							<div class="col-span-4">
								<textarea
									name="description"
									class="textarea textarea-primary grow bg-primary/5 w-full h-44 text-lg"
									value={service.description}
								/>
							</div>
						</div>
					</div>

					<div class="flex gap-2 justify-end mt-2">
						<button class="btn btn-accent w-fit"> Sauvegarder</button>
						<button class="btn btn-primary w-fit" formaction="?/deleteService">Effacer</button>
					</div>
				</form>
			{/each}
		{/key}
	</div>
</section>
<!-- TODO: add a new service -->
<dialog bind:this={modal} id="newService" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="POST" action="?/newService">
			<div class="flex flex-col gap-6 p-4">
				<h3 class="font-bold text-lg">Ajouter un nouveau service</h3>
				<div class="flex flex-col gap-2">
					<label for="title">Titre:</label>
					<input
						name="title"
						type="text"
						class="input input-bordered bg-neutral/50"
						on:input={handleInput}
						bind:value={title}
					/>
				</div>

				<label for="description">Paragraphe:</label>
				<textarea
					name="description"
					id="description"
					cols="20"
					rows="6"
					class="textarea textarea-bordered bg-neutral/50"
					bind:value={description}
					on:input={handleInput}
				/>
				<div class="modal-action flex flex-row gap-5">
					<button class="btn" on:click|preventDefault={closeModal}>FERMER</button>
					<button class="btn btn-accent grow self-end" type="submit" on:click={closeModal}
						>ENVOYER</button
					>
				</div>
			</div>
		</form>
	</div>
</dialog>
