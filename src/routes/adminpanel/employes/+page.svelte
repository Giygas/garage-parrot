<script lang="ts">
	import { enhance } from '$app/forms';
	import type { DatabaseUser } from '$lib/types';
	import type { ActionData, PageData } from './$types';
	import Icon from '@iconify/svelte';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	$: users = data.users as DatabaseUser[];

	export let form: ActionData;

	$: if (form?.success) {
		toast.success(form.message, { duration: 4000 });
	}
	$: if (form?.error) {
		toast.error(form.message, { duration: 4000 });
	}
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra table-md mt-10">
		<thead>
			<tr>
				<th>Nom</th>
				<th>Email</th>
				<th class="text-center">Date de création de compte</th>
				<th class="text-center">Dernière connexion</th>
				<th> Retirer </th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				{@const date = new Date(user.created_at).toLocaleDateString('fr-FR')}
				<!-- I have no idea why I have to do this instead of user.last_sing_in_at  -->
				{@const lastLogin = Object.values(user)[3]}
				{@const dateLast = lastLogin ? new Date(lastLogin).toLocaleString('fr-FR') : 'Jamais'}
				<tr>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td class="text-center">{date}</td>
					<td class="text-center">{dateLast}</td>
					<td class="w-6 text-center">
						<form action="?/deleteUser" method="POST" use:enhance>
							<input type="hidden" value={user.id} name="id" />
							<button>
								<Icon icon="mdi:trash-can-circle" style="color: #830e21; font-size: 24px" />
								<noscript> Retirer </noscript>
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
