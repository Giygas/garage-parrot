import { db } from '$lib/db/client';
import type { DatabaseReview } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data, error } = await db.from('temoignages').select().order('id', { ascending: true });

	if (error) {
		return {
			error: true,
			message: error.message
		};
	}

	const reviews: DatabaseReview[] = data;
	return { reviews };
};

export const actions = {
	approveReview: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id') as string | null;

		if (id) {
			const parsedId = parseInt(id);
			// UPDATE TEMOIGNAGES SET approved = true WHERE temoignages.id = parsedId
			const { error } = await db.from('temoignages').update({ approved: true }).eq('id', parsedId);

			if (error) {
				return {
					error: true,
					message: error.message
				};
			}
		} else {
			return {
				error: true,
				message: 'Problème avec la connexion à la base de données'
			};
		}

		return {
			success: true,
			message: 'Témoignage approuvé correctement'
		};
	},
	deleteReview: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id') as string | null;

		if (id) {
			const parsedId = parseInt(id);
			// DELETE FROM TEMOIGNAGES WHERE temoignages.id = parsedId
			const { error } = await db.from('temoignages').delete().eq('id', parsedId);

			if (error) {
				return {
					error: true,
					message: error.message
				};
			}
		} else {
			return {
				error: true,
				message: 'Problème avec la connexion à la base de données'
			};
		}

		return {
			success: true,
			message: 'Témoignage effacé correctement'
		};
	}
};
