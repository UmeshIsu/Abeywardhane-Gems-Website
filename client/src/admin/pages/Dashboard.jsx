import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import StatsCard from '@/admin/components/ui/StatsCard';
import {
  FileText, Image, Trophy, Award, MessageSquare, Plus, ArrowRight, Clock, User
} from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    blogs: 0, gallery: 0, exhibitions: 0, awards: 0, contacts: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const [
        { count: blogs },
        { count: gallery },
        { count: exhibitions },
        { count: awards },
        { count: contacts },
        { data: activity }
      ] = await Promise.all([
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
        supabase.from('exhibitions').select('*', { count: 'exact', head: true }),
        supabase.from('awards').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      setStats({
        blogs: blogs || 0,
        gallery: gallery || 0,
        exhibitions: exhibitions || 0,
        awards: awards || 0,
        contacts: contacts || 0,
      });
      setRecentActivity(activity || []);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { label: 'New Blog Post', to: '/admin/blogs/new', icon: FileText, color: 'bg-sapphire' },
    { label: 'Upload Image', to: '/admin/gallery', icon: Image, color: 'bg-purple-500' },
    { label: 'Add Exhibition', to: '/admin/exhibitions/new', icon: Trophy, color: 'bg-amber-500' },
    { label: 'Add Award', to: '/admin/awards/new', icon: Award, color: 'bg-rose-500' },
  ];

  const getActivityIcon = (action) => {
    const icons = { create: Plus, update: FileText, delete: MessageSquare, login: User };
    return icons[action] || Clock;
  };

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-white">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Admin'}
          </h1>
          <p className="text-muted text-sm mt-1">
            Here's what's happening with your website today.
          </p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sapphire hover:bg-sapphire-deep text-white rounded-xl text-sm font-semibold shadow-glow hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatsCard title="Blog Posts" value={stats.blogs} icon={FileText} color="blue" />
        <StatsCard title="Gallery Images" value={stats.gallery} icon={Image} color="purple" />
        <StatsCard title="Exhibitions" value={stats.exhibitions} icon={Trophy} color="amber" />
        <StatsCard title="Awards" value={stats.awards} icon={Award} color="rose" />
        <StatsCard
          title="Unread Messages"
          value={stats.contacts}
          icon={MessageSquare}
          color="blue"
          subtitle="Contact submissions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-5">
          <h2 className="text-sm font-semibold text-ink dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream dark:hover:bg-ink-line transition-colors group"
              >
                <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-sm font-medium text-ink dark:text-white flex-1">{action.label}</span>
                <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink dark:text-white">Recent Activity</h2>
            <Link to="/admin/logs" className="text-xs text-sapphire hover:text-sapphire-deep transition-colors">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted py-8 text-center">No recent activity</p>
            ) : (
              recentActivity.slice(0, 8).map((item) => {
                const Icon = getActivityIcon(item.action);
                return (
                  <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/50 dark:hover:bg-ink-line/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-cream dark:bg-ink-line flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink dark:text-white truncate">
                        <span className="font-medium capitalize">{item.action}</span>
                        {item.entity_type && (
                          <span className="text-muted"> · {item.entity_type}</span>
                        )}
                        {item.entity_title && (
                          <span className="text-muted"> · {item.entity_title}</span>
                        )}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {item.created_at ? format(new Date(item.created_at), 'MMM d, yyyy · h:mm a') : ''}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
