import { z } from 'zod';

const MAX_FILE_SIZE = 100_000_000;

export const vehicleSchema = z.object({
	title: z.string().min(2, 'Le titre est obligatoire'),
	kilometrage: z
		.number()
		.gte(0, 'Le kilométrage doit être superieur à 0')
		.lte(2000000, 'Le kilometrage doit être inférieur à 2.000.000 '),
	year: z
		.number()
		.min(1886, 'Le année doit être superieur à 1886')
		.max(2100, 'Le titre doit être inférieur à 2100'),
	engine: z.string().min(1).nullable(),
	power: z.number().min(1).nullable(),
	transmission: z.number().min(1).max(3).nullable(),
	traction: z.string().min(5).max(7).nullable(),
	doors: z.number().max(1).nullable(),
	seats: z.number().max(1).nullable(),
	options: z.string().nullable(),
	imagePrincipal: z
		.custom<File>((f) => f instanceof File, "L 'image principal est obligatoire")
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 1000 kB upload size.')
		.nullable(),
	otherImages: z
		.custom<File>((f) => f instanceof File, "Mauvais format d'image")
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 1000 kB upload size.')
		.nullable()
		.array()
		.max(9, 'Vous pouvez ajouter au max 9 images supplementaires')
});
