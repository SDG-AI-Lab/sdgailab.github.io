import { getSupabaseAuth } from './supabase-auth';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function sanitizeFilename(name: string): string {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.-]/g, '');
}

export async function uploadImage(
  folder: 'projects' | 'news' | 'people' | 'partners',
  file: File
): Promise<{ url: string | null; error: string | null }> {
  if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
    return { url: null, error: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` };
  }

  const sanitized = sanitizeFilename(file.name);
  const path = `${folder}/${Date.now()}-${sanitized || 'image'}`;

  const { error } = await getSupabaseAuth().storage.from('public-assets').upload(path, file);
  if (error) {
    return { url: null, error: error.message };
  }

  const { data } = getSupabaseAuth().storage.from('public-assets').getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

export async function deleteImage(
  publicUrl: string
): Promise<{ error: string | null }> {
  const prefix = '/public-assets/';
  const idx = publicUrl.indexOf(prefix);
  if (idx === -1) {
    return { error: 'Invalid storage URL: cannot extract path' };
  }
  const path = publicUrl.slice(idx + prefix.length).split('?')[0];
  if (!path) {
    return { error: 'Invalid storage URL: empty path' };
  }

  const { error } = await getSupabaseAuth().storage.from('public-assets').remove([path]);
  return error ? { error: error.message } : { error: null };
}

export async function replaceImage(
  folder: 'projects' | 'news' | 'people' | 'partners',
  oldUrl: string | null,
  newFile: File
): Promise<{ url: string | null; error: string | null }> {
  if (oldUrl) {
    await deleteImage(oldUrl);
  }
  return uploadImage(folder, newFile);
}
