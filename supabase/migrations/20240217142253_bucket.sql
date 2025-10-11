-- Storage policies with automatic environment detection
-- This approach handles both local and production environments gracefully

DO $$
DECLARE
    policy_created BOOLEAN := FALSE;
BEGIN
    -- Try to create storage policies - if we have privileges, we're in production
    -- If we don't have privileges, we're in local development
    
    BEGIN
        -- Test if we can create policies by trying to create one
        EXECUTE 'CREATE POLICY "storage_insert" ON storage.objects AS PERMISSIVE
          FOR INSERT TO authenticated
            WITH CHECK (TRUE)';
        policy_created := TRUE;
        RAISE NOTICE 'Created storage_insert policy';
    EXCEPTION WHEN insufficient_privilege THEN
        RAISE NOTICE 'Local development detected - skipping storage policies (insufficient privileges)';
        RETURN; -- Exit early for local development
    WHEN duplicate_object THEN
        policy_created := TRUE;
        RAISE NOTICE 'storage_insert policy already exists';
    END;
    
    -- If we got here, we have privileges, so create the rest of the policies
    IF policy_created THEN
        BEGIN
            EXECUTE 'CREATE POLICY "storage_delete" ON storage.objects
              FOR DELETE TO authenticated
                USING (TRUE)';
            RAISE NOTICE 'Created storage_delete policy';
        EXCEPTION WHEN duplicate_object THEN
            RAISE NOTICE 'storage_delete policy already exists';
        END;
        
        BEGIN
            EXECUTE 'CREATE POLICY "storage_update" ON storage.objects
              FOR UPDATE TO authenticated
                USING (TRUE)
                WITH CHECK (TRUE)';
            RAISE NOTICE 'Created storage_update policy';
        EXCEPTION WHEN duplicate_object THEN
            RAISE NOTICE 'storage_update policy already exists';
        END;
        
        BEGIN
            EXECUTE 'CREATE POLICY "public_view" ON storage.objects AS PERMISSIVE
              FOR SELECT TO public
                USING (TRUE)';
            RAISE NOTICE 'Created public_view policy';
        EXCEPTION WHEN duplicate_object THEN
            RAISE NOTICE 'public_view policy already exists';
        END;
    END IF;
END $$;

CREATE VIEW public.users with (security_invoker = on) AS
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

