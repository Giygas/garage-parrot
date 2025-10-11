import { adminAuthClient } from '$lib/db/adminClient';
import type { DatabaseUser } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getUser, supabase } }) => {
	const user = await getUser();

	if (!user?.user_metadata.admin) {
		redirect(303, '/adminpanel');
	}

	const { data, error } = await supabase.from('users').select().returns<DatabaseUser[]>();

	if (error) throw error;

	const users: DatabaseUser[] = data;
	const session = user ? await supabase.auth.getSession().then((res) => res.data.session) : null;

	return { users, session };
};

export const actions = {
	deleteUser: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();

		const id = data.get('id') as string;

		if (id) {
			const { error } = await adminAuthClient.deleteUser(id, true);

			if (error) {
				return {
					error: true,
					message: error.message
				};
			}

			const { error: errorPublic } = await supabase.from('profiles').delete().eq('id', id);

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
