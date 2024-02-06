import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies, locals }) => {
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

		const { error } = await locals.supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					name: name
				}
			}
		});

		if (error) {
			return fail(400, {
				name,
				email,
				error: true,
				message: "Une error est survenue lors de la création de l'utilisateur"
			});
		}

		cookies.delete('firstTime', { path: '/' });
		redirect(302, '/login?success=true');
	}
};
