<script lang="ts">
	import SuperDebug, { intProxy, stringProxy, superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { vehicleSchema } from '$lib/schemas';

	export let data: PageData;

	const { form, errors } = superForm(data.form, {
		validators: zodClient(vehicleSchema)
	});

	const kilometrage = intProxy(form, 'kilometrage', { empty: 'zero', initiallyEmptyIfZero: true });

	const year = intProxy(form, 'year', { empty: 'zero', initiallyEmptyIfZero: true });
	const transmission = intProxy(form, 'transmission', { empty: 'null' });
	const engine = stringProxy(form, 'engine', { empty: 'null' });
	const traction = stringProxy(form, 'traction', { empty: 'null' });

	console.log($errors);
</script>

<SuperDebug label="Form Data" data={form} />

<div class="flex flex-col gap-10 items-center w-full mt-10">
	<h2 class="font-montserrat uppercase text-3xl text-accent self-start">Creer un Annonce</h2>
	<p class="text-xl">
		Ici vous pouvez créer un nouvel annonce. Les elements surlignées sont obligatoires, le reste
		sont optionnels
	</p>

	<form method="POST" enctype="multipart/form-data" class="w-full text-xl">
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
				/>
			</div>
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
					bind:value={$form.power}
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
				/>
			</div>
			<!-- End fifth line -->
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
				/>
			</div>
			<!-- Other Images       -->
			<div class="col-span-12 justify-self-start">
				<label for="otherImages" class="text-primary/70">AUTRES IMAGES:</label>
			</div>
			<div class="col-span-12 justify-self-center h-28 w-3/4 border-accent border-2 rounded-lg">
				<input
					type="file"
					class="file-input w-full file-input-secondary"
					name="otherImages"
					multiple
					accept="image/jpeg, image/jpg, image/png, image/webp"
					on:input={(e) => {
						$form.otherImages = Array.from(e.currentTarget.files ?? []);
					}}
				/>
			</div>
			<!-- Buttons -->
			<div class="col-span-12 flex justify-between gap-5 my-16">
				<button class="btn btn-secondary w-60" type="reset">Réinitialiser</button>
				<button class="btn btn-accent w-60" type="submit">Enregistrer</button>
			</div>
		</div>
	</form>
</div>
