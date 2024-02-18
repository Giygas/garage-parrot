import { db } from '$lib/db/client';
import type { DatabaseUser } from '$lib/types';

export const load = async () => {
	const { data, error } = await db.from('users').select().returns<DatabaseUser[]>();

	if (error) throw error;

	const users: DatabaseUser[] = data;

	console.log(Object.values(users[1])[3]);
	console.log(users[1].last_sing_in_at);

	return { users };
};
