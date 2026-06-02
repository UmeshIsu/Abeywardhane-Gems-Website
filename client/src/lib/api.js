import axios from 'axios';
import { supabase } from './supabase';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const contactApi = {
  submit: (payload) => api.post('/contact', payload).then((r) => r.data),
};

export const blogsApi = {
  list: async () => {
    const { data, error } = await supabase
      .from('v_blog_published')
      .select('*');
    if (error) throw error;
    // Map view format to expected UI format
    return (data || []).map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.cover_image_url,
      category: post.category || 'Gems',
      date: post.published_at 
        ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Recent'
    }));
  }
};

export const galleryApi = {
  list: async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_published', true)
      .order('sort_order');
    if (error) throw error;
    return (data || []).map(img => ({
      id: img.id,
      name: img.title || '',
      description: img.description || '',
      tag: img.category || 'Gallery',
      image: img.image_url
    }));
  }
};

export const exhibitionsApi = {
  list: async () => {
    const { data, error } = await supabase
      .from('exhibitions')
      .select('*')
      .order('sort_order');
    if (error) throw error;
    return (data || []).map(ex => ({
      id: ex.id,
      title: ex.title,
      location: ex.location,
      year: ex.year,
      src: ex.image_url,
      label: 'Exhibition photo',
      filename: ex.image_public_id
    }));
  }
};

export const awardsApi = {
  list: async () => {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .eq('is_published', true)
      .order('sort_order');
    if (error) throw error;
    return (data || []).map(aw => ({
      id: aw.id,
      title: aw.title,
      issuer: aw.issuer,
      year: aw.year,
      src: aw.image_url,
      label: 'Award photo',
      filename: aw.image_public_id
    }));
  }
};
