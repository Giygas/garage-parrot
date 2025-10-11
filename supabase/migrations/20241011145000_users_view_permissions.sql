-- Create a function that respects user permissions
-- Admins (role_type = 1) can see all users, regular users can only see themselves
CREATE OR REPLACE FUNCTION get_users_for_current_user()
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
  WHERE au.deleted_at IS NULL
  AND (
    -- Admins can see all users
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role_type = 1)
    OR
    -- Regular users can only see themselves
    p.id = auth.uid()
  );
$$;

-- Grant execute on the function to authenticated users
GRANT EXECUTE ON FUNCTION get_users_for_current_user() TO authenticated;

-- Also grant select on the users view for completeness
GRANT SELECT ON public.users TO authenticated;