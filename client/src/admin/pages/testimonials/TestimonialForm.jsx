import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea, Toggle } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { ArrowLeft, Save, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestimonialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const isEditing = id && id !== 'new';
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', role: '', country: '', quote: '', rating: 5,
    avatar_url: '', avatar_public_id: '', sort_order: 0, is_published: true,
  });

  useEffect(() => { if (isEditing) loadItem(); }, [id]);
  async function loadItem() {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').eq('id', id).single();
    if (data) setForm(data);
    setLoading(false);
  }
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) { toast.error('Name and review are required'); return; }
    setSaving(true);
    const { error } = isEditing
      ? await supabase.from('testimonials').update(form).eq('id', id)
      : await supabase.from('testimonials').insert(form);
    if (error) toast.error(error.message);
    else { toast.success(isEditing ? 'Updated' : 'Created'); await logActivity(isEditing ? 'update' : 'create', 'testimonial', id, form.name); navigate('/admin/testimonials'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/testimonials')} className="w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-ink dark:text-white">{isEditing ? 'Edit' : 'Add'} Testimonial</h1>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Client Name" id="name" required><TextInput id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Doe" /></FormField>
            <FormField label="Role / Company" id="role"><TextInput id="role" value={form.role} onChange={(e) => update('role', e.target.value)} placeholder="Gem Collector, Hong Kong" /></FormField>
          </div>
          <FormField label="Country" id="country"><TextInput id="country" value={form.country} onChange={(e) => update('country', e.target.value)} /></FormField>
          <FormField label="Review" id="quote" required><TextArea id="quote" value={form.quote} onChange={(e) => update('quote', e.target.value)} placeholder="Client testimonial…" rows={5} /></FormField>
          <FormField label="Rating" id="rating">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" onClick={() => update('rating', n)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${n <= form.rating ? 'text-amber-400' : 'text-gray-300 dark:text-ink-line'}`}>
                  <Star className={`w-5 h-5 ${n <= form.rating ? 'fill-amber-400' : ''}`} />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted">{form.rating}/5</span>
            </div>
          </FormField>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-4">
            <ImageUpload label="Profile Image" value={form.avatar_url} publicId={form.avatar_public_id}
              onChange={(url, pid) => setForm((p) => ({ ...p, avatar_url: url, avatar_public_id: pid }))} folder="abeywardhane-gems/testimonials" aspect="square" />
            <Toggle id="is_published" checked={form.is_published} onChange={(e) => update('is_published', e.target.checked)} label="Published" />
          </div>
        </div>
      </form>
    </div>
  );
}
