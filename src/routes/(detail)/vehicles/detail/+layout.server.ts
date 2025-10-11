import type { User, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/db/types';

export const load = async ({
	locals: { getUser, supabase },
	params
}: {
	locals: { getUser: () => Promise<User | null>; supabase: SupabaseClient<Database> };
	params: { id: string };
}) => {
	const { error, data } = await supabase.from('horaires').select();

	const title = params.id?.split('-').join(' ') as string;
	const { data: vehiculeData, error: vehicleError } = await supabase
		.from('voitures')
		.select('id')
		.eq('title', title)
		.single();

	if (vehicleError) {
		return {
			error: true,
			message: vehicleError
		};
	}
	const vehicleId = vehiculeData?.id as string;

	const user: User | null = await getUser();

	if (error) {
		return {
			error: true,
			message: error?.message,
			user
		};
	}

	const weekdays = data;

	return {
		user,
		weekdays: weekdays,
		vehicleId
	};
};
