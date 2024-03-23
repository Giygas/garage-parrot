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
	for (const vehicle of vehicles) {
		const img = db.storage.from('vehicles').getPublicUrl(vehicle.image);

		vehicle.image = img.data.publicUrl;
	}

	return {
		status: 200,
		vehicles
	};
};

export const actions = {
	deleteAnnonce: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id')?.toString();
		if (id) {
			const { data, error } = await db
				.from('voitures')
				.delete()
				.eq('id', id)
				.select('image')
				.single();

			if (error) throw error;

			const { error: imageError } = await db.storage.from('vehicles').remove([data.image]);

			if (imageError) throw imageError;
		}

		return { succes: true, message: 'Vehicule effacé !' };
	}
};
