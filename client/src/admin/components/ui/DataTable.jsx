import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';

/**
 * Reusable data table with sorting, searching, pagination, and row selection.
 *
 * @param {object} props
 * @param {Array<{ key: string, label: string, sortable?: boolean, render?: function, className?: string }>} props.columns
 * @param {Array} props.data
 * @param {function} [props.onRowClick]
 * @param {boolean} [props.selectable]
 * @param {function} [props.onSelectionChange]
 * @param {boolean} [props.loading]
 * @param {string} [props.emptyMessage]
 * @param {number} [props.pageSize]
 * @param {React.ReactNode} [props.actions] - Header actions slot
 */
export default function DataTable({
  columns, data = [], onRowClick, selectable, onSelectionChange,
  loading, emptyMessage = 'No items found', pageSize = 10, actions
}) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(new Set());

  // Filter data
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  // Sort data
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    onSelectionChange?.(Array.from(next));
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const all = new Set(paginated.map((r) => r.id));
      setSelected(all);
      onSelectionChange?.(Array.from(all));
    }
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-muted/40" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-sapphire" />
      : <ChevronDown className="w-3.5 h-3.5 text-sapphire" />;
  };

  return (
    <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-line dark:border-ink-line">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search…"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-cream dark:bg-ink-line/50 border border-transparent focus:border-sapphire/30 text-sm text-ink dark:text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sapphire/20 transition-all"
          />
        </div>
        {selected.size > 0 && (
          <span className="text-xs font-medium text-sapphire bg-sapphire/10 px-3 py-1.5 rounded-full">
            {selected.size} selected
          </span>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line dark:border-ink-line bg-cream/50 dark:bg-ink-deep/30">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={paginated.length > 0 && selected.size === paginated.length}
                    onChange={toggleAll}
                    className="rounded border-line dark:border-ink-line text-sapphire focus:ring-sapphire/30"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted ${col.className || ''} ${
                    col.sortable !== false ? 'cursor-pointer select-none hover:text-ink dark:hover:text-white' : ''
                  }`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable !== false && <SortIcon col={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line dark:divide-ink-line">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {selectable && <td className="px-4 py-4"><div className="w-4 h-4 bg-cream dark:bg-ink-line rounded animate-pulse" /></td>}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-4">
                      <div className="h-4 bg-cream dark:bg-ink-line rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`hover:bg-cream/50 dark:hover:bg-ink-line/30 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${selected.has(row.id) ? 'bg-sapphire/5 dark:bg-sapphire/10' : ''}`}
                >
                  {selectable && (
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() => toggleSelect(row.id)}
                        className="rounded border-line dark:border-ink-line text-sapphire focus:ring-sapphire/30"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 text-ink dark:text-white/90 ${col.className || ''}`}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-line dark:border-ink-line">
          <span className="text-xs text-muted">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-ink dark:hover:text-white hover:bg-cream dark:hover:bg-ink-line disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const p = totalPages <= 5 ? i : Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    p === page
                      ? 'bg-sapphire text-white'
                      : 'text-muted hover:text-ink dark:hover:text-white hover:bg-cream dark:hover:bg-ink-line'
                  }`}
                >
                  {p + 1}
                </button>
              );
            })}
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-ink dark:hover:text-white hover:bg-cream dark:hover:bg-ink-line disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
