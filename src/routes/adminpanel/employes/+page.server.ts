import { adminAuthClient } from '$lib/db/adminClient';
import type { DatabaseUser } from '$lib/types';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/db/types';

export const load = async ({
	parent,
	locals: { supabase }
}: {
	parent: () => Promise<any>;
	locals: { supabase: SupabaseClient<Database> };
}) => {
	const user = await parent();

	const { data, error } = await supabase.rpc('get_users_for_current_user');

	if (error) throw error;

	const usersData: DatabaseUser[] = data as unknown as DatabaseUser[];

	return { user, usersData };
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
