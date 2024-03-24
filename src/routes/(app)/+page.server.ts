import type { ReviewType } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data } = await supabase
		.from('temoignages')
		.select(`name, rating, message`)
		.eq('approved', true)
		.order('created_at', { ascending: false })
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
