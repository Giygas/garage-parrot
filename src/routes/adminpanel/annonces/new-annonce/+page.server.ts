import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { vehicleSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(vehicleSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(vehicleSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		// TODO: Do something with the image

		return withFiles({ form });
	}
};
