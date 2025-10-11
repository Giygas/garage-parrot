import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getUser, supabase } }) => {
	const user = await getUser();
	console.log(user);

	if (!user?.user_metadata.admin) {
		redirect(303, '/adminpanel');
	}

	const session = user ? await supabase.auth.getSession().then((res) => res.data.session) : null;
	return {
		session
	};
};
