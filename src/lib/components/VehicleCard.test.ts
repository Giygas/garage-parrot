import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import VehicleCard from './VehicleCard.svelte';
import type { DatabaseVoiture } from '$lib/types';

describe('VehicleCard', () => {
	const mockVehicle: DatabaseVoiture = {
		id: '1',
		title: 'Test Vehicle',
		price: 15000,
		kilometrage: 50000,
		year: 2020,
		image: 'test-image.jpg',
		engine: 'essence',
		traction: 'avant',
		doors: 5,
		seats: 5,
		power: 150,
		transmission: 1,
		options: ['GPS'],
		other_images: ['test2.jpg'],
		created_at: new Date().toISOString(),
		created_by: null
	};

	it('renders vehicle information correctly', () => {
		render(VehicleCard, { props: { vehicle: mockVehicle } });

		expect(screen.getByText('Test Vehicle')).toBeInTheDocument();
		expect(screen.getByText('15000 €')).toBeInTheDocument();
		expect(screen.getByText('2020')).toBeInTheDocument();
		expect(screen.getByText('50000')).toBeInTheDocument();
		expect(screen.getByText('essence')).toBeInTheDocument();
	});

	it('renders correct link href', () => {
		render(VehicleCard, { props: { vehicle: mockVehicle } });

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', 'vehicles/detail/Test-Vehicle');
	});

	it('displays engine when available', () => {
		render(VehicleCard, { props: { vehicle: mockVehicle } });

		expect(screen.getByText('MOTEUR:')).toBeInTheDocument();
		expect(screen.getByText('essence')).toBeInTheDocument();
	});

	it('displays traction when engine is not available', () => {
		const vehicleWithoutEngine = { ...mockVehicle, engine: undefined };
		render(VehicleCard, { props: { vehicle: vehicleWithoutEngine } });

		expect(screen.getByText('TRACTION:')).toBeInTheDocument();
		expect(screen.getByText('avant')).toBeInTheDocument();
		expect(screen.queryByText('MOTEUR:')).not.toBeInTheDocument();
	});

	it('displays neither engine nor traction when both are unavailable', () => {
		const vehicleWithoutEngineOrTraction = {
			...mockVehicle,
			engine: undefined,
			traction: undefined
		};
		render(VehicleCard, { props: { vehicle: vehicleWithoutEngineOrTraction } });

		expect(screen.queryByText('MOTEUR:')).not.toBeInTheDocument();
		expect(screen.queryByText('TRACTION:')).not.toBeInTheDocument();
	});

	it('renders vehicle image with correct alt text', () => {
		render(VehicleCard, { props: { vehicle: mockVehicle } });

		const image = screen.getByAltText('Test Vehicle');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'test-image.jpg');
	});

	it('handles vehicle title with spaces correctly in href', () => {
		const vehicleWithSpaces = { ...mockVehicle, title: 'Vehicle With Multiple Spaces' };
		render(VehicleCard, { props: { vehicle: vehicleWithSpaces } });

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', 'vehicles/detail/Vehicle-With-Multiple-Spaces');
	});

	it('displays price in correct format', () => {
		render(VehicleCard, { props: { vehicle: mockVehicle } });

		const priceElement = screen.getByText('15000 €');
		expect(priceElement).toHaveClass('bg-secondary', 'text-neutral');
	});

	it('renders all required vehicle details', () => {
		render(VehicleCard, { props: { vehicle: mockVehicle } });

		expect(screen.getByText('ANNEE:')).toBeInTheDocument();
		expect(screen.getByText('KILOMETRAGE:')).toBeInTheDocument();
		expect(screen.getByText('2020')).toBeInTheDocument();
		expect(screen.getByText('50000')).toBeInTheDocument();
	});
});
