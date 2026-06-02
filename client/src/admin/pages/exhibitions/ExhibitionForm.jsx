import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea, Toggle } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExhibitionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const isEditing = id && id !== 'new';
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', location: '', year: new Date().getFullYear().toString(),
    description: '', image_url: '', image_public_id: '',
    sort_order: 0, is_published: true,
  });

  useEffect(() => { if (isEditing) loadItem(); }, [id]);

  async function loadItem() {
    setLoading(true);
    const { data } = await supabase.from('exhibitions').select('*').eq('id', id).single();
    if (data) setForm(data);
    setLoading(false);
  }

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    const { error } = isEditing
      ? await supabase.from('exhibitions').update(form).eq('id', id)
      : await supabase.from('exhibitions').insert(form);
    if (error) toast.error(error.message);
    else { toast.success(isEditing ? 'Updated' : 'Created'); await logActivity(isEditing ? 'update' : 'create', 'exhibition', id, form.title); navigate('/admin/exhibitions'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/exhibitions')} className="w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-ink dark:text-white">{isEditing ? 'Edit Exhibition' : 'Add Exhibition'}</h1>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Title" id="title" required><TextInput id="title" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="JCK Las Vegas" /></FormField>
          <FormField label="Location" id="location"><TextInput id="location" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Las Vegas, USA" /></FormField>
          <FormField label="Year" id="year"><TextInput id="year" value={form.year} onChange={(e) => update('year', e.target.value)} /></FormField>
          <FormField label="Sort Order" id="sort_order"><TextInput id="sort_order" type="number" value={form.sort_order} onChange={(e) => update('sort_order', parseInt(e.target.value) || 0)} /></FormField>
        </div>
        <FormField label="Description" id="description"><TextArea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} /></FormField>
        <ImageUpload label="Banner Image" value={form.image_url} publicId={form.image_public_id}
          onChange={(url, pid) => setForm((p) => ({ ...p, image_url: url, image_public_id: pid }))} folder="abeywardhane-gems/exhibitions" />
        <Toggle id="is_published" checked={form.is_published} onChange={(e) => update('is_published', e.target.checked)} label="Published" />
      </form>
    </div>
  );
}
