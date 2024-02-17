INSERT INTO storage.buckets(id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
  VALUES ('vehicles', 'vehicles', TRUE, FALSE, 10000000, ARRAY['image/png', 'image/jpg', 'image/jpeg', 'image/webp']);

-- Giving all users the possibilitiy of inserting objects, just because for some reason is not working with authenticated users
CREATE POLICY "authenticated_insert" ON storage.objects
  FOR INSERT TO public
    WITH CHECK (TRUE);

CREATE POLICY "public_view" ON storage.objects
  FOR SELECT
    USING (TRUE);

