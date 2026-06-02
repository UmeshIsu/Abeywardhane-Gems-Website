import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, SelectInput } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { ArrowLeft, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

/*
 * An "exhibition" is a group of service_images rows (section = 'exhibitions')
 * that share a title. This form manages the whole group: its metadata plus
 * however many photos it has.
 */
export default function ExhibitionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const isEditing = id && id !== 'new';
  const groupTitle = isEditing ? decodeURIComponent(id) : '';

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service_id: '', title: '', location: '', year: new Date().getFullYear().toString(), sort_order: 0,
  });
  const [images, setImages] = useState([]);        // [{ id?, image_url, image_public_id }]
  const [originalImages, setOriginalImages] = useState([]);

  useEffect(() => { init(); }, [id]);

  async function init() {
    // Load services for the dropdown; default new exhibitions to International Market.
    const { data: svc } = await supabase.from('services').select('id,title,slug').order('sort_order');
    const list = svc || [];
    setServices(list);
    const defaultSvc = list.find((s) => s.slug === 'international-market') || list[0];

    if (isEditing) {
      const { data } = await supabase
        .from('service_images')
        .select('*')
        .eq('section', 'exhibitions')
        .eq('title', groupTitle)
        .order('created_at', { ascending: true });
      const rows = data || [];
      if (rows.length) {
        const first = rows[0];
        setForm({
          service_id: first.service_id || defaultSvc?.id || '',
          title: first.title || '',
          location: first.location || '',
          year: first.year || '',
          sort_order: first.sort_order || 0,
        });
        const imgs = rows.map((r) => ({ id: r.id, image_url: r.image_url, image_public_id: r.image_public_id }));
        setImages(imgs);
        setOriginalImages(imgs);
      }
      setLoading(false);
    } else {
      setForm((p) => ({ ...p, service_id: defaultSvc?.id || '' }));
    }
  }

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const addImage = (url, publicId) => {
    if (url) setImages((p) => [...p, { image_url: url, image_public_id: publicId }]);
  };
  const removeImage = (idx) => setImages((p) => p.filter((_, i) => i !== idx));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.service_id) { toast.error('Please choose a service'); return; }
    if (images.length === 0) { toast.error('Add at least one photo'); return; }

    setSaving(true);
    const meta = {
      service_id: form.service_id,
      section: 'exhibitions',
      title: form.title.trim(),
      location: form.location || null,
      year: form.year || null,
      sort_order: Number(form.sort_order) || 0,
    };

    let error = null;
    if (!isEditing) {
      const rows = images.map((img) => ({ ...meta, image_url: img.image_url, image_public_id: img.image_public_id }));
      ({ error } = await supabase.from('service_images').insert(rows));
    } else {
      const currentIds = images.filter((i) => i.id).map((i) => i.id);
      const deleteIds = originalImages.filter((o) => !currentIds.includes(o.id)).map((o) => o.id);
      const newRows = images
        .filter((i) => !i.id)
        .map((img) => ({ ...meta, image_url: img.image_url, image_public_id: img.image_public_id }));

      if (deleteIds.length) {
        const r = await supabase.from('service_images').delete().in('id', deleteIds);
        error = error || r.error;
      }
      if (currentIds.length) {
        const r = await supabase.from('service_images').update(meta).in('id', currentIds);
        error = error || r.error;
      }
      if (newRows.length) {
        const r = await supabase.from('service_images').insert(newRows);
        error = error || r.error;
      }
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isEditing ? 'Updated' : 'Created');
      await logActivity(isEditing ? 'update' : 'create', 'exhibition', null, form.title);
      navigate('/admin/exhibitions');
    }
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
          <FormField label="Title" id="title" required><TextInput id="title" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="2024 Shanghai International Gem & Jewellery Exhibition" /></FormField>
          <FormField label="Service" id="service_id" required>
            <SelectInput id="service_id" value={form.service_id} onChange={(e) => update('service_id', e.target.value)}>
              <option value="" disabled>Select a service…</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </SelectInput>
          </FormField>
          <FormField label="Location" id="location"><TextInput id="location" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Shanghai, China" /></FormField>
          <FormField label="Year" id="year"><TextInput id="year" value={form.year} onChange={(e) => update('year', e.target.value)} /></FormField>
          <FormField label="Sort Order" id="sort_order"><TextInput id="sort_order" type="number" value={form.sort_order} onChange={(e) => update('sort_order', parseInt(e.target.value) || 0)} /></FormField>
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-2">Photos ({images.length})</label>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {images.map((img, idx) => (
                <div key={img.id || img.image_public_id || idx} className="relative group rounded-lg overflow-hidden border border-line dark:border-ink-line aspect-square">
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <ImageUpload label="Add a photo" value="" onChange={addImage} folder="abeywardhane-gems/exhibitions" aspect="landscape" />
          <p className="mt-1.5 text-xs text-muted">Upload one photo at a time — each is added to this exhibition.</p>
        </div>
      </form>
    </div>
  );
}
