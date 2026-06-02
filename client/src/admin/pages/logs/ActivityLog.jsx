import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import DataTable from '@/admin/components/ui/DataTable';
import { format } from 'date-fns';
import { Activity, Download } from 'lucide-react';
import Papa from 'papaparse';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(200);
    setLogs(data || []);
    setLoading(false);
  }

  const exportCSV = () => {
    const csv = Papa.unparse(logs.map((l) => ({ action: l.action, entity_type: l.entity_type, entity_title: l.entity_title, date: l.created_at })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'activity-logs.csv'; a.click();
  };

  const actionColors = {
    create: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    update: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    delete: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    login: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    logout: 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400',
  };

  const columns = [
    { key: 'action', label: 'Action', render: (val) => <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold capitalize ${actionColors[val] || actionColors.update}`}>{val}</span> },
    { key: 'entity_type', label: 'Type', render: (val) => <span className="capitalize">{val || '—'}</span> },
    { key: 'entity_title', label: 'Details', render: (val) => <span className="text-sm truncate block max-w-[250px]">{val || '—'}</span> },
    { key: 'created_at', label: 'Date', render: (val) => val ? format(new Date(val), 'MMM d, yyyy · h:mm a') : '—' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-ink dark:text-white">Activity Logs</h1><p className="text-sm text-muted mt-1">Track all admin actions</p></div>
      </div>
      <DataTable columns={columns} data={logs} loading={loading} emptyMessage="No activity logged yet."
        actions={<button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-ink dark:hover:text-white hover:bg-cream dark:hover:bg-ink-line transition-colors"><Download className="w-3.5 h-3.5" />Export</button>} />
    </div>
  );
}
