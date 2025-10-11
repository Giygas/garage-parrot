#!/usr/bin/env node

import { execSync } from 'child_process';

// Storage policies to create
const storagePolicies = [
	{
		name: 'storage_insert',
		sql: `CREATE POLICY "storage_insert" ON storage.objects AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (TRUE);`
	},
	{
		name: 'storage_update',
		sql: `CREATE POLICY "storage_update" ON storage.objects FOR UPDATE TO authenticated USING (TRUE) WITH CHECK (TRUE);`
	},
	{
		name: 'storage_delete',
		sql: `CREATE POLICY "storage_delete" ON storage.objects FOR DELETE TO authenticated USING (TRUE);`
	},
	{
		name: 'public_view',
		sql: `CREATE POLICY "public_view" ON storage.objects AS PERMISSIVE FOR SELECT TO public USING (TRUE);`
	}
];

function executeSQL(sql) {
	try {
		// Use psql with supabase_admin user (superuser) for storage policy creation
		const result = execSync(
			`psql "postgresql://supabase_admin:postgres@127.0.0.1:54322/postgres" -c "${sql}"`,
			{
				encoding: 'utf8',
				stdio: ['pipe', 'pipe', 'pipe']
			}
		);
		return { success: true, output: result };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function setupStoragePolicies() {
	console.log('🔧 Setting up storage policies for local Supabase development...\n');

	// Check if Supabase is running
	try {
		execSync('supabase status', { stdio: 'pipe' });
		console.log('✅ Supabase is running locally');
	} catch (error) {
		console.error('❌ Supabase is not running locally');
		console.log('\n💡 Start Supabase first:');
		console.log('   Run: supabase start');
		process.exit(1);
	}

	// Enable RLS on storage.objects
	console.log('🔒 Enabling RLS on storage.objects...');
	const rlsResult = executeSQL('ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;');
	if (rlsResult.success || rlsResult.error.includes('already enabled')) {
		console.log('✅ RLS enabled on storage.objects');
	} else {
		console.log('⚠️  Note: RLS might already be enabled on storage.objects');
	}

	// Create each policy
	for (const policy of storagePolicies) {
		console.log(`📝 Creating policy: ${policy.name}...`);
		const result = executeSQL(policy.sql);

		if (result.success) {
			console.log(`✅ Created policy: ${policy.name}`);
		} else if (result.error.includes('already exists')) {
			console.log(`⚠️  Policy already exists: ${policy.name}`);
		} else {
			console.error(`❌ Error creating policy ${policy.name}:`, result.error);
		}
	}

	// Verify policies were created
	console.log('\n📋 Verifying created policies...');
	const verifyResult = executeSQL(
		`SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage'`
	);

	if (verifyResult.success) {
		const lines = verifyResult.output
			.split('\n')
			.filter((line) => line.trim() && !line.includes('policyname') && !line.includes('---'));
		console.log('\n📋 Current storage policies:');
		lines.forEach((line) => {
			const policyName = line.trim();
			if (policyName) {
				console.log(`   - ${policyName}`);
			}
		});
	}

	console.log('\n🎉 Storage policies setup complete!');
	console.log('💡 You can now upload files to Supabase storage in local development.');
	console.log('\n🚀 Try creating a new annonce in the admin panel to test file uploads.');
}

// Run the setup
setupStoragePolicies().catch(console.error);
