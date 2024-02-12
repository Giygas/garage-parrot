<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Service } from '$lib/types';
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
		toast.success(form.message, { duration: 4000 });
	}
	$: if (form?.error) {
		toast.error(form.message, { duration: 4000 });
	}

	$: newService = false;
</script>

<section>
	<div class="flex justify-between">
		<h1 class="montserrat text-accent text-small-caps text-4xl font-semibold">
			Modifier les services
		</h1>
		<a
			class="btn btn-accent w-fit"
			on:click|preventDefault={() => {
				newService = !newService;
			}}
			href="/adminpanel/services/new">Ajouter un nouveau service</a
		>
	</div>
	<div class="flex flex-col w-full">
		<!-- Placeholder for new service -->
		{#if newService}
			<form method="POST" action="?/newService" use:enhance>
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
