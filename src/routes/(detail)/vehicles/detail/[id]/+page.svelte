<script lang="ts">
	import '../../../../../app.postcss';
	import { afterNavigate } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { DatabaseVoiture, userData } from '$lib/types';
	let windowWidth: number;
	let resizeListener: EventListener;

	onMount(() => {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;

			resizeListener = () => {
				windowWidth = window.innerWidth;
			};
			window.addEventListener('resize', resizeListener);
		}

		const link = document.createElement('link');
		link.rel = 'preload';
		link.href = 'fonts.css';
		link.as = 'style';
		link.onload = () => {
			link.onload = null;
			link.rel = 'stylesheet';
		};
		document.head.appendChild(link);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', resizeListener);
		}
	});

	afterNavigate(() => {
		if (windowWidth > 1023) {
			window.scrollTo({
				top: 250,
				left: 0,
				behavior: 'smooth'
			});
		} else if (windowWidth > 768) {
			window.scrollTo({
				top: 180,
				left: 0,
				behavior: 'smooth'
			});
		}
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
	import toast, { Toaster } from 'svelte-french-toast';
	import { ContactForm, Footer, Navigation } from '$components';
	import { fade } from 'svelte/transition';
	import type { Weekday } from '$lib/types.js';

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

	export let data;
	type Weekdays = NonNullable<Weekday[]>;
	type Vehicle = NonNullable<DatabaseVoiture>;

	const vehicle = data.vehicle as Vehicle;

	let weekdays = data.weekdays as Weekdays;
	let images: string[] = [];

	images.push(vehicle.image);

	if (vehicle.other_images) {
		for (let img of vehicle.other_images) {
			images.push(img);
		}
	}

	export const vehicleId = vehicle.id;

	let userData = $page.form?.userData as userData | null;
	$: if (userData) {
		userData = userData as userData;
	}

	$: $page.form;
	$: if ($page.form) {
		if ($page.form.success) {
			toast.success($page.form.message);
		}
		if ($page.form.error) {
			toast.success($page.form.message);
		}
	}
</script>

<svelte:head>
	<title>{vehicle.title} - Garage Parrot</title>
</svelte:head>

<Toaster />

<Navigation />

<div id="contents" class="container mx-auto">
	<div
		class="flex flex-wrap pt-5 justify-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:pt-52 md:justify-end md:pr-12 md:pb-12 lg:pr-24 lg:pt-60 xl:pr-40 xl:pb-24"
	/>

	<div class="flex flex-row w-full mt-24 md:mt-16 px-5 mb-10">
		<button class="flex place-items-center" on:click={() => history.back()}
			><Icon icon="ic:twotone-keyboard-arrow-left" width="48" height="48" style="color: #6A655C" />
			<span class="font-montserrat text-xl uppercase font-bold"> Retour </span>
		</button>
	</div>

	<div class="flex flex-col place-items-center px-10">
		<div class="carousel carousel-center sm:rounded-box">
			{#each images as img, i}
				<div class="carousel-item">
					<img
						src={img}
						alt="Vehicule image numero {i}"
						class=" h-[300px] md:h-[450px] lg:h-[600px]"
					/>
				</div>
			{/each}
		</div>

		<!-- TITLE -->
		<div class="flex mt-10 justify-between w-full items-baseline">
			<h1 class="montserrat text-accent text-xl md:text-4xl drop-shadow-lg">
				{vehicle.title}
			</h1>
			<h2 class="text-xl md:text-3xl font-semibold">€ {vehicle.price}</h2>
		</div>

		<div class="divider divider-accent mt-8" />

		<div
			class="grid grid-cols-2 text-sm md:text-2xl text-primary w-full font-barlow items-center gap-2 md:gap-10 mt-4 md:mt-10"
		>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Année:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.year}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Moteur:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.engine ?? 'Non Renseigné'}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Kilometrage:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.kilometrage}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Traction:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.traction ?? 'Non Renseigné'}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Puissance:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.power ? vehicle.power + ' ch' : 'Non Renseigné'}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Portes:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.doors ?? 'Non Renseigné'}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Boîte:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.transmission ?? 'Non Renseigné'}
				</span>
			</div>
			<div class="flex gap-1 md:gap-6 items-baseline">
				<h3 class="font-barlow font-semibold">Sièges:</h3>
				<span class="font-light text-xs sm:text-sm md:text-2xl">
					{vehicle.seats ?? 'Non Renseigné'}
				</span>
			</div>
		</div>

		<div class="flex place-self-start text-secondary text-lg md:text-3xl mt-10">EQUIPEMENT:</div>
		{#if vehicle.options?.length}
			<div class="grid grid-cols-2 px-24">
				<ul>
					{#each vehicle.options as option}
						<li
							class="font-barlow font-light text-xs sm:text-sm md:text-2xl list-disc text-primary"
						>
							option
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="flex text-2xl mt-4 md:mt-10">
				<span class="font-light sm:text-md md:text-2xl"> Non Renseigné </span>
			</div>
		{/if}
	</div>

	<div class="w-full p-0 m-0" id="contact-form">
		<ContactForm {userData} {vehicleId} />
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
