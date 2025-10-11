import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getUser, supabase } }) => {
	const user = await getUser();

	if (!user) {
		throw redirect(300, '/login');
	}

	const session = await supabase.auth.getSession().then((res: any) => res.data.session);
	return { session };
}) satisfies PageServerLoad;
