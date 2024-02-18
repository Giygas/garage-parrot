import { adminAuthClient } from '$lib/db/adminClient';
import { db } from '$lib/db/client';
import type { DatabaseUser } from '$lib/types';

export const load = async () => {
	const { data, error } = await db.from('users').select().returns<DatabaseUser[]>();

	if (error) throw error;

	const users: DatabaseUser[] = data;

	return { users };
};

export const actions = {
	deleteUser: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id') as string;
		console.log(id);

		if (id) {
			const { error } = await adminAuthClient.deleteUser(id, true);

			if (error) {
				return {
					error: true,
					message: error.message
				};
			}

			const { error: errorPublic } = await db.from('profiles').delete().eq('id', id);

			if (errorPublic) {
				return {
					error: true,
					message: errorPublic.message
				};
			}
		}
		return {
			success: true,
			message: 'Utilisateur effacé de la base de données'
		};
	}
};
