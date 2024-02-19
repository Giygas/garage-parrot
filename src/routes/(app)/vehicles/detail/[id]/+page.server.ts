import { db } from '$lib/db/client.js';
import type { DatabaseVoiture } from '$lib/types.js';

export const load = async ({ params }) => {
	const title = params.id.split('-').join(' ');

	const { data, error } = await db.from('voitures').select().eq('title', title).single();

	if (error) throw error;

	const vehicle: DatabaseVoiture = data;

	// Replace the path in the vehicle image for the publicURL
	if (vehicle) {
		const pURL = db.storage.from('vehicles').getPublicUrl(vehicle.image);
		vehicle.image = pURL.data.publicUrl;

		const otherImages: string[] = [];
		if (vehicle.other_images) {
			for (const img of vehicle.other_images) {
				const query = db.storage.from('vehicles').getPublicUrl(img);
				const i = query.data.publicUrl;

				otherImages.push(i);
			}

			vehicle.other_images = otherImages;
		}
	}

	return {
		vehicle: data
	};
};
