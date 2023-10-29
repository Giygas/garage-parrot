<script lang="ts">
	// Individual component will reveive the name, rating and message
	// as a prop
	export let name: string;
	export let rating: number;
	export let message: string;

	// Compute the stars array based on the rating
	let stars = Array(rating)
		.fill('filled')
		.concat(Array(5 - rating).fill('empty'))
		.map((star: string, index: number) => ({ star, key: index }));
</script>

<div class="review p-6 bg-primary/80 rounded-lg snap-center text-mont min-w-[20em] md:min-w-[30em]">
	<div class="flex flex-row justify-between text-xl">
		<div class="uppercase text-lg text-base-100 font-semibold">{name}</div>
		<div class="text-accent flex flex-row self-baseline gap-0">
			{#each stars as star (star)}
				{#if star.star === 'filled'}
					<svg
						height="25px"
						width="25px"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="-3.77 -3.77 61.41 61.41"
						xml:space="preserve"
						fill="#000000"
						stroke="#000000"
						stroke-width="0.00053867"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="#CCCCCC"
							stroke-width="0.215468"
						/><g id="SVGRepo_iconCarrier">
							<polygon
								style="fill:#EFCE4A;"
								points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
							/>
						</g></svg
					>
				{:else}
					<svg
						height="25px"
						width="25px"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="-3.77 -3.77 61.41 61.41"
						xml:space="preserve"
						fill="#000000"
						stroke="#000000"
						stroke-width="0.00053867"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="#CCCCCC"
							stroke-width="0.215468"
						/><g id="SVGRepo_iconCarrier">
							<polygon
								style="fill:#F3F2F1;"
								points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
							/>
						</g></svg
					>
				{/if}
			{/each}
		</div>
	</div>
	<div class="uppercase flex text-justify p-2 pt-4 font-light text-base-100 text-xs md:text-sm">
		{message}
	</div>
</div>
