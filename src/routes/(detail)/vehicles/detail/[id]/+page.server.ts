import type { DatabaseVoiture } from '$lib/types.js';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/db/types';

export const load = async ({
	params,
	locals: { getUser, supabase }
}: {
	params: { id: string };
	locals: { getUser: () => Promise<User | null>; supabase: SupabaseClient<Database> };
}) => {
	const { error: horairesError, data } = await supabase.from('horaires').select();

	const user: User | null = await getUser();

	if (horairesError) {
		return {
			error: true,
			message: horairesError?.message,
			user
		};
	}

	const weekdays = data;

	const title = params.id.split('-').join(' ');

	const { data: vehicleData, error } = await supabase
		.from('voitures')
		.select()
		.eq('title', title)
		.single();

	if (error) throw error;

	const vehicle: DatabaseVoiture = vehicleData;

	// Replace the path in the vehicle image for the publicURL
	if (vehicle) {
		const pURL = supabase.storage.from('vehicles').getPublicUrl(vehicle.image);
		vehicle.image = pURL.data.publicUrl;

		const otherImages: string[] = [];
		if (vehicle.other_images) {
			for (const img of vehicle.other_images) {
				const query = supabase.storage.from('vehicles').getPublicUrl(img);
				const i = query.data.publicUrl;

				otherImages.push(i);
			}

			vehicle.other_images = otherImages;
		}
	}

	return {
		weekdays: weekdays,
		vehicle: vehicleData,
		user
	};
};
