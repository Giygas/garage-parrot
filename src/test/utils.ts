import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { testSupabaseKey } from './setup';

export interface TestUser {
	id: string;
	email: string;
	role?: string;
}

export interface TestVehicle {
	id?: number;
	title: string;
	price: number;
	kilometrage: number;
	year: number;
	description?: string;
	image_principal?: string;
	other_images?: string[];
	doors?: number;
	engine?: string;
	transmission?: number;
	seats?: number;
	power?: number;
	traction?: string;
	options?: string[];
}

export interface TestService {
	id?: number;
	title: string;
	description: string;
	price?: number;
	image?: string;
}

export interface TestReview {
	id?: number;
	name: string;
	rating: number;
	comment: string;
	approved?: boolean;
}

export class TestDatabase {
	private client: SupabaseClient;

	constructor() {
		this.client = createClient('http://127.0.0.1:54321', testSupabaseKey, {
			auth: {
				autoRefreshToken: false,
				persistSession: false
			}
		});
	}

	async createTestUser(userData: Partial<TestUser> = {}): Promise<TestUser> {
		const defaultUser: TestUser = {
			id: 'test-user-' + Math.random().toString(36).slice(2, 11),
			email: `test-${Math.random().toString(36).slice(2, 11)}@example.com`,
			role: 'user'
		};

		const user = { ...defaultUser, ...userData };

		// Insert user into auth.users (this would typically be handled by Supabase Auth)
		// For testing purposes, we'll insert into a test users table if it exists
		const { data, error } = await this.client.from('users').insert(user).select().single();

		if (error && error.code !== 'PGRST116') {
			throw new Error(`Failed to create test user: ${error.message}`);
		}

		return data || user;
	}

	async createTestVehicle(vehicleData: Partial<TestVehicle> = {}): Promise<TestVehicle> {
		const defaultVehicle: TestVehicle = {
			title: 'Test Vehicle ' + Math.random().toString(36).slice(2, 11),
			price: 15000,
			kilometrage: 50000,
			year: 2020,
			description: 'Test vehicle description',
			image_principal: 'test-image.jpg',
			other_images: ['test-image-2.jpg'],
			doors: 5,
			engine: 'essence',
			transmission: 1
		};

		const vehicle = { ...defaultVehicle, ...vehicleData };

		const { data, error } = await this.client.from('voitures').insert(vehicle).select().single();

		if (error) {
			throw new Error(`Failed to create test vehicle: ${error.message}`);
		}

		return data;
	}

	async createTestService(serviceData: Partial<TestService> = {}): Promise<TestService> {
		const defaultService: TestService = {
			title: 'Test Service ' + Math.random().toString(36).slice(2, 11),
			description: 'Test service description',
			price: 100,
			image: 'test-service.jpg'
		};

		const service = { ...defaultService, ...serviceData };

		const { data, error } = await this.client.from('services').insert(service).select().single();

		if (error) {
			throw new Error(`Failed to create test service: ${error.message}`);
		}

		return data;
	}

	async createTestReview(reviewData: Partial<TestReview> = {}): Promise<TestReview> {
		const defaultReview: TestReview = {
			name: 'Test User ' + Math.random().toString(36).slice(2, 11),
			rating: 5,
			comment: 'Great service!',
			approved: true
		};

		const review = { ...defaultReview, ...reviewData };

		const { data, error } = await this.client.from('temoignages').insert(review).select().single();

		if (error) {
			throw new Error(`Failed to create test review: ${error.message}`);
		}

		return data;
	}

	async cleanupTestData(): Promise<void> {
		// Clean up test data
		const testPatterns = ['test-', 'Test '];

		for (const pattern of testPatterns) {
			await this.client.from('voitures').delete().ilike('title', `${pattern}%`);
			await this.client.from('services').delete().ilike('title', `${pattern}%`);
			await this.client.from('temoignages').delete().ilike('name', `${pattern}%`);
			await this.client.from('contact').delete().ilike('email', `%${pattern}%`);
		}
	}

	async getClient(): Promise<SupabaseClient> {
		return this.client;
	}
}

export const testDb = new TestDatabase();
