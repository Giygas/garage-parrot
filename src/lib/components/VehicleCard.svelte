<script lang="ts">
	import type { DatabaseVoiture } from '$lib/types';

	export let vehicle: DatabaseVoiture;
</script>

<a href="vehicles/detail/{vehicle.title.split(' ').join('-')}">
	<div class="grid grid-flow-row grid-rows-3 h-[400px] relative">
		<div class="row-span-2 card-top">
			<img src={vehicle.image} alt={vehicle.title} class="card-top w-full" />
		</div>
		<div class="bg-neutral card-bottom place-content-center">
			<div class="flex flex-col px-5 h-full items-baseline gap-1 justify-center font-cq">
				<div class="font-bold font-montserrat uppercase place-self-center shrink-0">
					{vehicle.title}
				</div>
				<div class="flex flex-row w-full">
					<strong>ANNEE:</strong>
					<span>
						{vehicle.year}
					</span>
				</div>
				<div class="flex flex-row w-full">
					<strong> KILOMETRAGE: </strong>
					<span>
						{vehicle.kilometrage}
					</span>
				</div>
				{#if vehicle.engine}
					<div class="flex flex-row w-full">
						<strong> MOTEUR: </strong>
						<span>
							{vehicle.engine}
						</span>
					</div>
				{:else if vehicle.traction}
					<div class="flex flex-row w-full">
						<strong> TRACTION: </strong>
						<span>
							{vehicle.traction}
						</span>
					</div>
				{/if}
			</div>
		</div>
		<div
			class="flex bg-secondary text-neutral text-lg w-fit h-9 px-2 rounded-lg items-center absolute top-2 right-2"
		>
			{vehicle.price} €
		</div>
	</div>
</a>

<style>
	img {
		object-fit: cover;
		height: 100%;
	}
	.card-top {
		border-radius: 0.5rem 0.5rem 0 0;
	}
	.card-bottom {
		border-radius: 0 0 0.5rem 0.5rem;
	}
	.font-cq {
		font-size: 1.4cqb;
		resize: horizontal;
	}
</style>
