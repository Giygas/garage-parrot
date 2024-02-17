<script lang="ts">
	import type { DatabaseVoiture } from '$lib/types.js';

	export let data;

	const vehicles = data.vehicles as DatabaseVoiture[];
	const images = data.images as { [key: string]: string };
</script>

<div class="bg-slate-200 flex flex-col w-full mt-10">
	{#each vehicles as vehicle}
		<div class="flex flex-row h-64 border-2 border-secondary justify-center">
			<div class="grid grid-cols-3">
				<div class="col-span-1 place-self-center relative h-fit">
					<img src={images[vehicle.id]} alt="Principale" class="rounded-xl" />
				</div>

				<div class="col-span-2 ml-8 py-4 relative">
					<div
						class="flex bg-secondary text-neutral text-xl w-fit h-10 px-2 rounded-lg items-center absolute top-4 right-4"
					>
						Prix: {vehicle.price}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
