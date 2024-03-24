import type { DatabaseContact } from '$lib/types';
import type { PageServerLoad, Actions } from './$types';

type contactTitle = {
	voiture_title: string | null;
} & DatabaseContact;

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('contacts').select().order('id', { ascending: true });

	if (error) {
		return {
			error: true,
			message: error.message
		};
	}

	const contacts: DatabaseContact[] = data;
	const contactsTitled: contactTitle[] & DatabaseContact[] = [];
	let ct: contactTitle;

	for (const contact of contacts) {
		if (contact.voiture_id) {
			const { data, error } = await supabase
				.from('voitures')
				.select('title')
				.eq('id', contact.voiture_id)
				.single();

			if (error) {
				return {
					error: true,
					message: 'Problème avec la requête ' + error
				};
			}

			ct = {
				...contact,
				voiture_title: data.title
			};
		} else {
			ct = {
				...contact,
				voiture_title: null
			};
		}
		contactsTitled.push(ct);
	}
	return { contacts: contactsTitled };
};

export const actions = {
	traiter: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();

		const id = data.get('id') as string | null;

		if (id) {
			const parsedId = parseInt(id);

			// UPDATE CONTACTS SET responded = true WHERE contacts.id = parsedId
			const { error } = await supabase
				.from('contacts')
				.update({ responded: true })
				.eq('id', parsedId);

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
