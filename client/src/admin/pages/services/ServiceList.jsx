import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ServiceList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); const { data } = await supabase.from('services').select('*').order('sort_order'); setItems(data || []); setLoading(false); }
  async function handleDelete() {
    await supabase.from('services').delete().eq('id', deleteId);
    toast.success('Deleted'); setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null);
  }

  const columns = [
    { key: 'title', label: 'Service', render: (val, row) => (<div><div className="font-medium text-ink dark:text-white">{val}</div><div className="text-xs text-muted">/{row.slug}</div></div>) },
    { key: 'tag', label: 'Tag' },
    { key: 'sort_order', label: 'Order' },
    { key: 'actions', label: '', sortable: false, render: (_, row) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate(`/admin/services/${row.id}`)} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink dark:text-white">Services</h1><p className="text-sm text-muted mt-1">Manage website services</p></div>
      <DataTable columns={columns} data={items} loading={loading} onRowClick={(r) => navigate(`/admin/services/${r.id}`)} emptyMessage="No services found." />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Service" />
    </div>
  );
}
