import path from 'path';
import { promises as fsp } from 'fs';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';

import { createClient } from '@supabase/supabase-js';

// Load env variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.PRIVATE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
	throw new Error('Config variables not set');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});

const staticDir = 'static/vehicles/';

/**
 *
 * @param {string} supabasePath
 * @param {string} localPath
 * @param {string} format
 */
async function uploadFile(supabasePath, localPath, format) {
	try {
		const fileBuffer = await fsp.readFile(localPath);
		const { error } = await supabase.storage.from('vehicles').upload(supabasePath, fileBuffer, {
			contentType: format
		});
		if (error) {
			console.error(`Error uploading ${localPath} to ${supabasePath}:`, error);
		} else {
			console.log(`File uploaded successfully: ${localPath} to ${supabasePath}`);
		}
	} catch (error) {
		console.error(`Error reading file ${localPath}:`, error);
	}
}

// FIRST VEHICLE

// Read the first vehicle directory
const baseFolder = path.join(staticDir, '1');

/** @type {Map<string, string>} */
const imageMap = new Map();

fs.readdir(baseFolder, (err, files) => {
	if (err) {
		console.log('Error reading static directory');
		return;
	}

	const baseUuid = crypto.randomUUID();
	let variableUuid = baseUuid;
	files.forEach((file) => {
		if (path.extname(file) == '.webp') {
			imageMap.set(baseUuid + '/' + variableUuid, path.join(baseFolder, file));
			variableUuid = crypto.randomUUID();
		}
	});

	const uploadPromises = Array.from(imageMap.entries()).map(([supabasePath, localPath]) => {
		console.log('upload Promise ' + localPath);
		return uploadFile(supabasePath, localPath, 'image/webp');
	});

	Promise.all(uploadPromises)
		.then(() => {
			console.log('All files uploaded successfully');

			/**
			 * @type {string[]}
			 */
			let images1 = [];
			imageMap.forEach((v, image) => {
				images1.push(image);
			});

			/**
			 * @type {string}
			 */
			let firstImg1;
			// Get the first image of the vehicle
			// @ts-expect-error I know it exists
			firstImg1 = images1.find((e) => {
				let sp = e.split('/');
				if (sp[0] === sp[1]) return e;
			});

			// Filter the first image from the oger images
			let otherImages1 = images1.filter((e) => e != firstImg1);

			// Save the vehicle in the database
			const uploadToDb = async () => {
				const { error } = await supabase.from('voitures').insert({
					title: 'Ford Fiesta 1.6 TDCi Econetic*1ER MAIN*CLIM*CARNET*GARANTIE',
					year: 2009,
					doors: 5,
					seats: 5,
					power: 90,
					kilometrage: 132000,
					engine: 'Diesel',
					traction: 'Arrière',
					image: firstImg1,
					other_images: otherImages1,
					price: 4650,
					transmission: 1,
					created_by: null
				});

				if (error) {
					console.error(error);
				} else {
					console.log('Vehicle 1 saved in database');
				}
			};

			uploadToDb();
		})
		.catch((error) => {
			console.error('Error uploading vehicle 1 images:', error);
		});
});

// SECOND VEHICLE

// Read the second vehicle directory
const baseFolder2 = path.join(staticDir, '2');

/** @type {Map<string, string>} */
const imageMap2 = new Map();

fs.readdir(baseFolder2, (err, files) => {
	if (err) {
		console.log('Error reading static directory');
		return;
	}

	const baseUuid2 = crypto.randomUUID();
	let variableUuid2 = baseUuid2;
	files.forEach((file) => {
		if (path.extname(file) == '.jpg') {
			imageMap2.set(baseUuid2 + '/' + variableUuid2, path.join(baseFolder2, file));
			variableUuid2 = crypto.randomUUID();
		}
	});

	const uploadPromises = Array.from(imageMap2.entries()).map(([supabasePath, localPath]) => {
		console.log('upload Promise ' + localPath);
		return uploadFile(supabasePath, localPath, 'image/jpg');
	});

	Promise.all(uploadPromises)
		.then(() => {
			console.log('All files uploaded successfully');

			/**
			 * @type {string[]}
			 */
			let images2 = [];
			imageMap2.forEach((v, image) => {
				images2.push(image);
			});

			/**
			 * @type {string}
			 */
			let firstImg2;
			// Get the first image of the vehicle
			// @ts-expect-error I know it exists
			firstImg2 = images2.find((e) => {
				let sp = e.split('/');
				if (sp[0] === sp[1]) return e;
			});

			// Filter the first image from the oger images
			let otherImages2 = images2.filter((e) => e != firstImg2);

			// Save the vehicle in the database
			const uploadToDb = async () => {
				const { error } = await supabase.from('voitures').insert({
					title: 'MAZDA CX5 AWD',
					year: 2017,
					doors: 5,
					seats: 5,
					power: 125,
					engine: 'Essence',
					traction: 'Avant',
					kilometrage: 58000,
					image: firstImg2,
					other_images: otherImages2,
					price: 12500,
					transmission: 2,
					created_by: null,
					options: ['Ecran Multimédia', 'Cámera de recule', 'Volant Multifonction']
				});

				if (error) {
					console.error(error);
				} else {
					console.log('Vehicle 2 saved in database');
				}
			};

			uploadToDb();
		})
		.catch((error) => {
			console.error('Error uploading vehicle 2 images:', error);
		});
});

// THIRD VEHICLE

// Read the third vehicle directory
let baseFolder3 = path.join(staticDir, '3');

/** @type {Map<string, string>} */
let imageMap3 = new Map();

fs.readdir(baseFolder3, (err, files) => {
	if (err) {
		console.log('Error reading static directory');
		return;
	}

	const baseUuid = crypto.randomUUID();
	let variableUuid = baseUuid;
	files.forEach((file) => {
		if (path.extname(file) == '.webp') {
			imageMap3.set(baseUuid + '/' + variableUuid, path.join(baseFolder3, file));
			variableUuid = crypto.randomUUID();
		}
	});

	const uploadPromises = Array.from(imageMap3.entries()).map(([supabasePath, localPath]) => {
		console.log('upload Promise ' + localPath);
		return uploadFile(supabasePath, localPath, 'image/webp');
	});

	Promise.all(uploadPromises)
		.then(() => {
			console.log('All files uploaded successfully');

			/**
			 * @type {string[]}
			 */
			let images3 = [];
			imageMap3.forEach((v, image) => {
				images3.push(image);
			});

			/**
			 * @type {string}
			 */
			let firstImg3;
			// Get the first image of the vehicle
			// @ts-expect-error I know it exists
			firstImg3 = images3.find((e) => {
				let sp = e.split('/');
				if (sp[0] === sp[1]) return e;
			});

			// Filter the first image from the oger images
			let otherImages3 = images3.filter((e) => e != firstImg3);

			// Save the vehicle in the database
			const uploadToDb = async () => {
				const { error } = await supabase.from('voitures').insert({
					title: 'MercedesBenz C 250d Coupe 9GTRONIC AMG Line',
					year: 2016,
					doors: 5,
					seats: 5,
					power: 204,
					engine: 'Essence',
					traction: 'Avant',
					kilometrage: 69000,
					image: firstImg3,
					other_images: otherImages3,
					price: 25300,
					transmission: 1,
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

				if (error) {
					console.error(error);
				} else {
					console.log('Vehicle 3 saved in database');
				}
			};

			uploadToDb();
		})
		.catch((error) => {
			console.error('Error uploading vehicle 3 images:', error);
		});
});
