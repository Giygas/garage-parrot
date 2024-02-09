import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types.js';
import { adminAuthClient } from '$lib/db/adminClient.js';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(300, '/login');
	}

	return { session };
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!name || !email || !password) {
			return fail(400, {
				name,
				email,
				incomplete: true,
				error: true,
				message: 'Tous les champs sont obligatoires'
			});
		}

		if (password.length < 6) {
			return fail(400, {
				name,
				email,
				error: true,
				message: 'Le mot de passe doit avoir au moins 6 caractères'
			});
		}
		const session = await locals.getSession();
		if (session?.user.user_metadata.admin) {
			const adminAuth = adminAuthClient;
			// use admin credentials for creating the user, so the session don't get lost
			const { error } = await adminAuth.createUser({
				email: email,
				password: password,
				user_metadata: {
					name: name
				},
				email_confirm: true
			});
			if (error) {
				if (error.status === 422) {
					return fail(400, {
						name,
						email,
						error: true,
						message: 'Cet email existe déjà dans la base de données'
					});
				} else {
					return fail(400, {
						name,
						email,
						error: true,
						message: "Une error est survenue lors de la création de l'utilisateur"
					});
				}
			} else {
				return {
					success: true
				};
			}
		} else {
			// If the use is not admin, redirect to not authorized page
			throw redirect(300, '/not-authorized');
		}
	}
};
