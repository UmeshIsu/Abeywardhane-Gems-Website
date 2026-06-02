import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import StatusBadge from '@/admin/components/ui/StatusBadge';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GemList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadGems(); }, []);

  async function loadGems() {
    setLoading(true);
    const { data } = await supabase.from('gems').select('*').order('sort_order');
    setGems(data || []);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const gem = gems.find((g) => g.id === deleteId);
    const { error } = await supabase.from('gems').delete().eq('id', deleteId);
    if (!error) {
      toast.success('Gem deleted');
      await logActivity('delete', 'gem', deleteId, gem?.name);
      setGems((prev) => prev.filter((g) => g.id !== deleteId));
    } else toast.error('Failed to delete gem');
    setDeleteId(null);
    setDeleting(false);
  }

  const columns = [
    {
      key: 'name', label: 'Gem',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.image_url ? (
            <img src={row.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-cream dark:bg-ink-line" />
          )}
          <div>
            <div className="font-medium text-ink dark:text-white">{val}</div>
            <div className="text-xs text-muted">{row.origin || '—'}</div>
          </div>
        </div>
      ),
    },
    { key: 'category', label: 'Category' },
    { key: 'carat', label: 'Carat', render: (val) => val ? `${val} ct` : '—' },
    {
      key: 'is_published', label: 'Status',
      render: (val) => <StatusBadge status={val ? 'published' : 'draft'} />,
    },
    {
      key: 'is_featured', label: 'Featured',
      render: (val) => val ? <span className="text-xs font-medium text-amber-600">★ Featured</span> : '—',
    },
    {
      key: 'actions', label: '', sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => navigate(`/admin/gems/${row.id}`)} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeleteId(row.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-white">Gem Collection</h1>
          <p className="text-sm text-muted mt-1">Manage your gemstone catalog</p>
        </div>
        <Link to="/admin/gems/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all">
          <Plus className="w-4 h-4" /> Add Gem
        </Link>
      </div>
      <DataTable columns={columns} data={gems} loading={loading} onRowClick={(row) => navigate(`/admin/gems/${row.id}`)} selectable emptyMessage="No gems in the collection yet." />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Gem" message="This will permanently remove this gemstone from the collection." loading={deleting} />
    </div>
  );
}
