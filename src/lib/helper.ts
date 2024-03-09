export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// export async function uploadImg(path: string, serverName: string, type: string) {
// 	const response = await fetch(path);
// 	console.log(response);
// 	const data = await response.blob();
// 	const metadata = {
// 		type: type
// 	};

// 	const file = new File([data], serverName, metadata);
// 	console.log(file);

// 	const { error } = await db.storage.from('vehicles').upload(serverName, path);

// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log('success');
// 	}
// }
// // async function createFile(path: string, name: string, type: string): Promise<File> {
// // 	const response = await fetch(path);
// // 	const data = await response.blob();
// // 	console.log(data);
// // 	const metadata = {
// // 		type: type
// // 	};
// // 	return new File([data], name, metadata);
// // }

// export async function storageInit() {
// 	try {
// 		// I'll need to use static paths
// 		// const folder1 = '$lib/assets/vehicles';
// 		// const folder2 = '%sveltekit.assets%/vehicles/2';
// 		// const folder3 = '%sveltekit.assets%/vehicles/3';

// 		const uuid1 = crypto.randomUUID();
// 		// const uuid2 = crypto.randomUUID();
// 		// const uuid3 = crypto.randomUUID();

// 		console.log(vehicle);

// 		const { error: error1 } = await db.storage
// 			.from('vehicles')
// 			.upload(uuid1 + '/' + uuid1, vehicle);

// 		if (error1) console.log(error1);

// 		// const otherImages1: string[] = [];
// 		// for (let index = 2; index <= 5; index++) {
// 		// 	const uuid = crypto.randomUUID();
// 		// 	const { error } = await db.storage
// 		// 		.from('vehicles')
// 		// 		.upload(uuid1 + '/' + uuid, folder1 + index + '.webp', {});

// 		// 	if (error) throw error;
// 		// 	otherImages1.push(uuid1 + '/' + uuid);
// 		// }

// 		// const { error: dbError } = await db.from('voitures').insert({
// 		// 	title: 'Ford Fiesta 1.6 TDCi Econetic*1ER MAIN*CLIM*CARNET*GARANTIE',
// 		// 	year: 2009,
// 		// 	doors: 5,
// 		// 	seats: 5,
// 		// 	power: 90,
// 		// 	kilometrage: 132000,
// 		// 	image: uuid1,
// 		// 	other_images: otherImages1,
// 		// 	price: 4650,
// 		// 	transmission: 1,
// 		// 	created_by: '1'
// 		// });

// 		// if (dbError) throw dbError;

// 		// const { error: error2 } = await db.storage
// 		// 	.from('vehicles')
// 		// 	.upload(uuid2 + '/' + uuid2, folder2 + '1.jpg');

// 		// if (error2) throw error2;

// 		// const otherImages2: string[] = [];
// 		// for (let index = 2; index <= 6; index++) {
// 		// 	const uuid = crypto.randomUUID();
// 		// 	const { error } = await db.storage
// 		// 		.from('vehicles')
// 		// 		.upload(uuid2 + '/' + uuid, folder2 + index + '.jpg');

// 		// 	if (error) throw error;
// 		// 	otherImages2.push(uuid1 + '/' + uuid);
// 		// }

// 		// const { error: dbError2 } = await db.from('voitures').insert({
// 		// 	title: 'MAZDA CX5 phase 2 2.2 SKYACTIVD 150 DYNAMIQUE',
// 		// 	year: 2017,
// 		// 	doors: 5,
// 		// 	seats: 5,
// 		// 	power: 150,
// 		// 	kilometrage: 56245,
// 		// 	image: uuid2,
// 		// 	other_images: otherImages1,
// 		// 	price: 7500,
// 		// 	transmission: 2,
// 		// 	created_by: '1'
// 		// });

// 		// if (dbError2) throw dbError2;

// 		// const { error: error3 } = await db.storage
// 		// 	.from('vehicles')
// 		// 	.upload(uuid3 + '/' + uuid3, folder3 + '1.webp');

// 		// if (error3) throw error3;

// 		// const otherImages3: string[] = [];
// 		// for (let index = 2; index <= 6; index++) {
// 		// 	const uuid = crypto.randomUUID();
// 		// 	const { error } = await db.storage
// 		// 		.from('vehicles')
// 		// 		.upload(uuid3 + '/' + uuid, folder3 + index + '.webp');

// 		// 	if (error) throw error;
// 		// 	otherImages3.push(uuid3 + '/' + uuid);
// 		// }

// 		// const { error: dbError3 } = await db.from('voitures').insert({
// 		// 	title: 'Mercedes Benz C 250 d Coupe 9GTRONIC AMG Line',
// 		// 	year: 2020,
// 		// 	doors: 2,
// 		// 	seats: 4,
// 		// 	power: 204,
// 		// 	engine: 'Diesel',
// 		// 	kilometrage: 132000,
// 		// 	image: uuid3,
// 		// 	other_images: otherImages3,
// 		// 	price: 25995,
// 		// 	transmission: 2,
// 		// 	created_by: '1'
// 		// });

// 		// if (dbError3) throw dbError3;
// 	} catch {
// 		console.log('error in full code');
// 	}
// }
