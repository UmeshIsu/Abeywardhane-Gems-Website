import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import StatusBadge from '@/admin/components/ui/StatusBadge';
import Modal from '@/admin/components/ui/Modal';
import { MessageSquare, Eye, Archive, Reply } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ContactSubmissions() {
  const { logActivity } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  async function markAs(id, status) {
    const updates = { status };
    if (status === 'read') updates.read_at = new Date().toISOString();
    if (status === 'replied') updates.replied_at = new Date().toISOString();
    const { error } = await supabase.from('contact_submissions').update(updates).eq('id', id);
    if (!error) {
      toast.success(`Marked as ${status}`);
      setItems((p) => p.map((i) => i.id === id ? { ...i, ...updates } : i));
      if (selected?.id === id) setSelected((p) => ({ ...p, ...updates }));
    }
  }

  const columns = [
    { key: 'name', label: 'Name', render: (val, row) => (<div><div className="font-medium text-ink dark:text-white">{val}</div><div className="text-xs text-muted">{row.email}</div></div>) },
    { key: 'subject', label: 'Subject', render: (val) => val || '—' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'created_at', label: 'Date', render: (val) => val ? format(new Date(val), 'MMM d, yyyy') : '—' },
    { key: 'actions', label: '', sortable: false, render: (_, row) => (
      <button onClick={(e) => { e.stopPropagation(); setSelected(row); if (row.status === 'new') markAs(row.id, 'read'); }}
        className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Eye className="w-4 h-4" /></button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-white">Contact Messages</h1>
        <p className="text-sm text-muted mt-1">{items.filter((i) => i.status === 'new').length} unread messages</p>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onRowClick={(r) => { setSelected(r); if (r.status === 'new') markAs(r.id, 'read'); }} emptyMessage="No messages yet." />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Contact Message" size="md"
        footer={<>
          <button onClick={() => markAs(selected?.id, 'replied')} className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-2"><Reply className="w-4 h-4" />Mark Replied</button>
          <button onClick={() => { markAs(selected?.id, 'archived'); setSelected(null); }} className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:bg-cream dark:hover:bg-ink-line flex items-center gap-2"><Archive className="w-4 h-4" />Archive</button>
        </>}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><div className="text-xs text-muted mb-1">Name</div><div className="text-sm font-medium text-ink dark:text-white">{selected.name}</div></div>
              <div><div className="text-xs text-muted mb-1">Email</div><div className="text-sm font-medium text-ink dark:text-white">{selected.email}</div></div>
              {selected.phone && <div><div className="text-xs text-muted mb-1">Phone</div><div className="text-sm text-ink dark:text-white">{selected.phone}</div></div>}
              <div><div className="text-xs text-muted mb-1">Date</div><div className="text-sm text-ink dark:text-white">{selected.created_at ? format(new Date(selected.created_at), 'PPp') : '—'}</div></div>
            </div>
            {selected.subject && <div><div className="text-xs text-muted mb-1">Subject</div><div className="text-sm text-ink dark:text-white">{selected.subject}</div></div>}
            <div><div className="text-xs text-muted mb-1">Message</div><div className="text-sm text-ink dark:text-white whitespace-pre-wrap bg-cream dark:bg-ink-deep p-4 rounded-xl">{selected.message}</div></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
