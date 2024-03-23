<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import type { DatabaseContact } from '$lib/types';
	import Icon from '@iconify/svelte';
	import toast from 'svelte-french-toast';
	type contactTitle = {
		voiture_title: string | null;
	} & DatabaseContact;
	export let data: PageData;
	export let form: ActionData;

	$: contacts = data.contacts as contactTitle[];

	$: if (form?.success) {
		toast.success(form.message, { duration: 4000 });
	}
	$: if (form?.error) {
		toast.error(form.message, { duration: 4000 });
	}
</script>

<div class="overflow-x-auto">
	<div class="flex pb-8">
		<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">
			Demandes de contact
		</h1>
	</div>
	<table class="table table-zebra table-md">
		<thead>
			<tr>
				<th>Nom</th>
				<th>Prenom</th>
				<th>Message</th>
				<th>Téléphone</th>
				<!-- <th>Par qui</th> -->
				<th class="text-center">Date de création</th>
				<th class="text-center">Véhicule</th>
				<th class="text-center">Traité?</th>
				<th class="text-center">Done</th>
			</tr>
		</thead>
		<tbody>
			{#each contacts as contact}
				{@const date = new Date(contact.created_at).toLocaleDateString('fr-FR')}
				{@const title = contact.voiture_title?.split(' ').join('-')}
				<tr>
					<td>{contact.last_name}</td>
					<td>{contact.first_name}</td>
					<td>{contact.message}</td>
					<td>{contact.telephone}</td>
					<td class="text-center">{date}</td>
					{#if contact.voiture_id}
						<td class="text-center"
							><a href="/vehicles/detail/{title}" class="text-accent underline"
								>{contact.voiture_title}</a
							></td
						>
					{:else}
						<td class="text-center">Non</td>
					{/if}
					<td class="text-center">{contact.responded ? 'Oui' : 'Non'}</td>
					<td class="w-6">
						<form action="?/traiter" method="POST" use:enhance class="w-fit">
							<input type="hidden" value={contact.id} name="id" />
							<button class={contact.responded ? 'btn-disabled' : ''}>
								<noscript> Done </noscript>
								<Icon
									icon="lets-icons:check-fill"
									style="{contact.responded ? 'color: #aaa' : 'color: #318536'}; font-size: 24px;"
								/>
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
