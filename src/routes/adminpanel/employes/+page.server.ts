import { adminAuthClient } from '$lib/db/adminClient';
import type { DatabaseUser } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/db/types';

export const load = async ({
	locals: { getUser, supabase },
	parent
}: {
	locals: { getUser: () => Promise<User | null>; supabase: SupabaseClient<Database> };
	parent: () => Promise<any>;
}) => {
	const user = await parent();

	console.log('user in page.server');
	console.log(user);

	const { data, error } = await supabase.from('users').select();
	console.log(data);
	console.log(error);

	if (error) throw error;

	const users: DatabaseUser[] = data as DatabaseUser[];
	const session = user ? await supabase.auth.getUser().then((res) => res.data.user) : null;

	return { users, session };
};

export const actions = {
	deleteUser: async ({
		request,
		locals: { supabase }
	}: {
		request: Request;
		locals: { supabase: SupabaseClient<Database> };
	}) => {
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
