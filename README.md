# Project Garage Parrot for Studi

## Local deployment

To run locally:

```bash
git clone https://github.com/Giygas/garage-parrot.git
cd garage-parrot
npm ci
npm run dev

```

Create a database instance on Supabase

Then you should create a .env file at the root of the directory with the following values:
PUBLIC_SUPABASE_ANON_KEY=Project URL
PUBLIC_SUPABASE_URL=[anon key]
PRIVATE_SUPABASE_SERVICE_KEY=[service role key]

Install Supabase CLI, log in, and finally

```
supabase db push
```
