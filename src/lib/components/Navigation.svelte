<script lang="ts">
	const nav = [
		{ title: 'Accueil', path: '/' },
		{ title: 'Services', path: '/services' },
		{ title: "Vehicles d'ocassion", path: '/vehicles' }
	];
</script>

<nav>
	<ul>
		{#each nav as item}
			<li>
				<a href={item.path}>{item.title} </a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		height: 12vh;
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		gap: 5vw;
		margin: 0 8vw;
		font-family: 'Montserrat';
		font-size: large;
	}

	a:hover {
		color: #a51d2d;
	}
</style>
