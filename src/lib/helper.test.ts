import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from './helper';

describe('capitalizeFirstLetter', () => {
	it('should capitalize the first letter of a string', () => {
		expect(capitalizeFirstLetter('hello')).toBe('Hello');
		expect(capitalizeFirstLetter('world')).toBe('World');
	});

	it('should handle empty string', () => {
		expect(capitalizeFirstLetter('')).toBe('');
	});

	it('should handle single character', () => {
		expect(capitalizeFirstLetter('a')).toBe('A');
	});

	it('should handle already capitalized string', () => {
		expect(capitalizeFirstLetter('Hello')).toBe('Hello');
	});

	it('should handle strings with numbers and special characters', () => {
		expect(capitalizeFirstLetter('123abc')).toBe('123abc');
		expect(capitalizeFirstLetter('!hello')).toBe('!hello');
	});

	it('should handle strings with spaces', () => {
		expect(capitalizeFirstLetter(' hello')).toBe(' hello');
		expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
	});
});
