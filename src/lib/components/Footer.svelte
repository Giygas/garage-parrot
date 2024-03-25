<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/helper';
	import type { Weekday } from '$lib/types';

	export let weekdays: Weekday[];

	// Fetch the google map for better loading time
	import { afterUpdate } from 'svelte';

	let src = '';

	afterUpdate(async () => {
		const response = await fetch(
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.0910114425365!2d1.4721163766063876!3d43.62546465422367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebcd2535754d3%3A0x571b09c8e5bff5eb!2s4%20Chem.%20de%20Nicol%2C%2031200%20Toulouse%2C%20France!5e0!3m2!1sen!2sar!4v1689192159461!5m2!1sen!2sar&loading=async'
		);
		src = response.url;
	});
</script>

<div
	class="bg-primary flex flex-row flex-wrap px-10 py-10 gap-2 justify-around text-base-100 text-xs lg:text-base"
>
	<div class="flex flex-col justify-center text-center w-full lg:w-2/5">
		<h2 class="text-accent-focus text-xl md:text-3xl font-semibold">Notre Adresse</h2>
		<p class="text-lg py-3 text-neutral">4 Chem. de Nicol, 31200 Toulouse</p>

		<iframe
			class="w-full"
			title="Garage location"
			{src}
			width="648"
			height="310"
			style="border:0;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>

	<div class="flex flex-col justify-center text-center w-full lg:w-2/5 max-w-fit">
		<h2 class="text-accent-focus text-xl md:text-3xl font-semibold py-3">Horaires d'ouverture</h2>
		<table class="text-xs sm:text-base">
			<tbody>
				{#each weekdays as day}
					<tr>
						<td class="text-right text-secondary-focus w-fit">
							{capitalizeFirstLetter(day.day)}:
						</td>
						<td class="px-3 text-neutral">
							{day.hours}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
