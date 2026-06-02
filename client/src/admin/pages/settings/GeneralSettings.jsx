import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea } from '@/admin/components/ui/FormField';
import { Save, Globe, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';

const settingFields = [
  { key: 'site_name', label: 'Company Name', icon: Globe },
  { key: 'phone', label: 'Phone Number', icon: Phone },
  { key: 'phone_raw', label: 'Phone (dialable)', icon: Phone, helper: 'For tel: links e.g. +94740304669' },
  { key: 'email', label: 'Email Address', icon: Mail },
  { key: 'whatsapp_number', label: 'WhatsApp Number', icon: Phone, helper: 'International format without +' },
  { key: 'address', label: 'Address', icon: MapPin },
  { key: 'google_maps_embed', label: 'Google Maps Embed URL', icon: MapPin },
  { key: 'facebook_url', label: 'Facebook URL', icon: Facebook },
  { key: 'instagram_url', label: 'Instagram URL', icon: Instagram },
  { key: 'meta_description', label: 'Default SEO Description', icon: Globe, multiline: true },
];

export default function GeneralSettings() {
  const { logActivity } = useAuth();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*');
    const map = {};
    (data || []).forEach((s) => { map[s.key] = s.value; });
    setSettings(map);
    setLoading(false);
  }

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  async function handleSave() {
    setSaving(true);
    const upserts = Object.entries(settings).map(([key, value]) => ({
      key, value: value || '', updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' });
    if (error) toast.error(error.message);
    else {
      toast.success('Settings saved');
      await logActivity('update', 'settings', null, 'Site settings updated');
    }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-white">Website Settings</h1>
          <p className="text-sm text-muted mt-1">Manage company information and site configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>

      <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
        {settingFields.map((field) => (
          <FormField key={field.key} label={field.label} id={field.key} helperText={field.helper}>
            {field.multiline ? (
              <TextArea id={field.key} value={settings[field.key] || ''} onChange={(e) => update(field.key, e.target.value)} rows={3} />
            ) : (
              <TextInput id={field.key} value={settings[field.key] || ''} onChange={(e) => update(field.key, e.target.value)} />
            )}
          </FormField>
        ))}
      </div>
    </div>
  );
}
