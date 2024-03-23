import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	console.log('Session user: ', session?.user);

	const { error } = await db.storage.from('vehicles').upload('vehicles', '$lib/assets/vehicle.png');

	if (error) {
		console.log('Error: ', error);
	}
};
