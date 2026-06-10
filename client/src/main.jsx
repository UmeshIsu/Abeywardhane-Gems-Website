import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.jsx';
import './styles/index.css';

// Build-time prerender of public routes (static HTML + per-page <head>),
// with client-side hydration. Admin routes stay client-only.
export const createRoot = ViteReactSSG({ routes });
