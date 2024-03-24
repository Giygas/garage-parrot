import type { DatabaseVoiture } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load = (async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('voitures').select();

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
			const img = supabase.storage.from('vehicles').getPublicUrl(vehicle.image);

			vehicle.image = img.data.publicUrl;
		}
	}

	return { vehicles };
}) satisfies PageServerLoad;
