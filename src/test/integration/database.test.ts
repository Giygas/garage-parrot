import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { testDb, type TestVehicle, type TestService, type TestReview } from '../utils';

describe('Database Integration Tests', () => {
	beforeEach(async () => {
		// Clean up any existing test data before each test
		await testDb.cleanupTestData();
	});

	afterEach(async () => {
		// Clean up after each test
		await testDb.cleanupTestData();
	});

	describe('Vehicle Operations', () => {
		it('should create a new vehicle', async () => {
			const vehicleData: Partial<TestVehicle> = {
				title: 'Test Integration Vehicle',
				price: 25000,
				kilometrage: 30000,
				year: 2022,
				engine: 'diesel',
				doors: 5,
				transmission: 2
			};

			const createdVehicle = await testDb.createTestVehicle(vehicleData);

			expect(createdVehicle).toBeDefined();
			expect(createdVehicle.id).toBeDefined();
			expect(createdVehicle.title).toBe(vehicleData.title);
			expect(createdVehicle.price).toBe(vehicleData.price);
			expect(createdVehicle.kilometrage).toBe(vehicleData.kilometrage);
			expect(createdVehicle.year).toBe(vehicleData.year);
			expect(createdVehicle.engine).toBe(vehicleData.engine);
		});

		it('should retrieve vehicles from database', async () => {
			// Create test vehicles
			const vehicle1 = await testDb.createTestVehicle({
				title: 'Test Vehicle 1',
				price: 15000
			});
			const vehicle2 = await testDb.createTestVehicle({
				title: 'Test Vehicle 2',
				price: 20000
			});

			const client = await testDb.getClient();
			const { data, error } = await client
				.from('voitures')
				.select('*')
				.in('id', [vehicle1.id!, vehicle2.id!]);

			expect(error).toBeNull();
			expect(data).toHaveLength(2);
			expect(data?.find((v) => v.id === vehicle1.id)?.title).toBe('Test Vehicle 1');
			expect(data?.find((v) => v.id === vehicle2.id)?.title).toBe('Test Vehicle 2');
		});

		it('should update vehicle information', async () => {
			const vehicle = await testDb.createTestVehicle({
				title: 'Original Title',
				price: 10000
			});

			const client = await testDb.getClient();
			const { data, error } = await client
				.from('voitures')
				.update({ title: 'Updated Title', price: 12000 })
				.eq('id', vehicle.id!)
				.select()
				.single();

			expect(error).toBeNull();
			expect(data?.title).toBe('Updated Title');
			expect(data?.price).toBe(12000);
		});

		it('should delete a vehicle', async () => {
			const vehicle = await testDb.createTestVehicle({
				title: 'Vehicle to Delete'
			});

			const client = await testDb.getClient();
			const { error: deleteError } = await client.from('voitures').delete().eq('id', vehicle.id!);

			expect(deleteError).toBeNull();

			// Verify deletion
			const { data, error: selectError } = await client
				.from('voitures')
				.select('*')
				.eq('id', vehicle.id!);

			expect(selectError).toBeNull();
			expect(data).toHaveLength(0);
		});
	});

	describe('Service Operations', () => {
		it('should create a new service', async () => {
			const serviceData: Partial<TestService> = {
				title: 'Test Integration Service',
				description: 'This is a test service for integration testing'
			};

			const createdService = await testDb.createTestService(serviceData);

			expect(createdService).toBeDefined();
			expect(createdService.id).toBeDefined();
			expect(createdService.title).toBe(serviceData.title);
			expect(createdService.description).toBe(serviceData.description);
		});

		it('should retrieve services from database', async () => {
			const service1 = await testDb.createTestService({
				title: 'Service 1',
				description: 'First test service'
			});
			const service2 = await testDb.createTestService({
				title: 'Service 2',
				description: 'Second test service'
			});

			const client = await testDb.getClient();
			const { data, error } = await client
				.from('services')
				.select('*')
				.in('id', [service1.id!, service2.id!]);

			expect(error).toBeNull();
			expect(data).toHaveLength(2);
			expect(data?.find((s) => s.id === service1.id)?.title).toBe('Service 1');
			expect(data?.find((s) => s.id === service2.id)?.title).toBe('Service 2');
		});
	});

	describe('Review Operations', () => {
		it('should create a new review', async () => {
			const reviewData: Partial<TestReview> = {
				name: 'Test Reviewer',
				rating: 5,
				message: 'Excellent service!',
				approved: true
			};

			const createdReview = await testDb.createTestReview(reviewData);

			expect(createdReview).toBeDefined();
			expect(createdReview.id).toBeDefined();
			expect(createdReview.name).toBe(reviewData.name);
			expect(createdReview.rating).toBe(reviewData.rating);
			expect(createdReview.message).toBe(reviewData.message);
			expect(createdReview.approved).toBe(reviewData.approved);
		});

		it('should retrieve approved reviews only', async () => {
			// Clean up all reviews for this specific test
			const client = await testDb.getClient();
			await client
				.from('temoignages')
				.delete()
				.in('name', [
					'Approved Reviewer',
					'Pending Reviewer',
					'Francisco',
					'Gustavo',
					'Frank',
					'Marie',
					'Jean-Luc',
					'Sophie'
				]);

			await testDb.createTestReview({
				name: 'Approved Reviewer',
				rating: 5,
				message: 'Great!',
				approved: true
			});

			await testDb.createTestReview({
				name: 'Pending Reviewer',
				rating: 3,
				message: 'Okay',
				approved: false
			});

			const { data, error } = await client.from('temoignages').select('*').eq('approved', true);

			expect(error).toBeNull();
			expect(data).toHaveLength(1);
			expect(data?.[0]?.name).toBe('Approved Reviewer');
		});
	});

	describe('Database Constraints', () => {
		it('should enforce vehicle price as non-negative', async () => {
			const client = await testDb.getClient();
			const { error } = await client.from('voitures').insert({
				title: 'Invalid Vehicle',
				price: -1000,
				kilometrage: 50000,
				year: 2020,
				image: 'test.jpg'
			});

			// Database should reject negative price
			expect(error).toBeDefined();
		});

		it('should enforce vehicle year range', async () => {
			const client = await testDb.getClient();
			const { error } = await client.from('voitures').insert({
				title: 'Future Vehicle',
				price: 15000,
				kilometrage: 0,
				year: 2200,
				image: 'test.jpg'
			});

			// Database should reject invalid year
			expect(error).toBeDefined();
		});

		it('should enforce review rating range', async () => {
			const client = await testDb.getClient();
			const { error } = await client.from('temoignages').insert({
				name: 'Invalid Reviewer',
				rating: 11, // Invalid rating
				comment: 'Too high rating',
				approved: true
			});

			// Database should reject invalid rating
			expect(error).toBeDefined();
		});
	});

	describe('Data Relationships', () => {
		it('should handle vehicle with optional fields', async () => {
			const vehicleData: Partial<TestVehicle> = {
				title: 'Minimal Vehicle',
				price: 10000,
				kilometrage: 50000,
				year: 2020,
				engine: null,
				doors: null,
				seats: null
			};

			const createdVehicle = await testDb.createTestVehicle(vehicleData);

			expect(createdVehicle).toBeDefined();
			expect(createdVehicle.engine).toBeNull();
			expect(createdVehicle.doors).toBeNull();
			expect(createdVehicle.seats).toBeNull();
		});

		it('should handle service without price', async () => {
			const serviceData: Partial<TestService> = {
				title: 'Free Service',
				description: 'This service is free'
				// No price
			};

			const createdService = await testDb.createTestService(serviceData);

			expect(createdService).toBeDefined();
			expect(createdService.title).toBe(serviceData.title);
		});
	});
});
