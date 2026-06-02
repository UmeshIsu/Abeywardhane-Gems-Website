/**
 * Cloudinary upload helper.
 * Uses the Upload Widget (loaded via CDN script) or direct unsigned upload.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

/**
 * Upload a file directly to Cloudinary via unsigned upload.
 * @param {File} file
 * @param {object} options - { folder, tags, resourceType }
 * @returns {Promise<{ url: string, publicId: string, width: number, height: number }>}
 */
export async function uploadToCloudinary(file, options = {}) {
  const { folder = 'abeywardhane-gems', tags = [], resourceType = 'image' } = options;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);
  if (tags.length) formData.append('tags', tags.join(','));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Cloudinary upload failed');
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
  };
}

/**
 * Delete an image from Cloudinary.
 * NOTE: Deletion requires a signed request from a backend.
 * For now, we just remove the reference from our database.
 * Actual Cloudinary deletion should be handled via a Supabase Edge Function or server endpoint.
 */
export function getCloudinaryDeleteUrl(publicId) {
  return `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;
}

/**
 * Generate a Cloudinary transformation URL.
 * @param {string} url - Original Cloudinary URL
 * @param {object} transforms - { width, height, crop, quality, format }
 */
export function transformUrl(url, transforms = {}) {
  if (!url || !url.includes('cloudinary.com')) return url;

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = transforms;
  const parts = [];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  parts.push(`c_${crop}`, `q_${quality}`, `f_${format}`);

  const transformStr = parts.join(',');
  return url.replace('/upload/', `/upload/${transformStr}/`);
}

export const cloudinaryConfig = {
  cloudName: CLOUD_NAME,
  uploadPreset: UPLOAD_PRESET,
};
