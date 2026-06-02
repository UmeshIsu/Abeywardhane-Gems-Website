import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea, SelectInput, Toggle } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const isEditing = id && id !== 'new';
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', event_date: '', venue: '', country: '', banner_url: '', banner_public_id: '', status: 'upcoming', is_published: true, sort_order: 0 });

  useEffect(() => { if (isEditing) loadItem(); }, [id]);
  async function loadItem() { setLoading(true); const { data } = await supabase.from('events').select('*').eq('id', id).single(); if (data) setForm({ ...data, event_date: data.event_date || '' }); setLoading(false); }
  const update = (k, v) => setForm((p) => { const u = { ...p, [k]: v }; if (k === 'name' && !isEditing) u.slug = v.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'); return u; });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    const payload = { ...form, event_date: form.event_date || null };
    const { error } = isEditing ? await supabase.from('events').update(payload).eq('id', id) : await supabase.from('events').insert(payload);
    if (error) toast.error(error.message);
    else { toast.success(isEditing ? 'Updated' : 'Created'); await logActivity(isEditing ? 'update' : 'create', 'event', id, form.name); navigate('/admin/events'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/events')} className="w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-ink dark:text-white">{isEditing ? 'Edit' : 'Add'} Event</h1>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Event Name" id="name" required><TextInput id="name" value={form.name} onChange={(e) => update('name', e.target.value)} /></FormField>
          <FormField label="Slug" id="slug"><TextInput id="slug" value={form.slug} onChange={(e) => update('slug', e.target.value)} /></FormField>
          <FormField label="Date" id="event_date"><TextInput id="event_date" type="date" value={form.event_date} onChange={(e) => update('event_date', e.target.value)} /></FormField>
          <FormField label="Status" id="status">
            <SelectInput id="status" value={form.status} onChange={(e) => update('status', e.target.value)}>
              <option value="upcoming">Upcoming</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
            </SelectInput>
          </FormField>
          <FormField label="Venue" id="venue"><TextInput id="venue" value={form.venue} onChange={(e) => update('venue', e.target.value)} /></FormField>
          <FormField label="Country" id="country"><TextInput id="country" value={form.country} onChange={(e) => update('country', e.target.value)} /></FormField>
        </div>
        <FormField label="Description" id="description"><TextArea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} /></FormField>
        <ImageUpload label="Event Banner" value={form.banner_url} publicId={form.banner_public_id}
          onChange={(url, pid) => setForm((p) => ({ ...p, banner_url: url, banner_public_id: pid }))} folder="abeywardhane-gems/events" />
        <Toggle id="is_published" checked={form.is_published} onChange={(e) => update('is_published', e.target.checked)} label="Published" />
      </form>
    </div>
  );
}
