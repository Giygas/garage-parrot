<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const nav = [
		{ title: 'Accueil', path: '/' },
		{ title: 'Services', path: '/services' },
		{ title: "Vehicles d'ocassion", path: '/vehicles' }
	];

	let isScrolled = false;
	let timeoutId: number | null = null; //Need a debouncing function here

	onMount(() => {
		// Add a scroll event listener to track when the user scrolls
		window.addEventListener('scroll', handleScroll);

		return () => {
			// Clean up the event listener when the component is unmounted
			window.removeEventListener('scroll', handleScroll);
		};
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

<div class="md:min-h-screen -z-100" />
<div class="md:hidden h-[200px] -z-100" />
<div
	class="navbar bg-base-100 fixed top-0 py-4 align-center justify-center {isScrolled
		? 'bottom-shadow'
		: ''}"
>
	<div class="container bg-black relative">
		<div class="flex-1 justify-center">
			<a href="/">
				<img class="logo {isScrolled ? 'shrink' : ''}" src={logo} alt="Garage logo" />
			</a>
		</div>

		<div class="navbar-center hidden md:flex justify">
			<ul class="menu menu-horizontal px-1 lg:pe-12 text-primary text-base">
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
		</div>

		<div class="flex-none md:hidden">
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-10 h-10 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</button>
		</div>
	</div>
</div>

<style>
	.cleanbg:active {
		background-color: #a51d2d50;
	}

	ul {
		height: 8vh;
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
		transition: height 0.3s ease;
	}

	.logo {
		position: absolute;
		top: 12rem;
		left: 4rem;
		height: 12rem;
		transition: all 0.3s ease;
		/* margin: 4rem 0 0 4rem; */
	}

	.logo.shrink {
		top: 0.2rem;
		left: 0;
		height: 6rem;

		margin: 0 0 0 6rem;
		transition: all 0.3s ease;
	}

	.bottom-shadow {
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		transition: box-shadow 0.3s ease-in;
	}

	@media (max-width: 768px) {
		.logo {
			position: static;
			align-content: center;
			justify-self: center;
			align-items: center;
			height: 6rem;
			margin: auto;
		}

		.logo.shrink {
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

		.logo.shrink {
			top: 0.2rem;
			left: 0;
			height: 5rem;

			margin: 0 0 0 2rem;
			transition: all 0.3s ease;
		}
	}
</style>
