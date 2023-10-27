<script lang="ts">
	import type { Weekdays } from '$lib/types.ts';

	import { capitalizeFirstLetter } from '$lib/helper';

	export let days: Weekdays;
</script>

<div
	class="bg-primary flex flex-row flex-wrap px-10 py-10 gap-2 justify-around text-base-100 text-xs lg:text-base"
>
	<div class="flex flex-col justify-center text-center w-full lg:w-2/5">
		<h2 class="text-accent text-xl md:text-3xl font-semibold">Notre Adresse</h2>
		<p class="text-lg py-3">4 Chem. de Nicol, 31200 Toulouse</p>

		<iframe
			class="w-full"
			title="Garage location"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.0910114425365!2d1.4721163766063876!3d43.62546465422367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebcd2535754d3%3A0x571b09c8e5bff5eb!2s4%20Chem.%20de%20Nicol%2C%2031200%20Toulouse%2C%20France!5e0!3m2!1sen!2sar!4v1689192159461!5m2!1sen!2sar"
			width="648"
			height="310"
			style="border:0;"
			allow="false"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>

	<div class="flex flex-col justify-center text-center w-full lg:w-2/5 max-w-fit">
		<h2 class="text-accent text-xl md:text-3xl font-semibold py-3">Horaires d'ouverture</h2>
		<table class="text-xs sm:text-base">
			<tbody>
				{#each Object.keys(days) as day}
					<tr>
						<td class="text-right text-secondary w-fit">
							{capitalizeFirstLetter(day)}:
						</td>
						<td class="px-3">
							{days[day]}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
