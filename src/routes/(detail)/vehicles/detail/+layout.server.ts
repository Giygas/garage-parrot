export const load = async ({ locals: { getUser, supabase }, params }) => {
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

	const user = await getUser();
	const session = user ? await supabase.auth.getSession().then((res) => res.data.session) : null;

	if (error) {
		return {
			error: true,
			message: error?.message,
			session
		};
	}

	const weekdays = data;

	return {
		session,
		weekdays: weekdays,
		vehicleId
	};
};
