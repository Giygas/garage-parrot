import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.getSession();

	if (!session) {
		throw redirect(300, '/login');
	}

	return { session };
};
