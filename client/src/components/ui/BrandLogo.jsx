import { Link } from 'react-router-dom';

export default function BrandLogo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display font-semibold text-xl tracking-wide uppercase text-white ${className}`}>
      <img
        src="/logo-mark.png"
        alt="Abeywardhane Gems"
        className="w-10 h-10 object-contain shrink-0"
      />
      <span>Abeywardhane Gems</span>
    </Link>
  );
}
