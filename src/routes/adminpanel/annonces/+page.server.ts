import { db } from '$lib/db/client';
import type { DatabaseVoiture } from '$lib/types';

export const load = async () => {
	const { data, error } = await db.from('voitures').select();

	if (error) {
		return {
			error: true,
			message: 'Database Error'
		};
	}

	const vehicles: DatabaseVoiture[] = data;

	// Will use the uuid of the vehicule for the array index
	const images: { [key: string]: string } = {};

	for (const vehicle of vehicles) {
		const img = db.storage.from('vehicles').getPublicUrl(vehicle.image);

		images[vehicle.id] = img.data.publicUrl;
	}

	return {
		status: 200,
		vehicles,
		images
	};
};
