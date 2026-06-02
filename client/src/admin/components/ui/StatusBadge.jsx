/**
 * Status badge pill.
 * @param {'published'|'draft'|'upcoming'|'completed'|'cancelled'|'new'|'read'|'replied'|'archived'|'active'|'inactive'} status
 */
export default function StatusBadge({ status, className = '' }) {
  const styles = {
    published: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400',
    draft:     'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-400',
    upcoming:  'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800/30 dark:text-slate-400',
    cancelled: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-400',
    new:       'bg-sapphire/10 text-sapphire ring-sapphire/20 dark:bg-sapphire/20',
    read:      'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800/30 dark:text-slate-400',
    replied:   'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400',
    archived:  'bg-gray-100 text-gray-600 ring-gray-500/20 dark:bg-gray-800/30 dark:text-gray-400',
    active:    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400',
    inactive:  'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800/30 dark:text-slate-400',
  };

  const labels = {
    published: 'Published',
    draft: 'Draft',
    upcoming: 'Upcoming',
    completed: 'Completed',
    cancelled: 'Cancelled',
    new: 'New',
    read: 'Read',
    replied: 'Replied',
    archived: 'Archived',
    active: 'Active',
    inactive: 'Inactive',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.68rem] font-semibold ring-1 ring-inset ${styles[status] || styles.draft} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'published' || status === 'active' || status === 'replied' ? 'bg-emerald-500' :
        status === 'draft' || status === 'upcoming' ? 'bg-amber-500' :
        status === 'new' ? 'bg-sapphire' :
        status === 'cancelled' ? 'bg-red-500' :
        'bg-slate-400'
      }`} />
      {labels[status] || status}
    </span>
  );
}
