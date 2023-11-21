import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	contact: async ({ request, url }) => {
		const data = await request.formData();
		console.log([...data]);

		const urlData = data.get('url');
		const origin = typeof urlData === 'string' ? urlData : '/';

		console.log(url);
		console.log(origin);
		throw redirect(303, origin);
	}
};
