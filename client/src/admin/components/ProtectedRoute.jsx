import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/admin/context/AuthContext';

/**
 * Route guard — redirects to login if not authenticated.
 * Optionally checks for a specific permission.
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}> ... child routes ... </Route>
 *   <Route element={<ProtectedRoute permission="manageUsers" />}> ... </Route>
 */
export default function ProtectedRoute({ children, permission }) {
  const { isAuthenticated, loading, can } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-ink">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-sapphire/30 border-t-sapphire rounded-full animate-spin" />
          <p className="text-muted text-sm">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (permission && !can(permission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-ink">
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-ink dark:text-white mb-2">Access Denied</h2>
          <p className="text-muted text-sm">You don't have permission to view this page. Contact your administrator if you need access.</p>
        </div>
      </div>
    );
  }

  return children;
}
