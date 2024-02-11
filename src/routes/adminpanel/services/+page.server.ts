import type { Service } from '$lib/types';
import type { PageServerLoad, Actions } from '../$types';
import { db } from '$lib/db/client';

export const load: PageServerLoad = async () => {
	const { data, error } = await db
		.from('services')
		.select()
		.order('id', { ascending: true })
		.returns<Service[]>();

	if (error) {
		return {
			error: true,
			message: 'An error has ocurred'
		};
	}
	if (data) return { services: data as Service[] };
};

export const actions = {
	updateService: async ({ request }) => {
		const data = await request.formData();

		const services = await db
			.from('services')
			.select()
			.order('id', { ascending: true })
			.returns<Service[]>();
		const serviceData = services.data;

		let id = data.get('serviceId');
		let title = data.get('title');
		let description = data.get('description');

		if (id && title && description) {
			// Type casting so typescript stops saying everything is null
			id = id as string;
			title = title as string;
			description = description as string;
		} else {
			return { error: true, message: 'Des elements manquants', services: serviceData };
		}
		if (id == null || title == '' || description == '') {
			return { error: true, message: 'Des elements manquants', services: serviceData };
		}

		const parsedId: number = parseInt(id);

		console.log(parsedId, title, description);
		const updating = {
			id: parsedId,
			title: title,
			description: description
		};

		console.log(updating);

		const { error } = await db
			.from('services')
			.update({ title: title, description: description })
			.eq('id', id);

		if (error) {
			return {
				error: true,
				message: 'Un problème est survenue lors de la mise a jour des données',
				services: serviceData
			};
		} else {
			return {
				success: true,
				message: 'Service mis á jour correctement',
				services: serviceData
			};
		}
	}
} satisfies Actions;
