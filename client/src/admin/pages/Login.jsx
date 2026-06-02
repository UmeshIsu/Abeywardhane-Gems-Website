import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/admin/context/AuthContext';
import { Gem, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ink items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-sapphire-dark to-ink opacity-80" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-sapphire/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-electric/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-lg px-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl mb-8 ring-1 ring-white/20">
            <Gem className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-4xl font-medium text-white mb-4">
            Abeywardhane Gems
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Content Management System — Manage your website content, media,
            blog posts, gem collections, and more from one centralized dashboard.
          </p>
          <div className="mt-12 flex items-center justify-center gap-8 text-white/40 text-xs tracking-widest uppercase">
            <span>Secure</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Scalable</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Professional</span>
          </div>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-ink-deep">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sapphire mb-4">
              <Gem className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
              Abeywardhane Gems
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-ink dark:text-white">
              Welcome back
            </h2>
            <p className="text-muted mt-2 text-sm">
              Sign in to your admin account to manage website content.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@abeywardhanegems.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-line dark:border-ink-line bg-cream/50 dark:bg-ink/50 text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-line dark:border-ink-line bg-cream/50 dark:bg-ink/50 text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-sapphire hover:text-sapphire-deep transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-sapphire hover:bg-sapphire-deep text-white font-semibold text-sm shadow-glow hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted">
            Protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
