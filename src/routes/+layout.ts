import { PUBLIC_SUPABASE_ANON_KEY_DEV, PUBLIC_SUPABASE_URL_DEV } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '$lib/db/types';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL_DEV,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY_DEV,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
