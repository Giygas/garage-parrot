import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = await event.locals.getUser();

	if (!user) {
		throw redirect(300, '/login');
	}

	const session = await event.locals.supabase.auth.getSession().then((res) => res.data.session);
	return { session };
};
