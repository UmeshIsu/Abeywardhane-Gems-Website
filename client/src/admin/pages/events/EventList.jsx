import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import StatusBadge from '@/admin/components/ui/StatusBadge';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function EventList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false }); setItems(data || []); setLoading(false); }
  async function handleDelete() {
    const item = items.find((i) => i.id === deleteId);
    await supabase.from('events').delete().eq('id', deleteId);
    toast.success('Deleted'); await logActivity('delete', 'event', deleteId, item?.name);
    setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null);
  }

  const columns = [
    { key: 'name', label: 'Event', render: (val, row) => (<div><div className="font-medium text-ink dark:text-white">{val}</div><div className="text-xs text-muted">{row.venue}{row.country ? `, ${row.country}` : ''}</div></div>) },
    { key: 'event_date', label: 'Date', render: (val) => val ? format(new Date(val), 'MMM d, yyyy') : '—' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val || 'upcoming'} /> },
    { key: 'actions', label: '', sortable: false, render: (_, row) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate(`/admin/events/${row.id}`)} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Events</h1><p className="text-sm text-muted mt-1">Manage upcoming and past events</p></div>
        <Link to="/admin/events/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all"><Plus className="w-4 h-4" />Add Event</Link>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onRowClick={(r) => navigate(`/admin/events/${r.id}`)} emptyMessage="No events yet." />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Event" />
    </div>
  );
}
