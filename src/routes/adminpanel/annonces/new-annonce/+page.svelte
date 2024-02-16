<script lang="ts">
	import SuperDebug, { intProxy, numberProxy, stringProxy, superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { vehicleSchema } from '$lib/schemas';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	const { form, errors, enhance, allErrors } = superForm(data.form, {
		customValidity: true,
		validators: zodClient(vehicleSchema)
	});

	const kilometrage = intProxy(form, 'kilometrage', {
		empty: 'zero',
		initiallyEmptyIfZero: true
	});
	const price = numberProxy(form, 'price', { empty: 'zero', initiallyEmptyIfZero: true });

	const year = intProxy(form, 'year', { empty: 'zero', initiallyEmptyIfZero: true });
	const transmission = intProxy(form, 'transmission', { empty: 'null' });
	const power = intProxy(form, 'power', { empty: 'zero', initiallyEmptyIfZero: true });
	const engine = stringProxy(form, 'engine', { empty: 'null' });
	const traction = stringProxy(form, 'traction', { empty: 'null' });

	let showImagePrincipal = false;
	let previewPrincipal: any | undefined;
	let previewOthers = new Array();
	$: previewOthers;

	$: if ($form.imagePrincipal) {
		showImagePrincipal = true;
		const reader = new FileReader();
		reader.onload = function () {
			previewPrincipal.setAttribute('src', reader.result);
		};
		reader.readAsDataURL($form.imagePrincipal);
	}

	function readFileAsDataURL(file: any) {
		return new Promise(function (resolve, reject) {
			let fr = new FileReader();

			fr.onload = function () {
				resolve(fr.result);
			};

			fr.onerror = function () {
				reject(fr);
			};

			fr.readAsDataURL(file);
		});
	}

	let files: (File | null)[];
	$: files;
	function readMultipleImages(e: Event) {
		//@ts-expect-error
		files = Array.from(e.currentTarget.files) ?? [];
		let readers = [];

		$form.otherImages = files;
		if (!files?.length) return;

		//Promises in an array
		for (let i = 0; i < files.length; i++) {
			readers.push(readFileAsDataURL(files[i]));
		}

		//Trigger all the promises
		Promise.all(readers).then((values) => {
			previewOthers = values;
		});
	}
</script>

<SuperDebug label="Form Data" data={{ $form, $errors }} />

<div class="flex flex-col gap-10 items-center w-full mt-10">
	<h2 class="font-montserrat uppercase text-3xl text-accent self-start">Creer un Annonce</h2>
	<p class="text-xl">
		Ici vous pouvez créer un nouvel annonce. Les elements surlignées sont obligatoires, le reste
		sont optionnels
	</p>
	<!-- TODO: delete this -->
	<!-- {#if $allErrors.length}
		<ul>
			{#each $allErrors as error}
				<li class="text-accent">
					{error.messages.join('. ')}
				</li>
			{/each}
		</ul>
	{/if} -->

	<form method="POST" enctype="multipart/form-data" class="w-full text-xl" use:enhance>
		<div class="grid grid-cols-12 w-full gap-8 items-center">
			<div class="col-span-2 justify-self-end">
				<label for="title" class="underline">TITRE:</label>
			</div>
			<div class="col-span-10">
				<input
					type="text"
					name="title"
					class="input h-12 input-primary w-full text-lg"
					bind:value={$form.title}
					aria-invalid={$errors.title ? 'true' : undefined}
				/>
			</div>
			<!-- TODO: delete this -->
			<!-- {#if $errors.title}
				<div class="col-span-12 justify-self-center p-0 m-0">
					<span class="text-accent -mt-16 -top-1.5">
						{$errors.title}
					</span>
				</div>
			{/if} -->
			<!-- Second line -->
			<div class="col-span-2 justify-self-end">
				<label for="kilometrage" class="underline">KILOMETRAGE:</label>
			</div>
			<div class="col-span-4">
				<input
					type="text"
					name="kilometrage"
					class="input h-12 input-primary w-full text-lg placeholder:text-right"
					placeholder="Km."
					bind:value={$kilometrage}
					aria-invalid={$errors.kilometrage ? 'true' : undefined}
				/>
			</div>
			<div class="col-span-2 justify-self-end">
				<label for="year" class="underline">ANNÉE:</label>
			</div>
			<div class="col-span-4">
				<input
					type="text"
					name="year"
					class="input h-12 input-primary w-full text-lg"
					bind:value={$year}
					aria-invalid={$errors.year ? 'true' : undefined}
				/>
			</div>
			<!-- End second line -->
			<!-- Third line -->
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="engine">MOTEUR:</label>
			</div>
			<div class="col-span-4">
				<select
					name="engine"
					id="engine"
					class="select w-full select-primary text-lg"
					bind:value={$engine}
					aria-invalid={$errors.engine ? 'true' : undefined}
				>
					<option selected value="">Choisissez le type de moteur</option>
					<option value="Essence">Essence</option>
					<option value="Diesel">Diesel</option>
				</select>
			</div>
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="power">PUISSANCE:</label>
			</div>
			<div class="col-span-4">
				<input
					type="text"
					name="power"
					class="input h-12 input-primary w-full text-lg placeholder:text-right"
					placeholder="Ch."
					bind:value={$power}
					aria-invalid={$errors.power ? 'true' : undefined}
				/>
			</div>
			<!-- End third line -->
			<!-- Fourth line -->
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="transmission">BOITE:</label>
			</div>
			<div class="col-span-4">
				<select
					name="transmission"
					id="transmission"
					class="select w-full select-primary text-lg"
					bind:value={$transmission}
					aria-invalid={$errors.transmission ? 'true' : undefined}
				>
					<option selected value="">Choisissez le type de boite</option>
					<option value="1">Boîte de vitesses manuelle</option>
					<option value="2">Boîte de vitesses automatique</option>
					<option value="3">Boîte de vitesses séquentielle</option>
				</select>
			</div>
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="traction">TRACTION:</label>
			</div>
			<div class="col-span-4">
				<select
					name="traction"
					id="traction"
					class="select w-full select-primary text-lg"
					bind:value={$traction}
					aria-invalid={$errors.traction ? 'true' : undefined}
				>
					<option selected value="">Choisissez le type de traction</option>
					<option value="Avant">Avant</option>
					<option value="Arrière">Arrière</option>
				</select>
			</div>
			<!-- End fourth line -->
			<!-- Fifth line -->
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="doors">PORTES:</label>
			</div>
			<div class="col-span-4">
				<input
					type="text"
					name="doors"
					class="input h-12 input-primary w-full text-lg"
					bind:value={$form.doors}
					aria-invalid={$errors.doors ? 'true' : undefined}
				/>
			</div>
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="seats">SIEGES:</label>
			</div>
			<div class="col-span-4">
				<input
					type="text"
					name="seats"
					class="input h-12 input-primary w-full text-lg"
					bind:value={$form.seats}
					aria-invalid={$errors.seats ? 'true' : undefined}
				/>
			</div>
			<!-- End fifth line -->
			<div class="col-span-5 mt-12 justify-self-end">
				<label for="price" class="underline">PRIX:</label>
			</div>
			<div class="col-span-3 mt-12">
				<input
					type="text"
					class="input h-12 input-primary w-full text-center text-xl"
					name="price"
					bind:value={$price}
					aria-invalid={$errors.price ? 'true' : undefined}
				/>
			</div>
			<div class="col-span-12 mt-8">
				<p class="text-primary/70">
					Vous pouvez ajouter plusieurs options séparées par des points-virgules
				</p>
			</div>
			<div class="col-span-2 justify-self-end text-primary/70">
				<label for="options">OPTIONS:</label>
			</div>
			<div class="col-span-10">
				<input
					type="text"
					name="options"
					class="input h-12 input-primary w-full text-lg"
					bind:value={$form.options}
					aria-invalid={$errors.options ? 'true' : undefined}
				/>
			</div>

			<!-- Image -->
			<div class="col-span-4 my-12 justify-self-end">
				<label for="imagePrincipal" class="underline">IMAGE PRINCIPALE:</label>
			</div>
			<div class="col-span-7 my-12">
				<input
					type="file"
					class="file-input w-full file-input-secondary"
					name="imagePrincipal"
					accept="image/jpeg, image/jpg, image/png, image/webp"
					on:input={(e) => {
						$form.imagePrincipal = e.currentTarget.files?.item(0) ?? null;
					}}
					aria-invalid={$errors.imagePrincipal ? 'true' : undefined}
				/>
			</div>
			{#if showImagePrincipal}
				<div class="col-span-12 bg-slate-200 justify-self-center max-w-[800px] mb-12">
					<img bind:this={previewPrincipal} src="" alt="Preview" class="rounded-lg" />
				</div>
			{/if}
			<!-- TODO: remove this -->
			<!-- {#if $errors.imagePrincipal}
				<div class="col-span-12 justify-self-center">
					<span class="text-xl text-accent">
						{$errors.imagePrincipal}
					</span>
				</div>
			{/if} -->
			<!-- Other Images       -->
			<!-- {#key $form.otherImages} -->
			<div class="col-span-12 justify-self-start">
				<label for="otherImages" class="text-primary/70">AUTRES IMAGES:</label>
			</div>
			<div class="col-span-12 justify-self-center w-3/4 rounded-lg">
				<input
					type="file"
					class="file-input w-full file-input-secondary"
					name="otherImages"
					id="otherImages"
					multiple
					accept="image/jpeg, image/jpg, image/png, image/webp"
					on:input={(e) => {
						// $form.otherImages = Array.from(e.currentTarget.files ?? []);
						readMultipleImages(e);
					}}
					aria-invalid={$errors.otherImages ? 'true' : undefined}
				/>
			</div>

			{#if $errors.otherImages}
				<div class="col-span-12 justify-self-center">
					<span class="text-xl text-accent">
						{$errors.otherImages._errors}
					</span>
				</div>
			{/if}
			{#if previewOthers}
				<div class="col-span-12">
					<div class="grid grid-autofill auto-cols-auto gap-4">
						{#each previewOthers as img, i}
							<div class="relative w-fit h-fit">
								<img src={img} alt="Others preview" class="w-60 rounded-lg" />
								<button
									class="absolute -top-4 -right-4"
									on:click={(e) => {
										files = files.filter((e) => e != img);
										$form.otherImages = $form.otherImages.splice(i, 1);
									}}
									><Icon
										icon="typcn:delete"
										style="color: white; height: 38px; width: 38px;"
									/></button
								>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			<!-- {/key} -->
			<!-- Buttons -->
			<div class="col-span-12 flex justify-between gap-5 my-16">
				<button class="btn btn-secondary w-60" type="reset">Réinitialiser</button>
				<button class="btn btn-accent w-60" type="submit">Enregistrer</button>
			</div>
		</div>
	</form>
</div>

<style>
	.grid-autofill {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>
