import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-dark-mode') === 'true';
    }
    return false;
  });

  // Apply dark class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('admin-dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-cream dark:bg-ink-deep flex">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#1E293B' : '#fff',
            color: darkMode ? '#F8FAFD' : '#0F172A',
            border: `1px solid ${darkMode ? '#334155' : '#E6EBF3'}`,
            borderRadius: '12px',
            fontSize: '0.875rem',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onMenuClick={() => setMobileOpen(true)}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
