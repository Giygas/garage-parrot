import { db } from '$lib/db/client';
import type { ReviewType } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data } = await db
		.from('temoignages')
		.select(`name, rating, message`)
		.returns<ReviewType>();

	let reviewData: ReviewType;

	if (data) {
		reviewData = data as ReviewType;
	} else {
		reviewData = {
			name: 'Not working',
			rating: 5,
			message: 'having some technical problems right now'
		};
	}

	return { revs: reviewData };
};
