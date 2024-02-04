// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db/client';
import type { PageServerLoad } from '../adminpanel/$types';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
};

export const load: PageServerLoad = async () => {
	const rows = await db.from('employees').select();
	if (rows.data?.length == 0) {
		redirect(303, 'adminpanel/create-user');
	}
};
