import { z } from 'zod';

const MAX_FILE_SIZE = 100_000_000;

export const vehicleSchema = z.object({
	title: z.string().min(1, 'Le titre est obligatoire'),
	price: z
		.number({ invalid_type_error: 'Le prix doit être un nombre' })
		.safe('Nope')
		.nonnegative('Le prix doit être positif')
		//Using this so I get a nice empty field in the form
		.default('' as unknown as number),
	kilometrage: z
		.number({ invalid_type_error: 'Le kilométrage doit être un nombre' })
		.nonnegative('Le kilométrage doit etre positif')
		.lte(2000000, 'Le kilométrage doit être inférieur à 2.000.000 ')
		.default('' as unknown as number),
	year: z
		.number({ invalid_type_error: "L'année doit être un nombre" })
		.min(1886, 'Le année doit être superieur à 1886')
		.max(2100, 'Le titre doit être inférieur à 2100'),
	engine: z.string().min(1).optional(),
	power: z.number().positive('La puissance doit être positive').min(1).optional(),
	transmission: z.number().min(1).max(3).optional(),
	traction: z.string().min(5).max(7).optional(),
	doors: z
		.number({ invalid_type_error: 'Les portes doivent être un nombre' })
		.positive()
		.max(10)
		.optional(),
	seats: z
		.number({ invalid_type_error: 'Les sièges doivent être un nombre' })
		.positive()
		.max(10)
		.optional(),
	options: z.string().optional(),
	imagePrincipal: z
		.custom<File>((f) => f instanceof File, "L 'image principal est obligatoire")
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 1000 kB upload size.'),
	otherImages: z
		.custom<File>()
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 1000 kB upload size.')
		.optional()
		.array()
		.max(9, 'Vous pouvez ajouter au max 9 images supplementaires')
});
