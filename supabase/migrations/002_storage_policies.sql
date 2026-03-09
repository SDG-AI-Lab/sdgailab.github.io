-- Storage RLS policies for public-assets bucket
-- Enables authenticated editors to upload, replace, and delete images.
-- Required for the admin UI (002-admin-ui) image upload feature.
-- Run this AFTER creating the public-assets bucket in Supabase Dashboard (Storage).

-- Allow authenticated users to upload (INSERT) to public-assets
CREATE POLICY "authenticated_insert_public_assets"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'public-assets');

-- Allow authenticated users to update (replace) files in public-assets
CREATE POLICY "authenticated_update_public_assets"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'public-assets')
  WITH CHECK (bucket_id = 'public-assets');

-- Allow authenticated users to delete files in public-assets
CREATE POLICY "authenticated_delete_public_assets"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'public-assets');

-- Allow authenticated users to select (read) - needed for replace/upsert flows
CREATE POLICY "authenticated_select_public_assets"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'public-assets');

-- Ensure public read for anon (images displayed on public site)
CREATE POLICY "anon_select_public_assets"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'public-assets');
