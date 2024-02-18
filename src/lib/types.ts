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

export type userData = {
	prenom: string;
	nom: string;
	email: string;
	telephone: string;
	message: string;
	[key: string]: string;
};

import type { Database } from '$lib/db/types';
export type DatabaseReview = Database['public']['Tables']['temoignages']['Row'];
export type DatabaseContact = Database['public']['Tables']['contacts']['Row'];
export type DatabaseVoiture = Database['public']['Tables']['voitures']['Row'];
// export type DatabaseUser = Database['public']['Views']['users']['Row'];

export type DatabaseUser = {
	created_at: string;
	deleted_at: string | null;
	email: string;
	id: string;
	last_sing_in_at: string | null;
	name: string;
};
