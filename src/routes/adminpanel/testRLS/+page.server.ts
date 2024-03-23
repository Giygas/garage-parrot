import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// console.log(locals);

	console.log('Session auth: ', await db.auth.getSession());

	const { error } = await db.storage.from('vehicles').upload('vehicles', '$lib/assets/vehicle.png');

	if (error) {
		console.log('Error: ', error);
	}
};
