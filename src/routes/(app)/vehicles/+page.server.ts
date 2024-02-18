import { db } from '$lib/db/client';
import type { DatabaseVoiture } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load = (async () => {
	const { data, error } = await db.from('voitures').select();

	if (error) {
		return {
			error: true,
			message: error.message
		};
	}

	const vehicles = data as DatabaseVoiture[];

	// Replace the path in the vehicle image for the publicURL
	if (vehicles) {
		for (const vehicle of vehicles) {
			const img = await db.storage.from('vehicles').getPublicUrl(vehicle.image);

			vehicle.image = img.data.publicUrl;
		}
	}

	return { vehicles };
}) satisfies PageServerLoad;
