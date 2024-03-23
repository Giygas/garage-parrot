import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
	const { error, data } = await supabase.from('horaires').select();

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
		weekdays: weekdays
	};
};
