<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import logo from '$lib/assets/logo.png';
	import { page } from '$app/stores';

	const nav = [
		{ title: 'Accueil', path: '/' },
		{ title: 'Services', path: '/services' },
		{ title: "Vehicles d'ocassion", path: '/vehicles' }
	];

	//Menu logic
	import { fade } from 'svelte/transition';
	let showMenu: boolean = false;

	// Logo animation
	let isScrolled = false;
	let timeoutId: number | null = null; //Need a debouncing function here

	onMount(() => {
		// Add a scroll event listener to track when the user scrolls
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		// Clean up the event listener when the component is unmounted
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});

	function handleScroll() {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			// Check if the user has scrolled beyond a certain threshold (100 pixels)
			isScrolled = window.scrollY > 10;
		}, 10); // Debounce time
	}
</script>

<div
	class="navbar z-30 backdrop-blur-lg fixed top-0 p-1 md:py-4 justify-center px-8 sm:px-10 md:px-6"
>
	<div class="container relative flex justify-between">
		<a href="/">
			<img class="logo {isScrolled ? 'shrinked' : ''} h-auto" src={logo} alt="Garage logo" />
		</a>

		<nav class="navbar-center hidden md:flex justify">
			<ul class="desktop menu menu-horizontal px-1 lg:pe-12 text-primary text-sm lg:text-base">
				{#each nav as item}
					<li>
						<a
							href={item.path}
							class="{$page.url.pathname === item.path ? 'bg-accent text-base-100' : ''} cleanbg"
							>{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="md:hidden z-30">
		<label class="btn btn-circle swap swap-rotate">
			<!-- this hidden checkbox controls the state -->
			<input class="z-50" type="checkbox" bind:checked={showMenu} />

			<!-- hamburger icon -->
			<svg
				class="swap-off fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512"
				><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg
			>

			<!-- close icon -->
			<svg
				class="swap-on fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512"
				><polygon
					points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
				/></svg
			>
		</label>
	</div>
</div>
{#if showMenu}
	<div
		class="mobile z-20 fixed inset-0 p-8 h-full w-full bg-primary/30 backdrop-blur-2xl"
		transition:fade|global={{ delay: 0, duration: 200 }}
	>
		<ul class="menu menu-vertical space-y-16 text-2xl pt-32 h-full text-mont">
			{#each nav as item}
				<li class="text-center">
					<a
						href={item.path}
						class="py-4 justify-center cleanbg {$page.url.pathname === item.path
							? 'bg-accent text-base-100'
							: ''} "
						>{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style lang="postcss">
	.cleanbg:active {
		background-color: #a51d2d50;
	}

	ul.desktop {
		height: 4.5rem;
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		gap: 5vw;
		font-family: 'Montserrat';
	}

	a:hover {
		color: #a51d2d;
	}

	.navbar {
		align-items: start;
		transition: all 0.3s ease;
	}

	.logo {
		position: absolute;
		top: 12rem;
		left: 4rem;
		height: 12rem;
		transition: all 0.3s ease;
		/* margin: 4rem 0 0 4rem; */
	}

	.logo.shrinked {
		top: -0.8rem;
		left: 0;
		height: 6rem;

		margin: 0 0 0 6rem;
		transition: all 0.3s ease;
	}

	@media (max-width: 768px) {
		.logo {
			position: static;
			align-content: center;
			justify-self: center;
			align-items: center;
			height: 6rem;
			width: 15rem;
			margin: auto;
		}

		.logo.shrinked {
			margin: auto;
		}

		.navbar {
			align-items: center;
		}
	}

	@media only screen and (max-width: 1280px) and (min-width: 768px) {
		.logo {
			position: absolute;
			top: 8rem;
			left: 2rem;
			height: 10rem;
			transition: all 0.3s ease;
		}

		.logo.shrinked {
			top: 0;
			left: 0;
			height: 5rem;

			margin: 0 0 0 2rem;
			transition: all 0.3s ease;
		}
	}
</style>
