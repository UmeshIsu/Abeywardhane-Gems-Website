import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/admin/context/AuthContext';
import {
  LayoutDashboard, FileText, Gem, Image, Trophy, Star, Award,
  CalendarDays, Settings, Users, Activity, MessageSquare, Layers,
  Monitor, ChevronLeft, ChevronRight, Sparkles, X
} from 'lucide-react';

const navSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Blog Posts', to: '/admin/blogs', icon: FileText, permission: 'manageBlog' },
      { label: 'Gallery', to: '/admin/gallery', icon: Image, permission: 'manageGallery' },
      { label: 'Exhibitions', to: '/admin/exhibitions', icon: Trophy, permission: 'manageExhibitions' },
      { label: 'Awards', to: '/admin/awards', icon: Award, permission: 'manageAwards' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Contact Messages', to: '/admin/contacts', icon: MessageSquare, permission: 'viewContacts' },
      { label: 'Media Library', to: '/admin/media', icon: Image, permission: 'manageBlog' },
      { label: 'Website Settings', to: '/admin/settings', icon: Settings, permission: 'manageSettings' },
      { label: 'Users', to: '/admin/users', icon: Users, permission: 'manageUsers' },
      { label: 'Activity Logs', to: '/admin/logs', icon: Activity, permission: 'viewLogs' },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { can } = useAuth();
  const location = useLocation();

  const sidebarClasses = collapsed
    ? 'w-[72px]'
    : 'w-[260px]';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50
          flex flex-col bg-ink dark:bg-ink-deep border-r border-ink-line
          transition-all duration-300 ease-in-out
          ${sidebarClasses}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] shrink-0">
          <div className="w-9 h-9 rounded-lg bg-sapphire flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-display text-sm font-semibold text-white truncate">
                Abeywardhane
              </div>
              <div className="text-[0.65rem] text-white/40 uppercase tracking-wider">
                Admin Panel
              </div>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="lg:hidden ml-auto w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {navSections.map((section) => {
            const visibleItems = section.items.filter(
              (item) => !item.permission || can(item.permission)
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={section.title} className="mb-6">
                {!collapsed && (
                  <div className="px-4 mb-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/25">
                    {section.title}
                  </div>
                )}
                <ul className="space-y-0.5 px-2">
                  {visibleItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={onMobileClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${collapsed ? 'justify-center' : ''}
                          ${
                            isActive
                              ? 'bg-sapphire/15 text-sapphire'
                              : 'text-white/50 hover:text-white/80 hover:bg-white/[0.06]'
                          }`
                        }
                        title={collapsed ? item.label : undefined}
                      >
                        <item.icon className="w-[18px] h-[18px] shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:flex items-center justify-center h-12 border-t border-white/[0.06] shrink-0">
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
