import type { Service } from '$lib/types';
import jsonServices from '$lib/db/services.json';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	return {
		services: jsonServices as Service[]
	};
};
