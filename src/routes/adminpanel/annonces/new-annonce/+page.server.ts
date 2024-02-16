import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, setError, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { vehicleSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(vehicleSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(vehicleSchema));

		// Server side the kilometrage because it can be 0, but is hard to do it client side with zod as validator. Same with the first image of the vehicle
		const kilometrage = formData.get('kilometrage');
		if (kilometrage == '') {
			return setError(form, 'kilometrage', 'Le kilométrage est obligatoire');
		}

		const imagePrincipal = formData.get('imagePrincipal');

		// Validate image
		if (imagePrincipal instanceof File) {
			if (imagePrincipal.size == 0) {
				return setError(form, 'imagePrincipal', "L'image principal est obligatoire");
			}
		}

		const otherImages = formData.getAll('otherImages');

		if (otherImages.every((x) => x instanceof File)) {
			const files = otherImages as File[];
			if (files.length > 9) {
				return setError(
					form,
					'otherImages._errors',
					'Vous pouvez ajouter au max 9 images supplementaires'
				);
			}
		}

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		// TODO: Do something with the image

		return message(form, 'Vehicule enregistré !');
	}
};
