/**
 * Reusable form field wrapper with label, error state, and helper text.
 */
export default function FormField({
  label, id, error, helperText, required, children, className = ''
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-ink dark:text-white mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-muted">{helperText}</p>
      )}
    </div>
  );
}

/**
 * Styled text input.
 */
export function TextInput({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl border border-line dark:border-ink-line bg-white dark:bg-ink-deep/50 text-ink dark:text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all text-sm ${className}`}
    />
  );
}

/**
 * Styled textarea.
 */
export function TextArea({ className = '', rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl border border-line dark:border-ink-line bg-white dark:bg-ink-deep/50 text-ink dark:text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all text-sm resize-y ${className}`}
    />
  );
}

/**
 * Styled select.
 */
export function SelectInput({ className = '', children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl border border-line dark:border-ink-line bg-white dark:bg-ink-deep/50 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-sapphire/30 focus:border-sapphire transition-all text-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2364748B%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.75rem] bg-[length:1.25rem] pr-10 ${className}`}
    >
      {children}
    </select>
  );
}

/**
 * Styled toggle switch.
 */
export function Toggle({ checked, onChange, label, id }) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-10 h-6 bg-gray-200 dark:bg-ink-line peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sapphire/30 rounded-full peer peer-checked:bg-sapphire transition-colors" />
        <div className="absolute left-[3px] top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
      </div>
      {label && <span className="text-sm text-ink dark:text-white">{label}</span>}
    </label>
  );
}
