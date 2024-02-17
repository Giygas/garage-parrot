import { db } from '$lib/db/client';
import type { QueryData } from '@supabase/supabase-js';

export const load = async () => {
	const query = db
		.from('voitures')
		.select(
			`id, title, price, year, kilometrage, image, engine, traction, power, doors, seats, options, other_images, created_at, created_by, voitures_transmission (description) `
		)
		.order('created_at');
	type vehiclesWithTransmission = QueryData<typeof query>;

	const { data, error } = await query;

	if (error) throw error;

	const vehicles: vehiclesWithTransmission = data;

	// Will use the uuid of the vehicule for the array index
	const images: { [key: string]: string } = {};

	for (const vehicle of vehicles) {
		const img = db.storage
			.from('vehicles')
			.getPublicUrl(vehicle.image, { transform: { height: 280, width: 350 } });

		images[vehicle.id] = img.data.publicUrl;
	}

	return {
		status: 200,
		vehicles,
		images
	};
};
