import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals: { getUser, supabase } }) => {
	const user = await getUser();

	if (!user) {
		throw redirect(300, '/login');
	}

	const session = await supabase.auth.getSession().then((res: any) => res.data.session);
	return { session };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getUser } }) => {
		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, {
				error: true,
				message: 'Tous les champs sont obligatoires'
			});
		}

		if (newPassword.length < 6) {
			return fail(400, {
				error: true,
				message: 'Le nouveau mot de passe doit avoir au moins 6 caractères'
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				error: true,
				message: 'Les nouveaux mots de passe ne correspondent pas'
			});
		}

		const user = await getUser();
		if (!user || !user.email) {
			return fail(400, {
				error: true,
				message: 'Utilisateur non trouvé'
			});
		}

		// Verify current password by attempting to sign in
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: currentPassword
		});

		if (signInError) {
			return fail(400, {
				error: true,
				message: 'Le mot de passe actuel est incorrect'
			});
		}

		// Update the password
		const { error: updateError } = await supabase.auth.updateUser({
			password: newPassword
		});

		if (updateError) {
			return fail(400, {
				error: true,
				message: 'Une erreur est survenue lors de la mise à jour du mot de passe'
			});
		}

		return {
			success: true,
			message: 'Mot de passe mis à jour avec succès'
		};
	}
};
