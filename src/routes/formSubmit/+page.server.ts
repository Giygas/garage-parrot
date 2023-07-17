import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		console.log([...data]);
		const origin = url.searchParams.get('url') || '/';
		throw redirect(303, origin);
	}
};
