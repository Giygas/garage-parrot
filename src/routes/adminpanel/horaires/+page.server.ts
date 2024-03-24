import type { Weekday } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (!session?.user.user_metadata.admin) {
		redirect(303, '/adminpanel');
	}

	const { data, error } = await supabase.from('horaires').select().order('id', { ascending: true });

	if (error) {
		return {
			error: true,
			message: error.message
		};
	}

	if (data) {
		return {
			weekdays: data as Weekday[]
		};
	}
};

export const actions = {
	updateHours: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();

		const days = data.entries();
		// Parse each entry to update the database
		for (const day of days) {
			console.log(day);
			const id = parseInt(day[0]);
			const hours = day[1].toString();
			// UPDATE HORAIRES SET (horaires.)HOURS = (this.)HOURS WHERE (horaires.)ID = (this.)ID
			const { error } = await supabase.from('horaires').update({ hours: hours }).eq('id', id);
			console.log(error);

			if (error) {
				return {
					error: true,
					message: error.message
				};
			}
		}

		return {
			success: true,
			message: "Les heures d'ouverture ont été modifiées avec succès"
		};
	}
} satisfies Actions;
