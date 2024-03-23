import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			/**
			 * Note: You have to add the `path` variable to the
			 * set and remove method due to sveltekit's cookie API
			 * requiring this to be set, setting the path to an empty string
			 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
			 */
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
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

	if (event.url.pathname.endsWith('/login')) {
		// Set the cookie for the first time the admin tries to log in
		if (event.cookies.get('firstTime')) {
			redirect(302, '/create-admin');
		}

		// If the user tries to log in while he's already logged in, redirect to the admin panel
		if (await event.locals.getSession()) {
			redirect(302, '/adminpanel');
		} else if (event.url.pathname !== '/login') {
			redirect(302, '/login');
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

	const routes = event.url.pathname;

	if (
		routes.startsWith('/contact') ||
		routes.startsWith('/employes') ||
		routes.startsWith('/horaires') ||
		routes.startsWith('/horaires')
	) {
		const activeSession = await event.locals.getSession();
		if (activeSession?.user.user_metadata.admin) {
			redirect(303, '/adminpanel');
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
