<script lang="ts">
	import type { Weekday } from '$lib/types';
	import toast from 'svelte-french-toast';
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let weekdays: Weekday[];

	$: weekdays = data.weekdays as Weekday[];

	$: if (form?.success) {
		toast.success(form.message, { duration: 4000 });
	}
	$: if (form?.error) {
		toast.error(form.message, { duration: 4000 });
	}
</script>

<section class="flex-row">
	<div class="flex">
		<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">
			Horaires d'ouverture
		</h1>
	</div>
	<div class="flex justify-center pt-4">
		<form method="POST" action="?/updateHours" use:enhance>
			{#key weekdays}
				{#each weekdays as weekday}
					<div class="flex flex-col min-w-full h-fit pt-8">
						<div class="grid grid-cols-5 gap-6 items-center">
							<div class="col-span-1 text-end">
								<label for={weekday.day} class="uppercase items-end justify-end text-lg"
									>{weekday.day}:</label
								>
							</div>
							<div class="col-span-4">
								<input
									type="text"
									value={weekday.hours}
									name={weekday.id.toString()}
									class="input input-primary w-full text-lg bg-primary/5"
								/>
							</div>
						</div>
					</div>
				{/each}
			{/key}
			<div class="flex justify-center">
				<button class="btn btn-accent w-full mt-12">Modifier</button>
			</div>
		</form>
	</div>
</section>
