import { db } from '$lib/db/client.js';

export const load = async ({ params }) => {
	const title = params.id.split('-').join(' ');

	const { data, error } = await db.from('voitures').select().eq('title', title).single();

	if (error) throw error;

	return {
		data
	};
};
