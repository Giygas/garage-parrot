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

<div class="min-h-screen" />
<div class="navbar bg-base-100 fixed top-0 py-4 justify-center {isScrolled ? 'bottom-shadow' : ''}">
	<div class="flex-1">
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
				class="inline-block w-5 h-5 stroke-current"
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
		left: 12rem;
		height: 15rem;
		transition: all 0.3s ease;
		/* margin: 4rem 0 0 4rem; */
	}

	.logo.shrink {
		top: 0.2rem;
		left: 0;
		height: 6rem;

		margin: 0 0 0 4rem;
		transition: all 0.3s ease;
	}

	.bottom-shadow {
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		transition: box-shadow 0.3s ease-in;
	}

	@media (max-width: 768) {
		.logo {
			height: 8rem;
			margin: 2rem 0 0 2rem;
		}
		.logo.shrink {
			margin: 0 0 0 1rem;
		}
	}

	@media (max-width: 1024) {
		.logo {
			position: static;
			margin-left: 4rem;
			height: 8rem;
		}
	}
</style>
