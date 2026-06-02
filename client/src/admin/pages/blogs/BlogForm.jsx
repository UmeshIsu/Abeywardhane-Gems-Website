import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import FormField, { TextInput, TextArea, SelectInput, Toggle } from '@/admin/components/ui/FormField';
import ImageUpload from '@/admin/components/ui/ImageUpload';
import RichTextEditor from '@/admin/components/ui/RichTextEditor';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logActivity, user } = useAuth();
  const isEditing = id && id !== 'new';

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    cover_image_url: '',
    cover_image_public_id: '',
    is_published: false,
    published_at: '',
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    loadCategories();
    if (isEditing) loadPost();
  }, [id]);

  async function loadCategories() {
    const { data } = await supabase.from('blog_categories').select('*').order('sort_order');
    setCategories(data || []);
  }

  async function loadPost() {
    setLoading(true);
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (data) {
      setForm({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category_id: data.category_id || '',
        cover_image_url: data.cover_image_url || '',
        cover_image_public_id: data.cover_image_public_id || '',
        is_published: data.is_published || false,
        published_at: data.published_at ? data.published_at.split('T')[0] : '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
      });
    }
    setLoading(false);
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const updateField = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'title' && !isEditing) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error('Title and slug are required');
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      author_id: user?.id,
      published_at: form.is_published && !form.published_at
        ? new Date().toISOString()
        : form.published_at || null,
      category_id: form.category_id || null,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('blog_posts').insert(payload));
    }

    if (error) {
      toast.error(error.message || 'Failed to save post');
    } else {
      toast.success(isEditing ? 'Post updated' : 'Post created');
      await logActivity(isEditing ? 'update' : 'create', 'blog', id, form.title);
      navigate('/admin/blogs');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-ink dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-ink dark:text-white">
            {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all disabled:opacity-60"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving…' : 'Save Post'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
            <FormField label="Title" id="title" required>
              <TextInput
                id="title"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter post title"
              />
            </FormField>

            <FormField label="Slug" id="slug" required helperText="URL-friendly identifier">
              <TextInput
                id="slug"
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder="post-url-slug"
              />
            </FormField>

            <FormField label="Excerpt" id="excerpt" helperText="Short description shown in listings">
              <TextArea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="Brief summary of the post…"
                rows={3}
              />
            </FormField>

            <FormField label="Content" id="content" required>
              <RichTextEditor
                content={form.content}
                onChange={(html) => updateField('content', html)}
                placeholder="Write your blog post content here…"
              />
            </FormField>
          </div>

          {/* SEO */}
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
            <h3 className="text-sm font-semibold text-ink dark:text-white">SEO Settings</h3>
            <FormField label="Meta Title" id="meta_title">
              <TextInput
                id="meta_title"
                value={form.meta_title}
                onChange={(e) => updateField('meta_title', e.target.value)}
                placeholder="SEO title (defaults to post title)"
              />
            </FormField>
            <FormField label="Meta Description" id="meta_description">
              <TextArea
                id="meta_description"
                value={form.meta_description}
                onChange={(e) => updateField('meta_description', e.target.value)}
                placeholder="SEO description…"
                rows={2}
              />
            </FormField>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish settings */}
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-5">
            <h3 className="text-sm font-semibold text-ink dark:text-white">Publish</h3>
            <Toggle
              id="is_published"
              checked={form.is_published}
              onChange={(e) => updateField('is_published', e.target.checked)}
              label="Published"
            />
            <FormField label="Publish Date" id="published_at">
              <TextInput
                id="published_at"
                type="date"
                value={form.published_at}
                onChange={(e) => updateField('published_at', e.target.value)}
              />
            </FormField>
            <FormField label="Category" id="category_id">
              <SelectInput
                id="category_id"
                value={form.category_id}
                onChange={(e) => updateField('category_id', e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </SelectInput>
            </FormField>
          </div>

          {/* Featured image */}
          <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-6 space-y-4">
            <h3 className="text-sm font-semibold text-ink dark:text-white">Featured Image</h3>
            <ImageUpload
              value={form.cover_image_url}
              publicId={form.cover_image_public_id}
              onChange={(url, publicId) => {
                updateField('cover_image_url', url);
                setForm((prev) => ({ ...prev, cover_image_public_id: publicId }));
              }}
              folder="abeywardhane-gems/blog"
              aspect="landscape"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
