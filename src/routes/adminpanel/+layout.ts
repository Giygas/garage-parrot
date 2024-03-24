import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

injectSpeedInsights();

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session);
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			}
		}
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
