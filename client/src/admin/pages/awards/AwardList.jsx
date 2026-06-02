import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import StatusBadge from '@/admin/components/ui/StatusBadge';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AwardList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); const { data } = await supabase.from('awards').select('*').order('sort_order'); setItems(data || []); setLoading(false); }
  async function handleDelete() {
    setDeleting(true);
    await supabase.from('awards').delete().eq('id', deleteId);
    toast.success('Deleted'); await logActivity('delete', 'award', deleteId);
    setItems((p) => p.filter((i) => i.id !== deleteId));
    setDeleteId(null); setDeleting(false);
  }

  const columns = [
    { key: 'title', label: 'Award', render: (val, row) => (<div><div className="font-medium text-ink dark:text-white">{val}</div><div className="text-xs text-muted">{row.issuer}</div></div>) },
    { key: 'year', label: 'Year' },
    { key: 'is_published', label: 'Status', render: (val) => <StatusBadge status={val ? 'published' : 'draft'} /> },
    { key: 'actions', label: '', sortable: false, render: (_, row) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate(`/admin/awards/${row.id}`)} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Awards & Certificates</h1><p className="text-sm text-muted mt-1">Manage awards and certifications</p></div>
        <Link to="/admin/awards/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all"><Plus className="w-4 h-4" />Add Award</Link>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onRowClick={(r) => navigate(`/admin/awards/${r.id}`)} emptyMessage="No awards yet." />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Award" loading={deleting} />
    </div>
  );
}
