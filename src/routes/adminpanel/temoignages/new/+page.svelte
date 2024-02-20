<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	const links = [
		{ href: '/adminpanel/temoignages/new', name: 'Créer un témoignage' },
		{ href: '/adminpanel/temoignages', name: 'Lister les témoignages' }
	];

	export let form;

	$: if (form?.success) {
		toast.success(form.message);
	}

	$: if (form?.error) {
		toast.error(form.message);
	}
</script>

<div class="flex w-full justify-between px-5 items-center pb-10">
	<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">
		Gestión des Témoignages
	</h1>
	<div class="flex gap-6">
		{#each links as l}
			<a class="btn btn-primary" href={l.href}>{l.name}</a>
		{/each}
	</div>
</div>

<div class="flex w-full justify-center">
	<div class="w-[600px] place-items-center">
		<form method="POST" action="?/sendRating" use:enhance>
			<div class="flex flex-col gap-6 p-4">
				<h3 class="font-bold text-lg">Creer un temoignage</h3>
				<div class="flex flex-col gap-2">
					<label for="name">Votre prénom</label>
					<input name="name" type="text" class="input input-bordered bg-neutral/50" />
				</div>
				<div class="flex flex-row gap-2 items-middle justify-between">
					<label for="note" class="self-center">Votre note:</label>
					<div class="rating rating-lg self-center" id="rating">
						<input type="radio" name="rating" id="r1" value="1" class="mask mask-star bg-accent" />
						<input type="radio" name="rating" id="r2" value="2" class="mask mask-star bg-accent" />
						<input type="radio" name="rating" id="r3" value="3" class="mask mask-star bg-accent" />
						<input type="radio" name="rating" id="r4" value="4" class="mask mask-star bg-accent" />
						<input
							type="radio"
							name="rating"
							id="r5"
							value="5"
							class="mask mask-star bg-accent"
							checked
						/>
					</div>
				</div>
				<label for="message">Votre avis:</label>
				<textarea
					name="message"
					id="message"
					cols="20"
					rows="6"
					class="textarea textarea-bordered bg-neutral/50"
				/>
				<div class="modal-action flex flex-row gap-5">
					<button class="btn btn-accent grow self-end" type="submit">ENVOYER</button>
				</div>
			</div>
		</form>
	</div>
</div>
