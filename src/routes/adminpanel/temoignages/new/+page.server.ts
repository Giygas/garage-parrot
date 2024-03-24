import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	sendRating: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();

		if (data.get('name') !== '' && data.get('rating') !== null && data.get('message') !== '') {
			const name = data.get('name') as string;
			const rating = Number(data.get('rating'));
			const message = data.get('message') as string;

			const { error } = await supabase
				.from('temoignages')
				.insert({ approved: true, name: name, message: message, rating: rating });

			if (error) throw error;

			return {
				success: true,
				message: 'Témoignage enregistré !'
			};
		} else {
			return {
				error: true,
				message: 'Tous les elements sont obligatoires'
			};
		}
	}
};
