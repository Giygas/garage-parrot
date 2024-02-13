import { db } from '$lib/db/client';
import type { Weekday } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

export const load = async () => {
	const { data, error } = await db.from('horaires').select().order('id', { ascending: true });

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
	updateHours: async ({ request }) => {
		const data = await request.formData();

		const days = data.entries();
		// Parse each entry to update the database
		for (const day of days) {
			const id = parseInt(day[0]);
			const hours = day[1].toString();
			// UPDATE HORAIRES SET (horaires.)HOURS = (this.)HOURS WHERE (horaires.)ID = (this.)ID
			const { error } = await db.from('horaires').update({ hours: hours }).eq('id', id);

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
