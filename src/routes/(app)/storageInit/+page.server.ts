import vehicle11 from '$lib/assets/vehicles/1/1.webp';
import vehicle12 from '$lib/assets/vehicles/1/2.webp';
import vehicle13 from '$lib/assets/vehicles/1/3.webp';
import vehicle14 from '$lib/assets/vehicles/1/4.webp';
import vehicle15 from '$lib/assets/vehicles/1/5.webp';

import vehicle21 from '$lib/assets/vehicles/2/1.jpg';
import vehicle22 from '$lib/assets/vehicles/2/2.jpg';
import vehicle23 from '$lib/assets/vehicles/2/3.jpg';
import vehicle24 from '$lib/assets/vehicles/2/4.jpg';
import vehicle25 from '$lib/assets/vehicles/2/5.jpg';
import vehicle26 from '$lib/assets/vehicles/2/6.jpg';

import vehicle31 from '$lib/assets/vehicles/3/1.webp';
import vehicle32 from '$lib/assets/vehicles/3/2.webp';
import vehicle33 from '$lib/assets/vehicles/3/3.webp';
import vehicle34 from '$lib/assets/vehicles/3/4.webp';
import vehicle35 from '$lib/assets/vehicles/3/5.webp';
import vehicle36 from '$lib/assets/vehicles/3/6.webp';

import { db } from '$lib/db/client';

async function uploadImg(fetchResponse: Response, serverName: string, type: string) {
	const data = await fetchResponse.blob();
	const metadata = {
		type: type
	};

	const file = new File([data], serverName, metadata);

	const { error } = await db.storage.from('vehicles').upload(serverName, file);

	if (error) {
		console.log(error);
	} else {
		console.log('Image: ' + serverName + ' uploaded');
	}
}

export const load = async ({ fetch, locals }) => {
	const session = await locals.getSession();
	if (session) {
		//Generate the uuid for the image principal
		const uuid1 = crypto.randomUUID();
		const uuid2 = crypto.randomUUID();
		const uuid3 = crypto.randomUUID();

		//Save the first image in the bucket
		let response = await fetch(vehicle11);
		await uploadImg(response, uuid1 + '/' + uuid1, 'image/webp');

		//Initialize the array of other images and push into it
		const otherImages1: string[] = [];

		//Current image uuid
		let uuid = crypto.randomUUID();

		response = await fetch(vehicle12);
		await uploadImg(response, uuid1 + '/' + uuid, 'image/webp');
		otherImages1.push(uuid1 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle13);
		await uploadImg(response, uuid1 + '/' + uuid, 'image/webp');
		otherImages1.push(uuid1 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle13);
		await uploadImg(response, uuid1 + '/' + uuid, 'image/webp');
		otherImages1.push(uuid1 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle14);
		await uploadImg(response, uuid1 + '/' + uuid, 'image/webp');
		otherImages1.push(uuid1 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle15);
		await uploadImg(response, uuid1 + '/' + uuid, 'image/webp');
		otherImages1.push(uuid1 + '/' + uuid);

		const { error: dbError } = await db.from('voitures').insert({
			title: 'Ford Fiesta 1.6 TDCi Econetic*1ER MAIN*CLIM*CARNET*GARANTIE',
			year: 2009,
			doors: 5,
			seats: 5,
			power: 90,
			kilometrage: 132000,
			engine: 'Diesel',
			traction: 'Arrière',
			image: uuid1 + '/' + uuid1,
			other_images: otherImages1,
			price: 4650,
			transmission: 1,
			created_by: session.user.id
		});

		if (dbError) throw dbError;

		//Save the first image in the bucket
		response = await fetch(vehicle21);
		await uploadImg(response, uuid2 + '/' + uuid2, 'image/webp');

		//Initialize the array of other images and push into it
		const otherImages2: string[] = [];

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle22);
		await uploadImg(response, uuid2 + '/' + uuid, 'image/webp');
		otherImages2.push(uuid2 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle23);
		await uploadImg(response, uuid2 + '/' + uuid, 'image/webp');
		otherImages2.push(uuid2 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle24);
		await uploadImg(response, uuid2 + '/' + uuid, 'image/webp');
		otherImages2.push(uuid2 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle25);
		await uploadImg(response, uuid2 + '/' + uuid, 'image/webp');
		otherImages2.push(uuid2 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle26);
		await uploadImg(response, uuid2 + '/' + uuid, 'image/webp');
		otherImages2.push(uuid2 + '/' + uuid);

		const { error: dbError2 } = await db.from('voitures').insert({
			title: 'MAZDA CX5 AWD',
			year: 2017,
			doors: 5,
			seats: 5,
			power: 125,
			engine: 'Essence',
			traction: 'Avant',
			kilometrage: 58000,
			image: uuid2 + '/' + uuid2,
			other_images: otherImages2,
			price: 12500,
			transmission: 2,
			created_by: session.user.id,
			options: ['Ecran Multimédia', 'Cámera de recule', 'Volant Multifonction']
		});

		if (dbError2) throw dbError2;

		//Save the first image in the bucket
		response = await fetch(vehicle31);
		await uploadImg(response, uuid3 + '/' + uuid3, 'image/webp');

		//Initialize the array of other images and push into it
		const otherImages3: string[] = [];

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle32);
		await uploadImg(response, uuid3 + '/' + uuid, 'image/webp');
		otherImages3.push(uuid3 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle33);
		await uploadImg(response, uuid3 + '/' + uuid, 'image/webp');
		otherImages3.push(uuid3 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle34);
		await uploadImg(response, uuid3 + '/' + uuid, 'image/webp');
		otherImages3.push(uuid3 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle35);
		await uploadImg(response, uuid3 + '/' + uuid, 'image/webp');
		otherImages3.push(uuid3 + '/' + uuid);

		//Current image uuid
		uuid = crypto.randomUUID();

		response = await fetch(vehicle36);
		await uploadImg(response, uuid3 + '/' + uuid, 'image/webp');
		otherImages3.push(uuid3 + '/' + uuid);

		const { error: dbError3 } = await db.from('voitures').insert({
			title: 'MercedesBenz C 250d Coupe 9GTRONIC AMG Line',
			year: 2016,
			doors: 5,
			seats: 5,
			power: 204,
			engine: 'Essence',
			traction: 'Avant',
			kilometrage: 69000,
			image: uuid3 + '/' + uuid3,
			other_images: otherImages3,
			price: 25300,
			transmission: 1,
			created_by: session.user.id,
			options: [
				"Caméra d'aide au stationnement",
				"Capteurs d'aide au stationnement arrière",
				"Capteurs d'aide au stationnement avant",
				'Climatisation',
				'Climatisation automatique',
				'Sièges électriques',
				'Start/Stop automatique',
				'Suspension pneumatique'
			]
		});

		if (dbError3) throw dbError3;
	}
};
