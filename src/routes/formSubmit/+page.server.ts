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
		redirect(303, origin);
	},
	sendRating: async ({ cookies, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const rating = data.get('rating');
		const message = data.get('message');

		if (cookies.get('ratingSent') == 'true') {
			console.log('Message already sent');
			/* @migration task: add path argument */ cookies.delete('ratingSent', { path: '/' });
			console.log('cookie destroyed');
			return { success: false };
		} else {
			console.log(name);
			console.log(rating);
			console.log(message);
			// Set the cookie sent to prevent spamming
			// cookies.set('ratingSent', 'true', {
			// 	path: '/',
			// 	httpOnly: true,
			// 	sameSite: 'strict',
			// 	maxAge: 60 * 60 * 24
			// });
			console.log('returning');
			return { success: true };
		}
	}
} satisfies Actions;
