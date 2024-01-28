import { db } from '$lib/db/client';
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
		console.log('sendRating data:');

		let name: string;
		let rating: number;
		let message: string;
		// Check for data integrity
		if (data.get('name') !== null && data.get('rating') !== null && data.get('message') !== null) {
			name = data.get('name') as string;
			rating = Number(data.get('rating'));
			message = data.get('message') as string;

			if (cookies.get('ratingSent') == 'true') {
				console.log('Message already sent');
				cookies.delete('ratingSent', { path: '/' });
				console.log('cookie destroyed');
				return { success: false };
			} else {
				const { error } = await db
					.from('temoignages')
					.insert({ name: name, rating: rating, message: message });
				// Set the cookie sent to prevent spamming
				// cookies.set('ratingSent', 'true', {
				// 	path: '/',
				// 	httpOnly: true,
				// 	sameSite: 'strict',
				// 	maxAge: 60 * 60 * 24
				// });
				if (!error) {
					return { success: true };
				}
			}
		} else {
			return { sucess: false, error: 'Incomplete champs' };
		}
	}
} satisfies Actions;
