import { db } from '$lib/db/client';
import type { DatabaseContact } from '$lib/types';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const { data, error } = await db.from('contacts').select().order('id', { ascending: true });

	if (error) {
		return {
			error: true,
			message: error.message
		};
	}

	const contacts: DatabaseContact[] = data;
	return { contacts };
};

export const actions = {
	traiter: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id') as string | null;

		if (id) {
			const parsedId = parseInt(id);

			// UPDATE CONTACTS SET responded = true WHERE contacts.id = parsedId
			const { error } = await db.from('contacts').update({ responded: true }).eq('id', parsedId);

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
			message: 'Demande de contact marqué comme répondue'
		};
	}
} satisfies Actions;
