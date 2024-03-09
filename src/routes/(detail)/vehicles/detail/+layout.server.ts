import { db } from '$lib/db/client';
export const load = async ({ locals: { getSession }, params }) => {
	const { error, data } = await db.from('horaires').select();

	const title = params.id?.split('-').join(' ') as string;
	const { data: vehiculeData, error: vehicleError } = await db
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

	if (error) {
		return {
			error: true,
			message: error?.message,
			session: await getSession()
		};
	}

	const weekdays = data;

	return {
		session: await getSession(),
		weekdays: weekdays,
		vehicleId
	};
};
