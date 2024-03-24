import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals: { getSession } }) => {
	if (cookies.get('ratingSent') == 'true') {
		cookies.delete('ratingSent', { path: '/' });
	}

	return {
		session: await getSession()
	};
};
