import { describe, it, expect } from 'vitest';
import { vehicleSchema } from './schemas';

describe('vehicleSchema', () => {
	it('should validate a valid vehicle object', () => {
		const validVehicle = {
			title: 'Test Vehicle',
			price: 15000,
			kilometrage: 50000,
			year: 2020,
			engine: 'essence',
			power: 150,
			transmission: 1,
			traction: 'avant',
			doors: 5,
			seats: 5,
			options: 'GPS, Climatisation',
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
			otherImages: [new File(['test2'], 'test2.jpg', { type: 'image/jpeg' })]
		};

		const result = vehicleSchema.safeParse(validVehicle);
		expect(result.success).toBe(true);
	});

	it('should require title', () => {
		const invalidVehicle = {
			title: '',
			price: 15000,
			year: 2020,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe('Le titre est obligatoire');
		}
	});

	it('should validate price is non-negative', () => {
		const invalidVehicle = {
			title: 'Test Vehicle',
			price: -1000,
			year: 2020,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe('Le prix doit être positif');
		}
	});

	it('should validate kilometrage limits', () => {
		const invalidVehicle = {
			title: 'Test Vehicle',
			kilometrage: 3000000,
			year: 2020,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toContain('inférieur à 2.000.000');
		}
	});

	it('should validate year range', () => {
		const tooOldVehicle = {
			title: 'Test Vehicle',
			year: 1800,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const tooNewVehicle = {
			title: 'Test Vehicle',
			year: 2200,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result1 = vehicleSchema.safeParse(tooOldVehicle);
		expect(result1.success).toBe(false);

		const result2 = vehicleSchema.safeParse(tooNewVehicle);
		expect(result2.success).toBe(false);
	});

	it('should validate transmission range', () => {
		const invalidVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			transmission: 5,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
	});

	it('should validate doors and seats limits', () => {
		const invalidDoorsVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			doors: 15,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const invalidSeatsVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			seats: 15,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result1 = vehicleSchema.safeParse(invalidDoorsVehicle);
		expect(result1.success).toBe(false);

		const result2 = vehicleSchema.safeParse(invalidSeatsVehicle);
		expect(result2.success).toBe(false);
	});

	it('should require imagePrincipal to be a File', () => {
		const invalidVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			imagePrincipal: 'not-a-file'
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
	});

	it('should validate file size', () => {
		const largeFile = new File(['x'.repeat(200_000_000)], 'large.jpg', { type: 'image/jpeg' });

		const invalidVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			imagePrincipal: largeFile
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toContain('Max 1000 kB');
		}
	});

	it('should limit otherImages to 9 items', () => {
		const tooManyImages = Array.from(
			{ length: 10 },
			(_, i) => new File(['test'], `test${i}.jpg`, { type: 'image/jpeg' })
		);

		const invalidVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
			otherImages: tooManyImages
		};

		const result = vehicleSchema.safeParse(invalidVehicle);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toContain('max 9 images');
		}
	});

	it('should accept minimal valid vehicle', () => {
		const minimalVehicle = {
			title: 'Test Vehicle',
			year: 2020,
			imagePrincipal: new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		};

		const result = vehicleSchema.safeParse(minimalVehicle);
		expect(result.success).toBe(true);
	});
});
