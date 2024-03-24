import type { userData } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	contact: async ({ request, locals: { supabase } }) => {
		const db = supabase;

		const data = await request.formData();
		const id = data.get('vehicleId');
		const prenom = data.get('prenom')?.toString().trim();
		const nom = data.get('nom')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const telephone = data.get('telephone')?.toString().trim();
		const message = data.get('message')?.toString().trim();
		const origin = data.get('url') as string;

		let vehicleId;
		if (id) {
			vehicleId = id.toString() as string;
		} else {
			vehicleId = null;
		}

		if (!prenom || !nom || !email || !telephone || !message) {
			const userData = {
				prenom: prenom,
				nom: nom,
				email: email,
				telephone: telephone,
				message: message
			} as userData;

			return {
				error: true,
				message: 'Tous les champs sont obligatoires',
				userData,
				redirectTo: origin
			};
		}

		const { error } = await db.from('contacts').insert({
			first_name: prenom,
			last_name: nom,
			email: email,
			telephone: telephone,
			message: message,
			voiture_id: vehicleId
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
	sendRating: async ({ cookies, request, locals: { supabase, getSession } }) => {
		const data = await request.formData();

		let name: string;
		let rating: number;
		let message: string;

		const origin = data.get('url') as string;

		// Check for data integrity
		if (data.get('name') !== '' && data.get('rating') !== null && data.get('message') !== '') {
			name = data.get('name') as string;
			rating = Number(data.get('rating'));
			message = data.get('message') as string;

			if (cookies.get('ratingSent') == 'true') {
				return {
					success: false,
					message: 'Vous avez déjà envoyé un témoignage',
					redirectTo: origin,
					rating: true
				};
			} else {
				const { error } = await supabase
					.from('temoignages')
					.insert({ name: name, rating: rating, message: message });
				if (!error) {
					const session = await getSession();
					if (!session) {
						// Set the cookie sent to prevent spamming to non logged in users
						cookies.set('ratingSent', 'true', {
							path: '/',
							httpOnly: true,
							sameSite: 'strict',
							maxAge: 60 * 60 * 24
						});
					}
					return {
						success: true,
						message:
							'Votre message a été transmis avec succès. Il sera publié après avoir été soumis à notre processus de révision',
						redirectTo: origin,
						rating: true
					};
				} else {
					return {
						success: false,
						message: "Un problème est survenu lors de l'envoi du formulaire, veuillez réessayer",
						redirectTo: origin,
						rating: true
					};
				}
			}
		} else {
			return {
				success: false,
				message: 'Toutes les champs du formulaire doivent etre remplis',
				redirectTo: origin,
				rating: true
			};
		}
	}
} satisfies Actions;
