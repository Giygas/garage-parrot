-- Views don't support RLS, so we need to create security policies at the query level
-- The users view should be accessible through the existing profiles table policies
-- since it's based on auth.users joined with profiles

-- Grant access to authenticated users for the users view
GRANT SELECT ON public.users TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;