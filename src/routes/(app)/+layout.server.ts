import { db } from '$lib/db/client';
export const load = async ({ locals: { getSession } }) => {
	const { error, data } = await db.from('horaires').select();

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
