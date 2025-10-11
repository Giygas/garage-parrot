import { expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { createClient } from '@supabase/supabase-js';

// Test database configuration
export const testDbUrl = 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
export const testSupabaseKey = 'sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz';

export const testClient = createClient('http://127.0.0.1:54321', testSupabaseKey);

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

// Mock environment variables for tests
process.env.PUBLIC_SUPABASE_URL = 'http://127.0.0.1:54321';
process.env.PUBLIC_SUPABASE_ANON_KEY = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH';
process.env.SUPABASE_SERVICE_ROLE_KEY = testSupabaseKey;
