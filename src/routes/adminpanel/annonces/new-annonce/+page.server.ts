import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, setError, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { vehicleSchema } from '$lib/schemas';
import { db } from '$lib/db/client';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(vehicleSchema));

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(vehicleSchema));

		const fields = form.data;

		// Server side the kilometrage because it can be 0, but is hard to do it client side with zod as validator. Same with the first image of the vehicle
		const kilometrage = formData.get('kilometrage');
		if (kilometrage == '') {
			setError(form, 'kilometrage', 'Le kilométrage est obligatoire');
		}

		const imagePrincipal = formData.get('imagePrincipal');

		// Validate image
		if (imagePrincipal instanceof File) {
			if (imagePrincipal.size == 0) {
				setError(form, 'imagePrincipal', "L'image principal est obligatoire");
			}
		}

		const otherImages = formData.getAll('otherImages');

		if (otherImages.every((x) => x instanceof File)) {
			const files = otherImages as File[];
			if (files.length > 9) {
				setError(
					form,
					'otherImages._errors',
					'Vous pouvez ajouter au max 9 images supplementaires'
				);
			}
		}

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const session = await locals.getSession();
		console.log(session);

		// TODO: Save image to bucket, then save the link to supabase

		const uuid = crypto.randomUUID();

		const { data: imgData, error } = await db.storage
			.from('vehicles')
			.upload(uuid + '/' + uuid, form.data.imagePrincipal);

		if (error) {
			return setError(form, 'Problème avec la base de données' + error);
		}

		const baseImgPath = imgData.path.split('/')[0];
		const arrayImages = [];
		console.log(baseImgPath);

		for (const img of otherImages) {
			if (img instanceof File) {
				if (img.size == 0) break;
				const uuid = crypto.randomUUID();

				const path = baseImgPath + '/' + uuid;

				const { error } = await db.storage.from('vehicles').upload(path, img);

				if (error) {
					console.log(error);
					return setError(form, 'Problème avec la base de données' + error);
				}

				arrayImages.push(path);
			}
		}
		//TODO: split the options
		let options: string[];
		if (fields.options) {
			options = fields.options.split(',');
		} else {
			options = [];
		}

		const { error: insertError } = await db.from('voitures').insert({
			//@ts-expect-error: don't know why it says price doesnt exists
			title: fields.title,
			price: fields.price,
			year: fields.year,
			kilometrage: fields.kilometrage,
			image: imgData.path,
			engine: fields.engine,
			traction: fields.traction,
			power: fields.power,
			doors: fields.doors,
			seats: fields.seats,
			transmission: fields.transmission,
			options: options,
			other_images: arrayImages,
			created_by: session?.user.id
		});

		if (insertError) {
			console.log(insertError);
			return setError(form, 'Problème avec la base de données' + error);
		}

		return message(form, 'Vehicule enregistré !');
	}
};
