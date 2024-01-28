export interface Weekdays {
	lundi: string;
	mardi: string;
	mercredi: string;
	jeudi: string;
	vendredi: string;
	samedi: string;
	dimanche: string;
	[key: string]: string;
}

export interface ReviewType {
	name: string;
	rating: number;
	message: string;
}

export type Message = {
	success: boolean;
	message: string;
};
