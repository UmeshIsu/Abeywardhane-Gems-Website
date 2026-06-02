import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea, SelectInput, Toggle } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const isEditing = id && id !== 'new';
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', slug: '', category: 'Precious', description: '', long_description: '',
    carat: '', origin: 'Sri Lanka', colour: '', cut: '', clarity: '',
    is_certified: false, is_sold: false, price_visible: false, price_usd: '',
    image_url: '', image_public_id: '', sort_order: 0,
    is_published: true, is_featured: false,
  });

  useEffect(() => { if (isEditing) loadGem(); }, [id]);

  async function loadGem() {
    setLoading(true);
    const { data } = await supabase.from('gems').select('*').eq('id', id).single();
    if (data) setForm({ ...data, carat: data.carat || '', price_usd: data.price_usd || '' });
    setLoading(false);
  }

  const updateField = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'name' && !isEditing) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      }
      return updated;
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) { toast.error('Name and slug are required'); return; }
    setSaving(true);
    const payload = {
      ...form,
      carat: form.carat ? parseFloat(form.carat) : null,
      price_usd: form.price_usd ? parseFloat(form.price_usd) : null,
    };
    const { error } = isEditing
      ? await supabase.from('gems').update(payload).eq('id', id)
      : await supabase.from('gems').insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success(isEditing ? 'Gem updated' : 'Gem added');
      await logActivity(isEditing ? 'update' : 'create', 'gem', id, form.name);
      navigate('/admin/gems');
    }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/gems')} className="w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-ink dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-ink dark:text-white">{isEditing ? 'Edit Gem' : 'Add Gem'}</h1>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Gem Name" id="name" required>
                <TextInput id="name" value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Ceylon Blue Sapphire" />
              </FormField>
              <FormField label="Slug" id="slug" required>
                <TextInput id="slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} />
              </FormField>
            </div>
            <FormField label="Description" id="description">
              <TextArea id="description" value={form.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Short description…" rows={3} />
            </FormField>
            <FormField label="Long Description" id="long_description">
              <TextArea id="long_description" value={form.long_description} onChange={(e) => updateField('long_description', e.target.value)} placeholder="Detailed description for gem detail page…" rows={5} />
            </FormField>
          </div>

          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
            <h3 className="text-sm font-semibold text-ink dark:text-white">Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <FormField label="Carat" id="carat">
                <TextInput id="carat" type="number" step="0.01" value={form.carat} onChange={(e) => updateField('carat', e.target.value)} />
              </FormField>
              <FormField label="Origin" id="origin">
                <TextInput id="origin" value={form.origin} onChange={(e) => updateField('origin', e.target.value)} />
              </FormField>
              <FormField label="Colour" id="colour">
                <TextInput id="colour" value={form.colour} onChange={(e) => updateField('colour', e.target.value)} />
              </FormField>
              <FormField label="Cut" id="cut">
                <TextInput id="cut" value={form.cut} onChange={(e) => updateField('cut', e.target.value)} />
              </FormField>
              <FormField label="Clarity" id="clarity">
                <TextInput id="clarity" value={form.clarity} onChange={(e) => updateField('clarity', e.target.value)} />
              </FormField>
              <FormField label="Price (USD)" id="price_usd">
                <TextInput id="price_usd" type="number" step="0.01" value={form.price_usd} onChange={(e) => updateField('price_usd', e.target.value)} />
              </FormField>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
            <h3 className="text-sm font-semibold text-ink dark:text-white">Settings</h3>
            <FormField label="Category" id="category">
              <SelectInput id="category" value={form.category} onChange={(e) => updateField('category', e.target.value)}>
                <option value="Precious">Precious</option>
                <option value="Semi-Precious">Semi-Precious</option>
                <option value="Rare">Rare</option>
              </SelectInput>
            </FormField>
            <FormField label="Sort Order" id="sort_order">
              <TextInput id="sort_order" type="number" value={form.sort_order} onChange={(e) => updateField('sort_order', parseInt(e.target.value) || 0)} />
            </FormField>
            <div className="space-y-3">
              <Toggle id="is_published" checked={form.is_published} onChange={(e) => updateField('is_published', e.target.checked)} label="Published" />
              <Toggle id="is_featured" checked={form.is_featured} onChange={(e) => updateField('is_featured', e.target.checked)} label="Featured on Homepage" />
              <Toggle id="is_certified" checked={form.is_certified} onChange={(e) => updateField('is_certified', e.target.checked)} label="Certified" />
              <Toggle id="is_sold" checked={form.is_sold} onChange={(e) => updateField('is_sold', e.target.checked)} label="Sold" />
              <Toggle id="price_visible" checked={form.price_visible} onChange={(e) => updateField('price_visible', e.target.checked)} label="Show Price" />
            </div>
          </div>

          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6">
            <ImageUpload label="Primary Image" value={form.image_url} publicId={form.image_public_id}
              onChange={(url, pid) => setForm((p) => ({ ...p, image_url: url, image_public_id: pid }))}
              folder="abeywardhane-gems/gems" aspect="square" />
          </div>
        </div>
      </form>
    </div>
  );
}
