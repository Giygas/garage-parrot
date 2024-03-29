import type { Service } from '$lib/types';
import type { PageServerLoad, Actions } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (!session?.user.user_metadata.admin) {
		redirect(303, '/adminpanel');
	}

	const { data, error } = await supabase.from('services').select().order('id', { ascending: true });

	if (error) {
		return {
			error: true,
			message: 'An error has ocurred'
		};
	}
	if (data) return { services: data as Service[] };
};

export const actions = {
	updateService: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();

		const services = await supabase
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

		//Clear user input
		title = title.trim();
		description = description.trim();

		if (id == null || title == '' || description == '') {
			return {
				error: true,
				message: 'Des elements manquants',
				services: serviceData
			};
		}

		const { error } = await supabase
			.from('services')
			.update({ title: title, description: description })
			.eq('id', id);

		if (error) {
			return {
				error: true,
				message: 'Un problème est survenue lors de la mise a jour des données',
				services: serviceData as Service[]
			};
		} else {
			const updatedServices = await supabase
				.from('services')
				.select()
				.order('id', { ascending: true })
				.returns<Service[]>();

			return {
				success: true,
				message: 'Service mis á jour correctement',
				services: updatedServices.data as Service[]
			};
		}
	},
	deleteService: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const i = data.get('serviceId') as string;
		if (i) {
			const parsedId = parseInt(i);
			// DELETE FROM SERVICES WHERE services.id = parsedId
			const { error } = await supabase.from('services').delete().eq('id', parsedId);
			const services = await supabase
				.from('services')
				.select()
				.order('id', { ascending: true })
				.returns<Service[]>();
			const serviceData = services.data as Service[];

			if (error) {
				return {
					error: true,
					message: 'Un problème est survenue lors de la eliminaiton du service',
					services: serviceData
				};
			} else {
				return {
					success: true,
					message: 'Service effacé !',
					services: serviceData
				};
			}
		}
	},
	newService: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();

		let title = data.get('title') as string;
		let description = data.get('description') as string;

		title = title.trim();
		description = description.trim();

		if (title === '' || description === '') {
			return {
				error: true,
				message: 'Des elements manquants'
			};
		} else {
			//INSERT INTO SERVICES(title, description) VALUES (thisElement title, thisElement description)
			const { error } = await supabase
				.from('services')
				.insert({ title: title, description: description });

			if (error) {
				return {
					error: true,
					message: error.message
				};
			} else {
				return {
					success: true,
					message: 'Le service est ajouté correctement'
				};
			}
		}
	}
} satisfies Actions;
