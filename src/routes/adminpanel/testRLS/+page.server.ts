import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	console.log('User: ', supabase.auth.getUser);
};