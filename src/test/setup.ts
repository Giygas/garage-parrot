import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load test environment variables
config({ path: resolve(process.cwd(), '.env.test') });

// Test database configuration
export const testDbUrl = 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
export const testSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const testClient = createClient(
	process.env.PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321',
	testSupabaseKey
);

// Global test setup
beforeAll(async () => {
	// Setup test database state if needed
	console.log('Setting up test environment');
});

afterAll(async () => {
	// Cleanup test database state if needed
	console.log('Cleaning up test environment');
});

beforeEach(async () => {
	// Reset database state before each test if needed
});

afterEach(async () => {
	// Cleanup after each test if needed
});
