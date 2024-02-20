import { z } from 'zod';

const MAX_FILE_SIZE = 100_000_000;

export const vehicleSchema = z.object({
	title: z.string().min(1, 'Le titre est obligatoire'),
	price: z
		.number({ invalid_type_error: 'Le prix doit être un nombre' })
		.safe('Nope')
		.positive('Le prix doit être positif'),
	kilometrage: z
		.number({ invalid_type_error: 'Le kilométrage doit être un nombre' })
		.nonnegative('Le kilométrage doit etre positif')
		.lte(2000000, 'Le kilométrage doit être inférieur à 2.000.000 ')
		.nullable(),
	year: z
		.number({ invalid_type_error: "L'année doit être un nombre" })
		.min(1886, 'Le année doit être superieur à 1886')
		.max(2100, 'Le titre doit être inférieur à 2100'),
	engine: z.string().min(1).nullable(),
	power: z.number().positive('La puissance doit être positive').min(1).nullable(),
	transmission: z.number().min(1).max(3).nullable(),
	traction: z.string().min(5).max(7).nullable(),
	doors: z
		.number({ invalid_type_error: 'Les portes doivent être un nombre' })
		.positive()
		.max(10)
		.nullable(),
	seats: z
		.number({ invalid_type_error: 'Les sièges doivent être un nombre' })
		.positive()
		.max(10)
		.nullable(),
	options: z.string().nullable(),
	imagePrincipal: z
		.custom<File>((f) => f instanceof File, "L 'image principal est obligatoire")
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 1000 kB upload size.'),
	otherImages: z
		.custom<File>((f) => f instanceof File, "Mauvais format d'image")
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 1000 kB upload size.')
		.nullable()
		.array()
		.max(9, 'Vous pouvez ajouter au max 9 images supplementaires')
});
