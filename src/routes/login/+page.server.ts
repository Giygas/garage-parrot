// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../adminpanel/$types';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		if (!email || !password) {
			return fail(400, {
				email,
				incomplete: true,
				message: 'Identifiants manquants'
			});
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			if (error.message === 'Invalid login credentials') {
				return { message: 'Mauvais identifiants de connexion', wrongId: true, email };
			} else {
				return {
					message: 'Une error est survenue lors de la connexion avec la base de donées',
					wrongId: true,
					email
				};
			}
		}

		const profile = await supabase
			.from('profiles')
			.select('role_type')
			.eq('id', data.user.id)
			.single();
		// Add the role type in the public database to the user created by authentication
		if (profile.data) {
			data.user.user_metadata.role_type = profile.data.role_type;
		}

		return {
			message: 'All good',
			success: true
		};
	}
};

export const load: PageServerLoad = async ({ cookies, locals: { supabase } }) => {
	const rows = await supabase.from('profiles').select();
	if (rows.data?.length == 0) {
		cookies.set('firstTime', 'true', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60
		});
		redirect(303, '/create-admin');
	}
};
