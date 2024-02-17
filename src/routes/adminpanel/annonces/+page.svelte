<script lang="ts">
	export let data;

	const vehicles = data.vehicles;
	const images = data.images as { [key: string]: string };
</script>

<div class=" flex flex-col w-full mt-10">
	{#each vehicles as vehicle}
		<div
			class="flex flex-row h-48 border-2 rounded-lg border-secondary/15 justify-center relative mb-16"
		>
			<div class="grid grid-cols-4 items-center content-center w-full">
				<div class="col-span-1">
					<img src={images[vehicle.id]} alt="Principale" class="rounded-lg" />
				</div>

				<div class="col-span-3 ml-8">
					<div class="grid grid-cols-4">
						<div class="font-montserrat font-bold">TITRE:</div>
						<div class="col-span-3">
							{vehicle.title}
						</div>
					</div>
					<div class="grid grid-cols-4">
						<div class="font-montserrat font-bold">ANNEE:</div>
						<div>
							{vehicle.year}
						</div>
						<div class="font-montserrat font-bold">PORTES:</div>
						<div>
							{vehicle.doors ?? 'Non résigné'}
						</div>
					</div>
					<div class="grid grid-cols-4">
						<div class="font-montserrat font-bold">KILOMETRAGE:</div>
						<div>
							{vehicle.kilometrage}
						</div>
						<div class="font-montserrat font-bold">SIEGES:</div>
						<div>
							{vehicle.seats ?? 'Non résigné'}
						</div>
					</div>
					<div class="grid grid-cols-4">
						<div class="font-montserrat font-bold">MOTEUR:</div>
						<div>
							{vehicle.engine}
						</div>
						<div class="font-montserrat font-bold">TRANSMISSION:</div>
						<div>
							{vehicle.voitures_transmission?.description ?? 'Non résigné'}
						</div>
					</div>

					<div class="grid grid-cols-4">
						<div class="font-montserrat font-bold">TRACTION:</div>
						<div class="col-span-3">
							{vehicle.traction ?? 'Non résigné'}
						</div>
					</div>
					<div class="grid grid-cols-4">
						<div class="font-montserrat font-bold">PUISSANCE:</div>
						<div class="col-span-3">
							{vehicle.power ?? 'Non résigné'}
						</div>
					</div>
				</div>
			</div>
			<!-- Absolute price -->
			<div
				class="flex bg-secondary text-neutral text-lg w-fit h-9 px-2 rounded-lg items-center absolute top-2 right-2"
			>
				Prix: {vehicle.price}
			</div>
		</div>
	{/each}
</div>

<style>
	img {
		object-fit: contain;
		max-height: 200px;
	}
</style>
