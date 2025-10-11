import { redirect } from '@sveltejs/kit';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/db/types';

export const load = async ({
	locals: { getUser, supabase }
}: {
	locals: { getUser: () => Promise<User | null>; supabase: SupabaseClient<Database> };
}) => {
	const user = await getUser();

	if (!user?.user_metadata.admin) {
		redirect(303, '/adminpanel');
	} else {
		return user;
	}
};
