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
