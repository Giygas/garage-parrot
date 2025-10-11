# Scripts

## Storage Policies Setup

This script automatically creates the necessary storage policies for local Supabase development.

### Usage

```bash
pnpm run setup-storage-policies
```

### What it does

1. **Checks if Supabase is running locally**
2. **Enables Row Level Security (RLS)** on the `storage.objects` table
3. **Creates storage policies**:
   - `storage_insert` - Allows authenticated users to insert files
   - `storage_update` - Allows authenticated users to update files
   - `storage_delete` - Allows authenticated users to delete files
   - `public_view` - Allows public read access to files
4. **Verifies policies were created** successfully

### When to use

- **After setting up local Supabase**: Run this script once to enable file uploads
- **After database reset**: If you run `supabase db reset`, you'll need to run this again
- **When encountering storage errors**: If you get "row-level security policy" errors when uploading files

### Troubleshooting

If you encounter issues:

1. **Make sure Supabase is running**:

   ```bash
   supabase start
   ```

2. **Check the script output** for any error messages

3. **Verify policies exist** by running the script again - it will show current policies

### Technical Details

The script connects to the local Supabase database using the `supabase_admin` user (superuser) to create storage policies on the `storage.objects` table. This is necessary because storage policies require elevated privileges to create.
