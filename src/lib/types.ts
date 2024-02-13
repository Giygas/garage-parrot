export type Weekday = {
	day: string;
	hours: string;
	id: number;
};

export interface ReviewType {
	name: string;
	rating: number;
	message: string;
}

export type Message = {
	success: boolean;
	message: string;
};

export interface Service {
	id: number;
	title: string;
	description: string;
}

import type { Database } from '$lib/db/types';
export type DatabaseReview = Database['public']['Tables']['temoignages']['Row'];
