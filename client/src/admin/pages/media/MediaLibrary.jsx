import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Upload, Trash2, Image as ImageIcon, FileText, Eye } from 'lucide-react';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function MediaLibrary() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    // Aggregate images from all tables
    const [gallery, gems, blog, exhibitions] = await Promise.all([
      supabase.from('gallery_images').select('id, image_url, title, category, created_at').order('created_at', { ascending: false }),
      supabase.from('gems').select('id, image_url, name, category, created_at').not('image_url', 'is', null),
      supabase.from('blog_posts').select('id, cover_image_url, title, created_at').not('cover_image_url', 'is', null),
      supabase.from('exhibitions').select('id, image_url, title, created_at').not('image_url', 'is', null),
    ]);

    const all = [
      ...(gallery.data || []).map((i) => ({ ...i, source: 'Gallery', url: i.image_url })),
      ...(gems.data || []).map((i) => ({ ...i, title: i.name, source: 'Gems', url: i.image_url })),
      ...(blog.data || []).map((i) => ({ ...i, source: 'Blog', url: i.cover_image_url })),
      ...(exhibitions.data || []).map((i) => ({ ...i, source: 'Exhibitions', url: i.image_url })),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setImages(all);
    setLoading(false);
  }

  const filtered = search
    ? images.filter((i) => (i.title || '').toLowerCase().includes(search.toLowerCase()) || (i.source || '').toLowerCase().includes(search.toLowerCase()))
    : images;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Media Library</h1><p className="text-sm text-muted mt-1">{images.length} files across all content</p></div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search media…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-ink border border-line dark:border-ink-line text-sm text-ink dark:text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sapphire/20 focus:border-sapphire transition-all" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="aspect-square rounded-xl bg-cream dark:bg-ink-line animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16"><ImageIcon className="w-12 h-12 text-muted/30 mx-auto mb-3" /><p className="text-muted">No media found</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((img, i) => (
            <div key={`${img.source}-${img.id}-${i}`} className="group relative aspect-square rounded-xl overflow-hidden border border-line dark:border-ink-line bg-cream dark:bg-ink-line cursor-pointer"
              onClick={() => setPreview(img)}>
              <img src={img.url} alt={img.title || ''} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-[0.6rem] text-white/80 font-medium bg-black/30 px-1.5 py-0.5 rounded">{img.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={preview.url} alt={preview.title || ''} className="max-w-full max-h-[80vh] object-contain" />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white text-sm font-medium">{preview.title || 'Untitled'}</div>
              <div className="text-white/60 text-xs mt-1">{preview.source} · {preview.created_at ? format(new Date(preview.created_at), 'MMM d, yyyy') : ''}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
