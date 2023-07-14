<script lang="ts">
	const nav = [
		{ title: 'Accueil', path: '/' },
		{ title: 'Services', path: '/services' },
		{ title: "Vehicles d'ocassion", path: '/vehicles' }
	];
</script>

<nav class="w-full pe-16 text-primary text-base">
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
		font-family: 'Montserrat';
	}

	a:hover {
		color: #a51d2d;
	}
</style>
