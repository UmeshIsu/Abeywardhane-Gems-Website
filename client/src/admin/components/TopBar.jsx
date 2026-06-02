import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import { getRoleLabel, getRoleBadgeClass } from '@/admin/lib/permissions';
import {
  Menu, Search, Bell, Moon, Sun, LogOut, User, ChevronDown, ExternalLink,
  FileText, Image, Trophy, Award
} from 'lucide-react';

export default function TopBar({ onMenuClick, darkMode, onDarkModeToggle }) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState({
    blogs: [],
    gallery: [],
    exhibitions: [],
    awards: []
  });

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut (⌘K or Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search query handler
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults({ blogs: [], gallery: [], exhibitions: [], awards: [] });
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setSearching(true);
      try {
        const query = searchQuery.trim();
        const [blogsRes, galleryRes, exhibitionsRes, awardsRes] = await Promise.all([
          supabase.from('blog_posts').select('id, title').ilike('title', `%${query}%`).limit(5),
          supabase.from('gallery_images').select('id, title, category').ilike('title', `%${query}%`).limit(5),
          supabase.from('exhibitions').select('id, title').ilike('title', `%${query}%`).limit(5),
          supabase.from('awards').select('id, title').ilike('title', `%${query}%`).limit(5),
        ]);

        setSearchResults({
          blogs: blogsRes.data || [],
          gallery: galleryRes.data || [],
          exhibitions: exhibitionsRes.data || [],
          awards: awardsRes.data || []
        });
      } catch (err) {
        console.error('TopBar search error:', err);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchDropdown(false);
    inputRef.current?.blur();
  };

  const totalResults =
    searchResults.blogs.length +
    searchResults.gallery.length +
    searchResults.exhibitions.length +
    searchResults.awards.length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-ink/80 backdrop-blur-xl border-b border-line dark:border-ink-line flex items-center px-4 lg:px-6 gap-4">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-ink dark:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Global search bar */}
      <div className="flex-1 max-w-md relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search content… (⌘K)"
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-cream dark:bg-ink-line/50 border border-transparent focus:border-sapphire/30 text-sm text-ink dark:text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sapphire/20 transition-all"
          />
          {searching ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-sapphire/30 border-t-sapphire rounded-full animate-spin" />
          ) : (
            <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[0.6rem] font-mono text-muted/60 border border-line dark:border-ink-line bg-white dark:bg-ink">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Global Search Results Dropdown */}
        {showSearchDropdown && searchQuery.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-ink rounded-xl shadow-deep border border-line dark:border-ink-line overflow-hidden max-h-[350px] overflow-y-auto z-50 animate-fade-up">
            {searching ? (
              <div className="p-4 text-center text-sm text-muted flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-sapphire/30 border-t-sapphire rounded-full animate-spin" />
                Searching database…
              </div>
            ) : totalResults === 0 ? (
              <div className="p-4 text-center text-sm text-muted">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="divide-y divide-line dark:divide-ink-line">
                {/* Blogs */}
                {searchResults.blogs.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1 text-[0.6rem] font-bold text-muted uppercase tracking-wider">
                      Blog Posts
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {searchResults.blogs.map((post) => (
                        <button
                          key={post.id}
                          onClick={() => handleNavigate(`/admin/blogs/${post.id}`)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink dark:text-white/80 hover:bg-cream dark:hover:bg-ink-line text-left transition-colors group"
                        >
                          <FileText className="w-4 h-4 text-muted group-hover:text-sapphire shrink-0" />
                          <span className="truncate">{post.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {searchResults.gallery.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1 text-[0.6rem] font-bold text-muted uppercase tracking-wider">
                      Gallery Images
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {searchResults.gallery.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => handleNavigate(`/admin/gallery`)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink dark:text-white/80 hover:bg-cream dark:hover:bg-ink-line text-left transition-colors group"
                        >
                          <Image className="w-4 h-4 text-muted group-hover:text-sapphire shrink-0" />
                          <span className="truncate">
                            {img.title || img.category || 'Unnamed Image'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exhibitions */}
                {searchResults.exhibitions.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1 text-[0.6rem] font-bold text-muted uppercase tracking-wider">
                      Exhibitions
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {searchResults.exhibitions.map((ex) => (
                        <button
                          key={ex.id}
                          onClick={() => handleNavigate(`/admin/exhibitions/${ex.id}`)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink dark:text-white/80 hover:bg-cream dark:hover:bg-ink-line text-left transition-colors group"
                        >
                          <Trophy className="w-4 h-4 text-muted group-hover:text-sapphire shrink-0" />
                          <span className="truncate">{ex.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards */}
                {searchResults.awards.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1 text-[0.6rem] font-bold text-muted uppercase tracking-wider">
                      Awards
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {searchResults.awards.map((aw) => (
                        <button
                          key={aw.id}
                          onClick={() => handleNavigate(`/admin/awards/${aw.id}`)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink dark:text-white/80 hover:bg-cream dark:hover:bg-ink-line text-left transition-colors group"
                        >
                          <Award className="w-4 h-4 text-muted group-hover:text-sapphire shrink-0" />
                          <span className="truncate">{aw.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* View website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-ink dark:hover:text-white hover:bg-cream dark:hover:bg-ink-line transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </a>

        {/* Dark mode toggle */}
        <button
          onClick={onDarkModeToggle}
          className="w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-ink dark:hover:text-white transition-colors"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-ink dark:hover:text-white transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sapphire rounded-full ring-2 ring-white dark:ring-ink" />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-line dark:bg-ink-line mx-1" />

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-cream dark:hover:bg-ink-line transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sapphire to-electric flex items-center justify-center text-white text-xs font-bold">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-ink dark:text-white truncate max-w-[120px]">
                {profile?.full_name || 'Admin'}
              </div>
              <div className="text-[0.65rem] text-muted truncate">
                {profile?.role ? getRoleLabel(profile.role) : 'Loading…'}
              </div>
            </div>
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-muted" />
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-ink rounded-xl shadow-deep border border-line dark:border-ink-line overflow-hidden animate-fade-up">
              <div className="p-3 border-b border-line dark:border-ink-line">
                <div className="text-sm font-medium text-ink dark:text-white truncate">
                  {profile?.full_name || 'Admin User'}
                </div>
                <div className="text-xs text-muted truncate">{user?.email}</div>
                {profile?.role && (
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[0.6rem] font-semibold ${getRoleBadgeClass(profile.role)}`}>
                    {getRoleLabel(profile.role)}
                  </span>
                )}
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setShowUserMenu(false); navigate('/admin/settings'); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-ink dark:text-white/80 hover:bg-cream dark:hover:bg-ink-line transition-colors"
                >
                  <User className="w-4 h-4 text-muted" />
                  Profile & Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
