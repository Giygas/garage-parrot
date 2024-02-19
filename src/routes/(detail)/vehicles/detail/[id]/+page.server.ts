import { db } from '$lib/db/client.js';
import type { DatabaseVoiture } from '$lib/types.js';

export const load = async ({ params, locals: { getSession } }) => {
	const { error: horairesError, data } = await db.from('horaires').select();

	if (horairesError) {
		return {
			error: true,
			message: horairesError?.message,
			session: await getSession()
		};
	}

	const weekdays = data;

	const title = params.id.split('-').join(' ');

	const { data: vehicleData, error } = await db
		.from('voitures')
		.select()
		.eq('title', title)
		.single();

	if (error) throw error;

	const vehicle: DatabaseVoiture = vehicleData;

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
		weekdays: weekdays,
		vehicle: vehicleData,
		session: await getSession()
	};
};
