import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import StatusBadge from '@/admin/components/ui/StatusBadge';
import { ConfirmDialog } from '@/admin/components/ui/Modal';
import { Plus, Pencil, Trash2, Download } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Papa from 'papaparse';

export default function BlogList() {
  const navigate = useNavigate();
  const { logActivity } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, blog_categories(name)')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const post = posts.find((p) => p.id === deleteId);
    const { error } = await supabase.from('blog_posts').delete().eq('id', deleteId);
    if (error) {
      toast.error('Failed to delete post');
    } else {
      toast.success('Post deleted');
      await logActivity('delete', 'blog', deleteId, post?.title);
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
    }
    setDeleteId(null);
    setDeleting(false);
  }

  const exportCSV = () => {
    const csv = Papa.unparse(posts.map(({ id, title, slug, is_published, created_at }) => ({
      title, slug, status: is_published ? 'published' : 'draft', created: created_at
    })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'blog-posts.csv'; a.click();
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.cover_image_url && (
            <img src={row.cover_image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
          )}
          <div>
            <div className="font-medium text-ink dark:text-white truncate max-w-[300px]">{val}</div>
            <div className="text-xs text-muted">/{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'blog_categories',
      label: 'Category',
      render: (val) => val?.name || '—',
    },
    {
      key: 'is_published',
      label: 'Status',
      render: (val) => <StatusBadge status={val ? 'published' : 'draft'} />,
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (val) => val ? format(new Date(val), 'MMM d, yyyy') : '—',
    },
    {
      key: 'actions',
      label: '',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/admin/blogs/${row.id}`)}
            className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-muted hover:text-red-500 transition-colors"
          >
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
          <h1 className="text-2xl font-bold text-ink dark:text-white">Blog Posts</h1>
          <p className="text-sm text-muted mt-1">Manage your blog content</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        loading={loading}
        onRowClick={(row) => navigate(`/admin/blogs/${row.id}`)}
        selectable
        emptyMessage="No blog posts yet. Create your first post!"
        actions={
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-ink dark:hover:text-white hover:bg-cream dark:hover:bg-ink-line transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        }
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="This will permanently delete this blog post. This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
}
