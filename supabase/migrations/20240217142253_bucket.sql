CREATE POLICY "storage_insert" ON storage.objects AS PERMISSIVE
  FOR INSERT TO authenticated
    WITH CHECK (TRUE);

CREATE POLICY "storage_delete" ON storage.objects
  FOR DELETE TO authenticated
    USING (TRUE);

CREATE POLICY "storage_update" ON storage.objects
  FOR UPDATE TO authenticated
    USING (TRUE)
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

