<script lang="ts">
	const nav = [
		{ title: 'Accueil', path: '/' },
		{ title: 'Services', path: '/services' },
		{ title: "Vehicles d'ocassion", path: '/vehicles' }
	];

	import logo from '$lib/assets/logo.png';
</script>

<nav class="w-full md:pe-16 text-primary text-lg">
	<ul>
		{#each nav as item}
			<li>
				<a href={item.path}>{item.title} </a>
			</li>
		{/each}
	</ul>
	<img src={logo} alt="Garage logo" />
</nav>

<style>
	ul {
		height: 8vh;
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		gap: 5vw;
		margin-top: 2vh;
		font-family: 'Montserrat';
	}

	a:hover {
		color: #a51d2d;
	}
</style>
