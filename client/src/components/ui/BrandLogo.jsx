import { Link } from 'react-router-dom';

export default function BrandLogo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display font-semibold text-xl tracking-wide text-ink ${className}`}>
      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-sapphire to-sapphire-deep grid place-items-center shadow-[0_6px_16px_rgba(47,76,219,0.3)] shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M2 9h20M9 3l3 6 3-6M12 9l-2 12M12 9l2 12" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </span>
      <span>
        Abeywardhane <em className="not-italic text-gold" style={{ fontStyle: 'italic' }}>Gems</em>
      </span>
    </Link>
  );
}
