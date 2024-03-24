<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import { fade } from 'svelte/transition';
	import '../../app.postcss';
	import { ContactForm, Footer, Navigation } from '$components';
	import type { Weekday, userData } from '$lib/types';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let userData: userData | null;
	type Weekdays = NonNullable<Weekday[]>;
	let weekdays = data.weekdays as Weekdays;

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
	import { page } from '$app/stores';
	import { quintIn } from 'svelte/easing';

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

<svelte:head>
	<link rel="stylesheet" href="fonts.css" />
</svelte:head>

<Toaster />

<Navigation session={data.session} />

{#if $page.form && $page.form.success === true}
	<div
		class="toast toast-bottom toast-center z-40"
		transition:fade|global={{ delay: 1000, duration: 8000, easing: quintIn }}
	>
		<div class="alert alert-success z-40">
			<span>{$page.form.message}</span>
		</div>
	</div>
{/if}
{#if $page.form && $page.form.success === false}
	<div
		class="toast toast-bottom toast-center z-40"
		transition:fade|global={{ delay: 1000, duration: 8000, easing: quintIn }}
	>
		<div class="alert alert-error z-40">
			<span>{$page.form.message}</span>
		</div>
	</div>
{/if}
<div id="contents" class="container mx-auto">
	<slot />

	<div class="w-full p-0 m-0" id="contact-form">
		<ContactForm {userData} />
	</div>
	<div
		class="container flex flex-row text-center md:justify-end px-10 py-10 lg:py-20 text-lg lg:text-2xl"
	>
		<p>
			... Ou, si vous voulez, vous pouvez laisser un petit <button
				class="font-semibold text-accent underline"
				on:click={openModal}>témoignage de nos services</button
			>
		</p>
	</div>
</div>

<dialog bind:this={modal} id="temoignage" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="POST" action="/formSubmit?/sendRating">
			<input type="hidden" id="url" name="url" value={$page.url.pathname} />
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
<Footer {weekdays} />
