import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	if (event.url.pathname.startsWith('/login')) {
		// Set the cookie for the first time the admin tries to log in
		if (event.cookies.get('firstTime')) {
			redirect(302, '/create-admin');
		}

		// If the user tries to log in while he's already logged in, redirect to the admin panel
		if (await event.locals.getSession()) {
			redirect(302, '/adminpanel');
		}
	}

	if (event.url.pathname.includes('create-admin') && !event.cookies.get('firstTime')) {
		redirect(302, '/');
	}

	if (event.url.pathname.startsWith('/adminpanel')) {
		const activeSession = await event.locals.getSession();
		if (!activeSession) {
			redirect(302, '/');
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
