import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		revi: {
			name: 'Pedro',
			rating: 3,
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro rerum ipsum sequi error saepe	doloribus natus omnis iusto. Omnis, voluptatibus nihil et ut laboriosam tenetur! Quos, laboresit voluptates unde tempore molestiae dolore soluta quaerat est iure libero alias rerum. Quia architecto voluptates cupiditate aut autem sint tempora ad labore.'
		}
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const rating = data.get('rating');
		const message = data.get('message');

		console.log('did i get in');
		if (cookies.get('ratingSent') == 'true') {
			console.log('Message already sent');
			cookies.delete('ratingSent');
			console.log('cookie destroyed');
			return { success: false };
		} else {
			console.log(name);
			console.log(rating);
			console.log(message);
			// Set the cookie sent to prevent spamming
			console.log('why this dont work');
			// cookies.set('ratingSent', 'true', {
			// 	path: '/',
			// 	httpOnly: true,
			// 	sameSite: 'strict',
			// 	maxAge: 60 * 60 * 24
			// });
			console.log('is this true');
			return { success: true };
		}
		return { succes: true };
	}
} satisfies Actions;
