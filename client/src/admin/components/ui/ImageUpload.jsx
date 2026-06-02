import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadToCloudinary, transformUrl } from '@/admin/lib/cloudinary';

/**
 * Image upload component with Cloudinary integration.
 *
 * @param {object} props
 * @param {string} [props.value] - Current image URL
 * @param {string} [props.publicId] - Current Cloudinary public ID
 * @param {function} props.onChange - (url, publicId) => void
 * @param {string} [props.folder] - Cloudinary folder
 * @param {string} [props.label]
 * @param {string} [props.aspect] - 'square' | 'landscape' | 'portrait' | 'auto'
 * @param {boolean} [props.multiple]
 */
export default function ImageUpload({
  value, publicId, onChange, folder = 'abeywardhane-gems',
  label, aspect = 'landscape', multiple = false
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const aspectClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'min-h-[200px]',
  };

  const handleFile = useCallback(async (file) => {
    if (!file) return;

    // Validate
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, WEBP, or GIF image');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, { folder });
      onChange(result.url, result.publicId);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleRemove = () => {
    onChange('', '');
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
          {label}
        </label>
      )}

      {value ? (
        /* Preview */
        <div className={`relative rounded-xl overflow-hidden border border-line dark:border-ink-line bg-cream dark:bg-ink-deep group ${aspectClasses[aspect]}`}>
          <img
            src={transformUrl(value, { width: 800, quality: 'auto' })}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleRemove}
              className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative ${aspectClasses[aspect]} rounded-xl border-2 border-dashed transition-all flex items-center justify-center cursor-pointer
            ${dragOver
              ? 'border-sapphire bg-sapphire/5 dark:bg-sapphire/10'
              : 'border-line dark:border-ink-line hover:border-sapphire/50 bg-cream/50 dark:bg-ink-deep/50'
            }
            ${uploading ? 'pointer-events-none' : ''}
          `}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <div className="text-center p-6">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-sapphire mx-auto mb-3 animate-spin" />
                <p className="text-sm text-muted">Uploading…</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-sapphire/10 dark:bg-sapphire/20 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-sapphire" />
                </div>
                <p className="text-sm font-medium text-ink dark:text-white mb-1">
                  Drop image here or click to upload
                </p>
                <p className="text-xs text-muted">JPG, PNG, WEBP up to 10MB</p>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
