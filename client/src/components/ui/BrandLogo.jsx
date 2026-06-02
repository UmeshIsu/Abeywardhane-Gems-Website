import { Link } from 'react-router-dom';

export default function BrandLogo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display font-semibold text-xl tracking-wide text-ink ${className}`}>
      <img
        src="/logo-mark.png"
        alt="Abeywardhane Gems"
        className="w-10 h-10 object-contain shrink-0"
        style={{
          filter:
            'drop-shadow(0 0 1px rgba(15,23,42,0.55)) drop-shadow(0 0 1px rgba(15,23,42,0.45)) drop-shadow(0 3px 5px rgba(15,23,42,0.25))',
        }}
      />
      <span>
        Abeywardhane <em className="not-italic text-gold" style={{ fontStyle: 'italic' }}>Gems</em>
      </span>
    </Link>
  );
}
