import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';

// CSP security headers
const securityHeaders = {
	'cross-origin-opener-policy': 'same-origin-allow-popups',
	'referrer-policy': 'strict-origin-when-cross-origin',
	'x-content-type-options': 'nosniff',
	'x-dns-prefetch-control': 'off',
	'x-download-options': 'noopen',
	'x-frame-options': 'DENY',
	'x-xss-protection': '1; mode=block',
	'permissions-policy':
		'accelerometer=(), camera=(), document-domain=(), encrypted-media=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()'
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
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

	// If a non logged in user tries to access adminpanel, redirect to login
	if (event.url.pathname.startsWith('/adminpanel')) {
		const activeUser = (await event.locals.supabase.auth.getUser()).data.user;
		if (!activeUser) {
			// Destroy the session if the user is not logged in
			await event.locals.supabase.auth.signOut();
			redirect(302, '/login');
		}
	}

	const routes = event.url.pathname;

	// Limit the routes that employes can use
	if (
		routes.startsWith('/contact') ||
		routes.startsWith('/employes') ||
		routes.startsWith('/horaires') ||
		routes.startsWith('/services')
	) {
		const activeSession = await event.locals.getSession();
		if (activeSession?.user.user_metadata.admin) {
			redirect(303, '/adminpanel');
		}
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	Object.entries(securityHeaders).forEach(([name, value]) => {
		response.headers.set(name, value);
	});

	return response;
};
