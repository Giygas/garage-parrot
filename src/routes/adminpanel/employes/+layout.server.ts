import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session?.user.user_metadata.admin) {
		redirect(303, '/adminpanel');
	}
	return {
		session: await getSession()
	};
};
