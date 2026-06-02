import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/admin/context/AuthContext';
import { Gem, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-cream dark:bg-ink-deep">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sapphire mb-4">
            <Gem className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-ink dark:text-white">Reset Password</h1>
          <p className="text-muted mt-2 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white dark:bg-ink rounded-2xl shadow-soft p-8 border border-line dark:border-ink-line">
          {sent ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-ink dark:text-white mb-2">Check your email</h3>
              <p className="text-muted text-sm mb-6">
                We've sent a password reset link to <strong className="text-ink dark:text-white">{email}</strong>.
                Please check your inbox and spam folder.
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-sm text-sapphire hover:text-sapphire-deep transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@abeywardhanegems.com"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-line dark:border-ink-line bg-cream/50 dark:bg-ink-deep/50 text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-sapphire hover:bg-sapphire-deep text-white font-semibold text-sm shadow-glow hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
