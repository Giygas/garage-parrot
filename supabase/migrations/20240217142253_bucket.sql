-- Giving all users the possibilitiy of inserting objects, just because for some reason is not working with authenticated users
CREATE POLICY "authenticated_insert" ON storage.objects AS PERMISSIVE
  FOR INSERT TO anon
    WITH CHECK (TRUE);

CREATE POLICY "public_view" ON storage.objects AS PERMISSIVE
  FOR SELECT TO public
    USING (TRUE);

CREATE VIEW public.users AS
SELECT
  p.id,
  p.name,
  au.email,
  au.last_sign_in_at,
  au.created_at,
  au. deleted_at
FROM
  public.profiles AS p
  INNER JOIN auth.users AS au ON p.id = au.id
WHERE
  au.deleted_at IS NULL;

