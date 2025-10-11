import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { createClient } from '@supabase/supabase-js';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
	createClient: vi.fn()
}));

describe('vehicles page server', () => {
	let mockSupabase: any;
	let mockStorage: any;
	let mockFrom: any;
	let getPublicUrlMock: any;

	beforeEach(() => {
		vi.clearAllMocks();

		getPublicUrlMock = vi.fn((path: string) => ({
			data: { publicUrl: `http://test.com/vehicles/${path}` }
		}));

		mockStorage = {
			from: vi.fn(() => ({
				getPublicUrl: getPublicUrlMock
			}))
		};

		mockFrom = {
			select: vi.fn()
		};

		mockSupabase = {
			from: vi.fn(() => mockFrom),
			storage: mockStorage
		};
		(createClient as any).mockReturnValue(mockSupabase);
	});

	it('should load vehicles successfully', async () => {
		const mockVehicles = [
			{
				id: '1',
				title: 'Test Vehicle 1',
				price: 15000,
				kilometrage: 50000,
				year: 2020,
				image: 'test1.jpg',
				engine: 'essence',
				created_at: '2023-01-01T00:00:00Z',
				created_by: null
			},
			{
				id: '2',
				title: 'Test Vehicle 2',
				price: 20000,
				kilometrage: 30000,
				year: 2021,
				image: 'test2.jpg',
				engine: 'diesel',
				created_at: '2023-01-02T00:00:00Z',
				created_by: null
			}
		];

		mockFrom.select.mockResolvedValue({
			data: mockVehicles,
			error: null
		});

		const mockLocals = {
			supabase: mockSupabase
		};

		const result = await load({ locals: mockLocals } as any);

		expect(result).toEqual({
			vehicles: [
				{
					...mockVehicles[0],
					image: 'http://test.com/vehicles/test1.jpg'
				},
				{
					...mockVehicles[1],
					image: 'http://test.com/vehicles/test2.jpg'
				}
			]
		});

		expect(mockSupabase.from).toHaveBeenCalledWith('voitures');
		expect(mockFrom.select).toHaveBeenCalled();
		expect(mockStorage.from).toHaveBeenCalledWith('vehicles');
	});

	it('should handle database errors', async () => {
		const mockError = {
			message: 'Database connection failed'
		};

		mockFrom.select.mockResolvedValue({
			data: null,
			error: mockError
		});

		const mockLocals = {
			supabase: mockSupabase
		};

		const result = await load({ locals: mockLocals } as any);

		expect(result).toEqual({
			error: true,
			message: 'Database connection failed'
		});

		expect(mockSupabase.from).toHaveBeenCalledWith('voitures');
		expect(mockFrom.select).toHaveBeenCalled();
	});

	it('should handle empty vehicles array', async () => {
		mockFrom.select.mockResolvedValue({
			data: [],
			error: null
		});

		const mockLocals = {
			supabase: mockSupabase
		};

		const result = await load({ locals: mockLocals } as any);

		expect(result).toEqual({
			vehicles: []
		});

		expect(mockSupabase.from).toHaveBeenCalledWith('voitures');
		expect(mockFrom.select).toHaveBeenCalled();
	});

	it('should update image URLs for all vehicles', async () => {
		const mockVehicles = [
			{
				id: '1',
				title: 'Test Vehicle',
				price: 15000,
				kilometrage: 50000,
				year: 2020,
				image: 'test.jpg',
				created_at: '2023-01-01T00:00:00Z',
				created_by: null
			}
		];

		mockFrom.select.mockResolvedValue({
			data: mockVehicles,
			error: null
		});

		const mockLocals = {
			supabase: mockSupabase
		};

		await load({ locals: mockLocals } as any);

		expect(mockStorage.from).toHaveBeenCalledWith('vehicles');
		expect(getPublicUrlMock).toHaveBeenCalledWith('test.jpg');
	});

	it('should handle vehicles without images gracefully', async () => {
		const mockVehicles = [
			{
				id: '1',
				title: 'Test Vehicle',
				price: 15000,
				kilometrage: 50000,
				year: 2020,
				image: '',
				created_at: '2023-01-01T00:00:00Z',
				created_by: null
			}
		];

		mockFrom.select.mockResolvedValue({
			data: mockVehicles,
			error: null
		});

		const mockLocals = {
			supabase: mockSupabase
		};

		const result = await load({ locals: mockLocals } as any);

		expect(result.vehicles?.[0]?.image).toBe('http://test.com/vehicles/');
		expect(mockStorage.from).toHaveBeenCalledWith('vehicles');
		expect(getPublicUrlMock).toHaveBeenCalledWith('');
	});
});
