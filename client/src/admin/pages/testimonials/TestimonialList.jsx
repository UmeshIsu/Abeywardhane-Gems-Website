import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestimonialList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  }
  async function handleDelete() {
    setDeleting(true);
    const item = items.find((i) => i.id === deleteId);
    await supabase.from('testimonials').delete().eq('id', deleteId);
    toast.success('Deleted');
    await logActivity('delete', 'testimonial', deleteId, item?.name);
    setItems((p) => p.filter((i) => i.id !== deleteId));
    setDeleteId(null); setDeleting(false);
  }

  const columns = [
    {
      key: 'name', label: 'Client',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.avatar_url ? <img src={row.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover" /> : <div className="w-9 h-9 rounded-full bg-sapphire/10 flex items-center justify-center text-sapphire text-xs font-bold">{val?.charAt(0)}</div>}
          <div><div className="font-medium text-ink dark:text-white">{val}</div><div className="text-xs text-muted">{row.role || row.country}</div></div>
        </div>
      ),
    },
    { key: 'quote', label: 'Review', render: (val) => <span className="text-sm text-muted truncate block max-w-[300px]">{val}</span> },
    { key: 'rating', label: 'Rating', render: (val) => val ? <div className="flex">{Array.from({ length: val }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div> : '—' },
    {
      key: 'actions', label: '', sortable: false,
      render: (_, row) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => navigate(`/admin/testimonials/${row.id}`)} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Pencil className="w-4 h-4" /></button>
          <button onClick={() => setDeleteId(row.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Testimonials</h1><p className="text-sm text-muted mt-1">Client reviews and feedback</p></div>
        <Link to="/admin/testimonials/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all"><Plus className="w-4 h-4" />Add Testimonial</Link>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onRowClick={(r) => navigate(`/admin/testimonials/${r.id}`)} emptyMessage="No testimonials yet." />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Testimonial" loading={deleting} />
    </div>
  );
}
