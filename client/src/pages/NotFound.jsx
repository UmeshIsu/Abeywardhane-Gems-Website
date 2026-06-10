import Button from '@/components/ui/Button';
import SEO from '@/components/layout/SEO';

export default function NotFound() {
  return (
    <section className="min-h-screen grid place-items-center bg-cream pt-32 pb-20">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist or has been moved." noindex />
      <div className="text-center container-x">
        <div className="font-display text-[8rem] leading-none text-sapphire mb-4">404</div>
        <h1 className="font-display text-3xl text-ink mb-3">Page not found</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button to="/" variant="primary">Back to Home</Button>
      </div>
    </section>
  );
}
