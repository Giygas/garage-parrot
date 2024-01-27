import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { PUBLIC_SUPABASE_URL_DEV, PUBLIC_SUPABASE_ANON_KEY_DEV } from '$env/static/public';

export const db = createClient<Database>(PUBLIC_SUPABASE_URL_DEV, PUBLIC_SUPABASE_ANON_KEY_DEV);
