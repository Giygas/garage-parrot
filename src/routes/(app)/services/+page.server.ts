import type { Service } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const services = await supabase
		.from('services')
		.select()
		.order('id', { ascending: true })
		.returns<Service[]>();
	const serviceData = services.data as Service[];
	return {
		services: serviceData
	};
};
