import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals: { getUser, supabase } }) => {
	if (cookies.get('ratingSent') == 'true') {
		cookies.delete('ratingSent', { path: '/' });
	}

	const user = await getUser();
	const session = user ? await supabase.auth.getSession().then((res) => res.data.session) : null;

	return {
		session
	};
};
