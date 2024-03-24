import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
	// Check for an active session
	const activeUser = (await supabase.auth.getUser()).data.user;
	if (!activeUser) {
		await supabase.auth.refreshSession();
	}

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
