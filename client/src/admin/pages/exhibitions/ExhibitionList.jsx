import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import StatusBadge from '@/admin/components/ui/StatusBadge';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

/*
 * Exhibitions are stored in `service_images` (section = 'exhibitions'), where
 * each exhibition is a GROUP of photos sharing the same title. This manager
 * lists one row per exhibition (grouped by title) with a photo count.
 */
export default function ExhibitionList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('service_images')
      .select('*')
      .eq('section', 'exhibitions')
      .order('created_at', { ascending: true });

    // Group rows into one entry per exhibition (by title).
    const map = new Map();
    const groups = [];
    (data || []).forEach((r) => {
      const key = r.title || '(Untitled exhibition)';
      if (!map.has(key)) {
        const g = {
          id: key,                 // group key = title (unique per exhibition)
          title: r.title || '(Untitled exhibition)',
          location: r.location || '',
          year: r.year || '',
          image_url: r.image_url,  // cover = first photo
          service_id: r.service_id,
          count: 0,
          is_published: true,
        };
        map.set(key, g);
        groups.push(g);
      }
      map.get(key).count += 1;
    });
    setItems(groups);
    setLoading(false);
  }

  async function handleDelete() {
    setDeleting(true);
    const item = items.find((i) => i.id === deleteId);
    const { error } = await supabase
      .from('service_images')
      .delete()
      .eq('section', 'exhibitions')
      .eq('title', deleteId);
    if (!error) {
      toast.success('Exhibition deleted');
      await logActivity('delete', 'exhibition', deleteId, item?.title);
      setItems((p) => p.filter((i) => i.id !== deleteId));
    } else {
      toast.error(error.message);
    }
    setDeleteId(null);
    setDeleting(false);
  }

  const columns = [
    {
      key: 'title', label: 'Exhibition',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.image_url && <img src={row.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />}
          <div>
            <div className="font-medium text-ink dark:text-white">{val}</div>
            <div className="text-xs text-muted">{row.location}</div>
          </div>
        </div>
      ),
    },
    { key: 'year', label: 'Year' },
    { key: 'count', label: 'Photos', render: (val) => <span className="text-sm text-ink dark:text-white">{val}</span> },
    { key: 'is_published', label: 'Status', render: (val) => <StatusBadge status={val ? 'published' : 'draft'} /> },
    {
      key: 'actions', label: '', sortable: false,
      render: (_, row) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => navigate(`/admin/exhibitions/${encodeURIComponent(row.id)}`)} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Pencil className="w-4 h-4" /></button>
          <button onClick={() => setDeleteId(row.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Exhibitions</h1><p className="text-sm text-muted mt-1">Manage international exhibitions</p></div>
        <Link to="/admin/exhibitions/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all"><Plus className="w-4 h-4" />Add Exhibition</Link>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onRowClick={(r) => navigate(`/admin/exhibitions/${encodeURIComponent(r.id)}`)} emptyMessage="No exhibitions yet." />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Exhibition" loading={deleting} />
    </div>
  );
}
