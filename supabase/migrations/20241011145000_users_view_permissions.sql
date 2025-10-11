-- Since views with security_invoker use the caller's permissions,
-- we need to ensure the underlying tables are accessible through RLS

-- The users view joins profiles and auth.users
-- profiles already has RLS policies that allow admins to see all users
-- We need to make sure the view can be accessed

-- Grant select on the users view to authenticated users
GRANT SELECT ON public.users TO authenticated;

-- Alternative: Create a function that admins can use to get user data
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  last_sign_in_at timestamptz,
  created_at timestamptz,
  deleted_at timestamptz
) 
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.name,
    au.email,
    au.last_sign_in_at,
    au.created_at,
    au.deleted_at
  FROM public.profiles AS p
  INNER JOIN auth.users AS au ON p.id = au.id
  WHERE au.deleted_at IS NULL;
$$;

-- Grant execute on the function to authenticated users
GRANT EXECUTE ON FUNCTION get_all_users() TO authenticated;