import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import FormField, { TextInput, SelectInput } from '@/admin/components/ui/FormField';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Trash2, Pencil, X, Check, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GalleryManager() {
  const { logActivity } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filter, setFilter] = useState('All');
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' });

  const [uploadForm, setUploadForm] = useState({ title: '', description: '', category: '', image_url: '', image_public_id: '' });

  useEffect(() => { loadImages(); }, []);

  async function loadImages() {
    setLoading(true);
    const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
    setImages(data || []);
    setLoading(false);
  }

  const categories = ['All', ...new Set(images.map((i) => i.category).filter(Boolean))];

  const filtered = filter === 'All' ? images : images.filter((i) => i.category === filter);

  async function handleUpload() {
    if (!uploadForm.image_url) { toast.error('Please upload an image'); return; }
    const { error } = await supabase.from('gallery_images').insert({
      ...uploadForm, is_published: true, sort_order: images.length
    });
    if (error) toast.error(error.message);
    else {
      toast.success('Image added to gallery');
      await logActivity('create', 'gallery', null, uploadForm.title);
      setUploadForm({ title: '', description: '', category: '', image_url: '', image_public_id: '' });
      setShowUpload(false);
      loadImages();
    }
  }

  async function handleEdit(id) {
    const { error } = await supabase.from('gallery_images').update(editForm).eq('id', id);
    if (!error) { toast.success('Image updated'); setEditId(null); loadImages(); }
    else toast.error(error.message);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await supabase.from('gallery_images').delete().eq('id', deleteId);
    if (!error) {
      toast.success('Image deleted');
      await logActivity('delete', 'gallery', deleteId);
      setImages((prev) => prev.filter((i) => i.id !== deleteId));
    }
    setDeleteId(null);
    setDeleting(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-white">Gallery</h1>
          <p className="text-sm text-muted mt-1">{images.length} images</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all">
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>

      {/* Upload form */}
      {showUpload && (
        <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
          <h3 className="text-sm font-semibold text-ink dark:text-white">Upload New Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ImageUpload value={uploadForm.image_url} onChange={(url, pid) => setUploadForm((p) => ({ ...p, image_url: url, image_public_id: pid }))} folder="abeywardhane-gems/gallery" aspect="landscape" />
            <div className="space-y-4">
              <FormField label="Title" id="upload-title">
                <TextInput id="upload-title" value={uploadForm.title} onChange={(e) => setUploadForm((p) => ({ ...p, title: e.target.value }))} placeholder="Image title" />
              </FormField>
              <FormField label="Description" id="upload-desc">
                <TextInput id="upload-desc" value={uploadForm.description} onChange={(e) => setUploadForm((p) => ({ ...p, description: e.target.value }))} placeholder="Caption…" />
              </FormField>
              <FormField label="Category" id="upload-cat">
                <TextInput id="upload-cat" value={uploadForm.category} onChange={(e) => setUploadForm((p) => ({ ...p, category: e.target.value }))} placeholder="e.g. Sapphires, Workshop" />
              </FormField>
              <div className="flex gap-3">
                <button onClick={handleUpload} className="px-4 py-2 bg-sapphire text-white rounded-lg text-sm font-semibold hover:bg-sapphire-deep transition-colors">Save</button>
                <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-muted rounded-lg text-sm hover:bg-cream dark:hover:bg-ink-line transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === cat ? 'bg-sapphire text-white' : 'bg-cream dark:bg-ink-line text-muted hover:text-ink dark:hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-cream dark:bg-ink-line animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted">No images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-line dark:border-ink-line bg-cream dark:bg-ink-line">
              <img src={img.image_url} alt={img.title || ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => { setEditId(img.id); setEditForm({ title: img.title || '', description: img.description || '', category: img.category || '' }); }}
                  className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-ink hover:bg-white transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteId(img.id)}
                  className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {img.title && (
                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xs text-white truncate">{img.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Image" message="Remove this image from the gallery?" loading={deleting} />
    </div>
  );
}
