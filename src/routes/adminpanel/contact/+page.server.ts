import { db } from '$lib/db/client';
import type { DatabaseContact } from '$lib/types';
import type { PageServerLoad } from './$types';

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
