<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import type { DatabaseReview } from '$lib/types';
	import Icon from '@iconify/svelte';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	export let form: ActionData;
	$: reviews = data.reviews as DatabaseReview[];

	$: if (form?.success) {
		toast.success(form.message, { duration: 4000 });
	}
	$: if (form?.error) {
		toast.error(form.message, { duration: 4000 });
	}
</script>

<div class="overflow-x-auto">
	<div class="flex pb-8">
		<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">Témoignages</h1>
	</div>
	<table class="table table-zebra table-md">
		<thead>
			<tr>
				<th>Nom</th>
				<th class="text-center">Notation</th>
				<th>Message</th>
				<th class="text-center">Apprové?</th>
				<!-- <th>Par qui</th> -->
				<th class="text-center">Date de création</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody>
			{#each reviews as rev}
				{@const date = new Date(rev.created_at).toLocaleDateString('fr-FR')}
				<tr>
					<td>{rev.name}</td>
					<td class="text-center">{rev.rating}</td>
					<td>{rev.message}</td>
					<td class="text-center">{rev.approved ? 'oui' : 'non'}</td>
					<!-- <td>{rev.approved_by}</td> -->
					<td class="text-center">{date}</td>
					<td class="w-6">
						<form action="?/approveReview" method="POST" use:enhance class="w-fit">
							<input type="hidden" value={rev.id} name="id" />
							<button class={rev.approved ? 'btn-disabled' : ''}>
								<noscript> Approuver </noscript>
								<Icon
									icon="lets-icons:check-fill"
									style="{rev.approved ? 'color: #aaa' : 'color: #318536'}; font-size: 24px;"
								/>
							</button>
						</form>
					</td>
					<td class="w-6">
						<form action="?/deleteReview" method="POST" use:enhance>
							<input type="hidden" value={rev.id} name="id" />
							<button>
								<Icon icon="mdi:trash-can-circle" style="color: #830e21; font-size: 24px" />
								<noscript> Effacer </noscript>
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
