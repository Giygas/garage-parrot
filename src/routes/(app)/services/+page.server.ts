import type { Service } from '$lib/types';
import type { PageServerLoad } from '../$types';
import { db } from '$lib/db/client';

export const load: PageServerLoad = async () => {
	const services = await db
		.from('services')
		.select()
		.order('id', { ascending: true })
		.returns<Service[]>();
	const serviceData = services.data as Service[];
	return {
		services: serviceData
	};
};
