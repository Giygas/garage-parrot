<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.postcss';
	import { ContactForm, Footer, Navigation } from '$components';
	import type { Weekdays } from '$lib/types';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	$: console.log($page);
	let days: Weekdays = data.days;

	// Preload fonts
	import { onMount } from 'svelte';

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.href = 'fonts.css';
		link.as = 'style';
		link.onload = () => {
			link.onload = null;
			link.rel = 'stylesheet';
		};
		document.head.appendChild(link);
		name = '';
		message = '';
	});

	let modal: HTMLDialogElement;

	function openModal() {
		modal.showModal();
	}

	function closeModal() {
		modal.close();
	}

	// Sanitizing input
	import DOMPurify from 'dompurify';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let name: string;
	let message: string;

	function handleInput(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			const inputElement = event.target;
			if (inputElement.name === 'name') {
				name = DOMPurify.sanitize(inputElement.value);
			} else if (inputElement.name === 'message') {
				message = DOMPurify.sanitize(inputElement.value);
			}
		}
	}
</script>

<head>
	<link rel="stylesheet" href="fonts.css" />
</head>

<Navigation />
{console.log($page.form)}
{#if form?.success}
	<div class="toast toast-bottom toast-center" transition:fade={{ duration: 3000 }}>
		<div class="alert alert-success">
			<span
				>Votre message a été transmis avec succès. Il sera publié après avoir été soumis à notre
				processus de révision.</span
			>
		</div>
	</div>
{/if}
<div id="contents" class="container mx-auto">
	<slot />

	<div class="w-full p-0 m-0">
		<ContactForm />
	</div>
</div>

<button class="btn" on:click={openModal}>open modal</button>
<dialog bind:this={modal} id="temoignage" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="POST" use:enhance>
			<div class="flex flex-col gap-6 p-4">
				<h3 class="font-bold text-lg">Laissez nous un temoignage</h3>
				<div class="flex flex-col gap-2">
					<label for="name">Votre prénom</label>
					<input
						name="name"
						type="text"
						class="input input-bordered bg-neutral/50"
						on:input={handleInput}
						bind:value={name}
					/>
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
					bind:value={message}
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
<Footer {days} />
