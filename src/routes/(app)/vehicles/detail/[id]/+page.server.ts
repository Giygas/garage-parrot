import { db } from '$lib/db/client.js';
import type { DatabaseVoiture } from '$lib/types.js';

export const load = async ({ params }) => {
	const title = params.id.split('-').join(' ');

	const { data, error } = await db.from('voitures').select().eq('title', title).single();

	if (error) throw error;

	const vehicle: DatabaseVoiture = data;

	// Replace the path in the vehicle image for the publicURL
	if (vehicle) {
		vehicle.image = await db.storage.from('vehicles').getPublicUrl(vehicle.image).data.publicUrl;

		const otherImages: string[] = [];
		if (vehicle.other_images) {
			for (const img of vehicle.other_images) {
				const i = await db.storage.from('vehicles').getPublicUrl(img).data.publicUrl;

				otherImages.push(i);
			}

			vehicle.other_images = otherImages;
		}
	}

	return {
		vehicle: data
	};
};
