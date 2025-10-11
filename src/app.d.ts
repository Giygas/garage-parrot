// See https://kit.svelte.dev/docs/types#app

import type { Database } from '$lib/db/types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getUser(): Promise<User | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export {};
