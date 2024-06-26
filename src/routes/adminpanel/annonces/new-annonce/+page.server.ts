import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, setError, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { vehicleSchema } from '$lib/schemas';
import { imageToWebp } from '$lib/sharp';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(vehicleSchema));

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const db = locals.supabase;
		const formData = await request.formData();
		const form = await superValidate(formData, zod(vehicleSchema));

		const fields = form.data;

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
				console.log('Max images');
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
		if (!session) {
			redirect(300, '/login');
		}

		const uuid = crypto.randomUUID();

		// Optimize image before uploading
		const principalOpt = await imageToWebp(form.data.imagePrincipal);

		const { data: imgData, error } = await db.storage
			.from('vehicles')
			.upload(uuid + '/' + uuid, principalOpt, { contentType: 'image/webp' });

		if (error) {
			console.log(error);
			return setError(form, 'Problème avec la base de données' + error);
		}

		const baseImgPath = imgData.path.split('/')[0];
		const arrayImages = [];

		for (const img of otherImages) {
			if (img instanceof File) {
				if (img.size == 0) break;
				const uuid = crypto.randomUUID();

				const path = baseImgPath + '/' + uuid;

				// Optimize the image
				const optImg = await imageToWebp(img);

				const { error } = await db.storage
					.from('vehicles')
					.upload(path, optImg, { contentType: 'image/webp' });

				if (error) {
					console.log(error);
					return setError(form, 'Problème avec la base de données' + error);
				}

				arrayImages.push(path);
			}
		}

		let options: string[];
		if (fields.options) {
			options = fields.options.split(',');
		} else {
			options = [];
		}

		// Verify if the title exists already
		const { data: titleData } = await db
			.from('voitures')
			.select('title')
			.eq('title', fields.title)
			.single();

		if (titleData) {
			fields.title = fields.title + ' ' + Date.now();
		}

		const { error: insertError } = await db.from('voitures').insert({
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
			created_by: session.user.id
		});

		if (insertError) {
			console.log(insertError);
			return setError(form, 'Problème avec la base de données' + error);
		}

		return message(form, 'Annonce créée avec succès');
	}
};
