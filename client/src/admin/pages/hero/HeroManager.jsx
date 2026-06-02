import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea, Toggle } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HeroManager() {
  const { logActivity } = useAuth();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('hero_slides').select('*').order('sort_order');
    setSlides(data || []);
    setLoading(false);
  }

  const updateSlide = (id, key, val) => {
    setSlides((prev) => prev.map((s) => s.id === id ? { ...s, [key]: val } : s));
  };

  async function saveSlide(slide) {
    setSaving(true);
    const { id, created_at, ...rest } = slide;
    const { error } = await supabase.from('hero_slides').update(rest).eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Slide saved'); await logActivity('update', 'hero_slide', id, slide.eyebrow); }
    setSaving(false);
  }

  async function addSlide() {
    const { data, error } = await supabase.from('hero_slides').insert({
      sort_order: slides.length + 1, eyebrow: 'New Slide', text_prefix: '', text_emphasis: 'Your text here',
      text_suffix: '.', subtitle: 'Enter subtitle', cta_label: 'Learn More', cta_link: '/',
      pager_num: String(slides.length + 1).padStart(2, '0'), pager_label: 'New Slide',
      is_active: false,
    }).select().single();
    if (data) { setSlides((p) => [...p, data]); setExpandedId(data.id); toast.success('Slide added'); }
  }

  async function handleDelete() {
    await supabase.from('hero_slides').delete().eq('id', deleteId);
    toast.success('Slide deleted');
    setSlides((p) => p.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Hero Slides</h1><p className="text-sm text-muted mt-1">Manage homepage carousel slides</p></div>
        <button onClick={addSlide} className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all"><Plus className="w-4 h-4" />Add Slide</button>
      </div>

      <div className="space-y-3">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-cream/50 dark:hover:bg-ink-line/30 transition-colors"
              onClick={() => setExpandedId(expandedId === slide.id ? null : slide.id)}>
              <GripVertical className="w-4 h-4 text-muted/40" />
              <div className="flex-1">
                <span className="text-sm font-medium text-ink dark:text-white">{slide.pager_num} — {slide.eyebrow}</span>
              </div>
              <Toggle id={`active-${slide.id}`} checked={slide.is_active}
                onChange={(e) => { e.stopPropagation(); updateSlide(slide.id, 'is_active', e.target.checked); saveSlide({ ...slide, is_active: e.target.checked }); }}
                label={slide.is_active ? 'Active' : 'Inactive'} />
              {expandedId === slide.id ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
            </div>

            {/* Expanded form */}
            {expandedId === slide.id && (
              <div className="px-4 pb-4 pt-2 border-t border-line dark:border-ink-line space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Eyebrow" id={`eye-${slide.id}`}><TextInput value={slide.eyebrow} onChange={(e) => updateSlide(slide.id, 'eyebrow', e.target.value)} /></FormField>
                  <FormField label="Pager Number" id={`pn-${slide.id}`}><TextInput value={slide.pager_num} onChange={(e) => updateSlide(slide.id, 'pager_num', e.target.value)} /></FormField>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Text Prefix"><TextInput value={slide.text_prefix} onChange={(e) => updateSlide(slide.id, 'text_prefix', e.target.value)} /></FormField>
                  <FormField label="Emphasis (blue)"><TextInput value={slide.text_emphasis} onChange={(e) => updateSlide(slide.id, 'text_emphasis', e.target.value)} /></FormField>
                  <FormField label="Text Suffix"><TextInput value={slide.text_suffix} onChange={(e) => updateSlide(slide.id, 'text_suffix', e.target.value)} /></FormField>
                </div>
                <FormField label="Subtitle"><TextArea value={slide.subtitle} onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)} rows={2} /></FormField>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField label="CTA Label"><TextInput value={slide.cta_label} onChange={(e) => updateSlide(slide.id, 'cta_label', e.target.value)} /></FormField>
                  <FormField label="CTA Link"><TextInput value={slide.cta_link} onChange={(e) => updateSlide(slide.id, 'cta_link', e.target.value)} /></FormField>
                  <FormField label="Secondary Label"><TextInput value={slide.cta_secondary_label || ''} onChange={(e) => updateSlide(slide.id, 'cta_secondary_label', e.target.value)} /></FormField>
                  <FormField label="Secondary Link"><TextInput value={slide.cta_secondary_link || ''} onChange={(e) => updateSlide(slide.id, 'cta_secondary_link', e.target.value)} /></FormField>
                </div>
                <FormField label="Pager Label"><TextInput value={slide.pager_label} onChange={(e) => updateSlide(slide.id, 'pager_label', e.target.value)} /></FormField>
                <ImageUpload label="Slide Image" value={slide.image_url || ''} onChange={(url, pid) => { updateSlide(slide.id, 'image_url', url); updateSlide(slide.id, 'image_public_id', pid); }} folder="abeywardhane-gems/hero" />
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => saveSlide(slide)} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire hover:bg-sapphire-deep text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60">
                    <Save className="w-4 h-4" /> Save Slide
                  </button>
                  <button onClick={() => setDeleteId(slide.id)} className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Slide" message="Remove this hero slide?" />
    </div>
  );
}
