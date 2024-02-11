import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/db/types';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const options = [
		{ name: 'Annonces', link: '/adminpanel/annonces' },
		{ name: 'Témoignages', link: '/adminpanel/temoignages' }
	];

	if (session?.user.user_metadata.admin) {
		options.push(
			{
				name: 'Gestion des employés',
				link: '/adminpanel/employes'
			},
			{
				name: 'Modifier les services',
				link: '/adminpanel/services'
			},
			{
				name: "Horaires d'ouverture",
				link: '/adminpanel/horaires'
			},
			{
				name: 'Demandes de contact',
				link: '/adminpanel/contact'
			}
		);
	}

	return { supabase, session, options };
};
