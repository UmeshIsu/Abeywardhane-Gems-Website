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
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    const rows = (data || []).filter((img) => img.image_url);

    // Service-section images are synced with the (long) service title as their
    // category. Resolve their real section so the gallery filter tabs read
    // cleanly ("Exhibitions", "Awards", …) instead of the full service name.
    const titleCase = (s) =>
      String(s || '')
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const sectionIds = rows
      .filter((r) => r.source_table === 'service_images' && r.source_id)
      .map((r) => r.source_id);
    const sectionById = {};
    if (sectionIds.length) {
      const { data: si } = await supabase
        .from('service_images')
        .select('id,section')
        .in('id', sectionIds);
      (si || []).forEach((s) => {
        sectionById[s.id] = s.section;
      });
    }

    const tagFor = (img) => {
      if (img.source_table === 'service_images' && sectionById[img.source_id]) {
        return titleCase(sectionById[img.source_id]);
      }
      return img.category || 'Gallery';
    };

    return rows.map((img) => ({
      id: img.id,
      name: img.title || '',
      description: img.description || '',
      tag: tagFor(img),
      image: img.image_url,
    }));
  }
};

/*
 * Exhibitions & Awards can live in two places:
 *   1. service_images  → rows tagged section = 'exhibitions' / 'awards'
 *      (where the live, seeded data sits and where service-section uploads land)
 *   2. the standalone exhibitions / awards tables → where the admin
 *      Exhibition/Award forms write.
 * We read BOTH and merge (de-duped) so existing data and any future admin
 * upload both appear. Sources are queried independently — if one errors
 * (empty/locked table) the other still renders.
 */
async function fetchSectionImages(sections) {
  const { data, error } = await supabase
    .from('service_images')
    .select('*')
    .in('section', sections)
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true });
  if (error) return [];
  return data || [];
}

export const exhibitionsApi = {
  list: async () => {
    const out = [];
    const seen = new Set();
    const push = (row, src) => {
      if (!src) return;
      // One card per exhibition — dedupe by identity (title/location/year),
      // not per image, so an exhibition with many photos shows a single card.
      const key = [row.title, row.location, row.year]
        .map((v) => String(v || '').trim().toLowerCase())
        .join('|');
      if (seen.has(key)) return;
      seen.add(key);
      out.push({
        id: row.id,
        title: row.title,
        location: row.location,
        year: row.year,
        src,
        label: 'Exhibition photo',
        filename: row.image_public_id || row.id,
      });
    };

    (await fetchSectionImages(['exhibitions', 'exhibition'])).forEach((r) => push(r, r.image_url));

    const { data: tbl, error } = await supabase
      .from('exhibitions')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false });
    if (!error) {
      (tbl || []).filter((ex) => ex.is_published !== false).forEach((ex) => push(ex, ex.image_url));
    }

    return out;
  }
};

export const awardsApi = {
  list: async () => {
    const out = [];
    const seen = new Set();
    const push = (row, src) => {
      if (!src) return;
      // One card per award — dedupe by identity (title/issuer/year).
      const key = [row.title, row.issuer, row.year]
        .map((v) => String(v || '').trim().toLowerCase())
        .join('|');
      if (seen.has(key)) return;
      seen.add(key);
      out.push({
        id: row.id,
        title: row.title,
        issuer: row.issuer,
        year: row.year,
        src,
        label: 'Award photo',
        filename: row.image_public_id || row.id,
      });
    };

    (await fetchSectionImages(['awards', 'award'])).forEach((r) => push(r, r.image_url));

    const { data: tbl, error } = await supabase
      .from('awards')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false });
    if (!error) {
      (tbl || []).filter((aw) => aw.is_published !== false).forEach((aw) => push(aw, aw.image_url));
    }

    return out;
  }
};

/*
 * Generic helper for any service-detail page that wants its own
 * section images (e.g. Gem Tourism → 'destinations', 'experiences').
 */
export const serviceImagesApi = {
  bySection: async (serviceSlug, section) => {
    const { data: svc } = await supabase
      .from('services')
      .select('id')
      .eq('slug', serviceSlug)
      .maybeSingle();
    if (!svc) return [];
    const { data, error } = await supabase
      .from('service_images')
      .select('*')
      .eq('service_id', svc.id)
      .eq('section', section)
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true });
    if (error) return [];
    return (data || [])
      .filter((r) => r.image_url)
      .map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        location: r.location,
        year: r.year,
        issuer: r.issuer,
        src: r.image_url,
        filename: r.image_public_id || r.id,
      }));
  }
};
