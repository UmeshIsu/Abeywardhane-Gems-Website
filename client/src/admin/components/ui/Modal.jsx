import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';

/**
 * Reusable modal component.
 * @param {object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {string} [props.title]
 * @param {string} [props.size] - 'sm' | 'md' | 'lg' | 'xl'
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 */
export default function Modal({ open, onClose, title, size = 'md', children, footer }) {
  const handleEsc = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, handleEsc]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-ink rounded-2xl shadow-deep border border-line dark:border-ink-line animate-fade-up overflow-hidden`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-line dark:border-ink-line">
            <h3 className="text-lg font-semibold text-ink dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-ink dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-line dark:border-ink-line bg-cream/50 dark:bg-ink-deep/50 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Confirmation dialog helper.
 */
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = 'Delete', variant = 'danger', loading }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title || 'Confirm Action'}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ink dark:text-white hover:bg-cream dark:hover:bg-ink-line transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all flex items-center gap-2 ${
              variant === 'danger'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-sapphire hover:bg-sapphire-deep'
            } disabled:opacity-60`}
          >
            {loading && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-sm text-muted leading-relaxed">
        {message || 'Are you sure you want to proceed? This action cannot be undone.'}
      </p>
    </Modal>
  );
}
