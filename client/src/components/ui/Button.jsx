import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary:
    'bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-ink border border-ink/15 hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5',
  dark: 'bg-ink text-white hover:bg-[#16223f] hover:-translate-y-0.5',
  white: 'bg-white text-ink hover:bg-cream hover:-translate-y-0.5 shadow-soft',
  outlineLight:
    'bg-transparent text-white border border-white/25 hover:bg-white/10 hover:-translate-y-0.5',
};

export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  icon = true,
  onClick,
  type = 'button',
  className = '',
  external = false,
  ...rest
}) {
  const cls = `group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] tracking-wide overflow-hidden transition-all duration-300 ${variants[variant]} ${className}`;

  const content = (
    <>
      {/* subtle light sweep on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowRight
          size={16}
          strokeWidth={2.4}
          className="relative transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href)
    return (
      <a href={href} className={cls} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} {...rest}>
        {content}
      </a>
    );
  return <button type={type} onClick={onClick} className={cls} {...rest}>{content}</button>;
}
