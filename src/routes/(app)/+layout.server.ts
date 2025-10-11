import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getUser, supabase } }) => {
	// Check for an active session
	const activeUser = await getUser();
	if (!activeUser) {
		await supabase.auth.refreshSession();
	}

	const { error, data } = await supabase.from('horaires').select();

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
		weekdays: weekdays
	};
};
