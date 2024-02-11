export class Service {
	id: number;
	title: string;
	description: string[];

	constructor(id: number, t: string, d: string[]) {
		this.id = id;
		this.title = t;
		this.description = d;
	}

	update(file: JSON) {
		console.log(file);
	}
}
