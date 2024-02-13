import { db } from '$lib/db/client';
import type { Message } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		const prenom = data.get('prenom')?.toString().trim();
		const nom = data.get('nom')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const telephone = data.get('telephone')?.toString().trim();
		const message = data.get('message')?.toString().trim();
		const origin = data.get('url') as string;

		if (!prenom || !nom || !email || !telephone || !message) {
			return {
				success: false,
				message: 'Tous les champs sont obligatoires',
				userData: {
					prenom,
					nom,
					email,
					telephone,
					message
				},
				redirectTo: origin
			};
		}

		const { error } = await db.from('contacts').insert({
			first_name: prenom,
			last_name: nom,
			email: email,
			telephone: telephone,
			message: message
		});

		if (error) {
			return {
				error: true,
				message: error.message,
				redirectTo: origin
			};
		}

		return {
			success: true,
			message: 'Message envoyé',
			redirectTo: origin
		};
	},
	sendRating: async ({ cookies, request }): Promise<Message> => {
		const data = await request.formData();

		let name: string;
		let rating: number;
		let message: string;
		// Check for data integrity
		if (data.get('name') !== '' && data.get('rating') !== null && data.get('message') !== '') {
			name = data.get('name') as string;
			rating = Number(data.get('rating'));
			message = data.get('message') as string;

			if (cookies.get('ratingSent') == 'true') {
				return { success: false, message: 'Vous avez déjà envoyé un témoignage' };
			} else {
				const { error } = await db
					.from('temoignages')
					.insert({ name: name, rating: rating, message: message });
				if (!error) {
					// Set the cookie sent to prevent spamming
					cookies.set('ratingSent', 'true', {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						maxAge: 60 * 60 * 24
					});
					return {
						success: true,
						message:
							'Votre message a été transmis avec succès. Il sera publié après avoir été soumis à notre processus de révision'
					};
				} else {
					return {
						success: false,
						message: "Un problème est survenu lors de l'envoi du formulaire, veuillez réessayer"
					};
				}
			}
		} else {
			return { success: false, message: 'Toutes les champs du formulaire doivent etre remplis' };
		}
	}
} satisfies Actions;
