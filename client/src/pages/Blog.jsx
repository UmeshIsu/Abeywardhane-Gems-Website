import { useEffect, useState } from 'react';
import { blogsApi } from '@/lib/api';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import { absoluteUrl } from '@/lib/seo';

const staticBlogs = [
  {
    slug: "ceylon-blue-sapphires",
    title: "Ceylon Blue Sapphires: The Story Behind the Stone",
    excerpt: "From the riverbeds of Ratnapura to the world's finest jewellery houses — discover what makes Ceylon blue sapphires the most sought-after gems on the planet.",
    category: "Gems",
    date: "April 08, 2023",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80"
  },
  {
    slug: "why-ceylon-gems",
    title: "Why These Gorgeous Gemstones From Sri Lanka Captivate Collectors",
    excerpt: "Sri Lanka — known as Ratna-Dweepa or 'Gem Island' — has produced extraordinary gemstones for centuries. Here's why connoisseurs keep coming back.",
    category: "Gem Tourism",
    date: "April 08, 2023",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80"
  },
  {
    slug: "custom-design-process",
    title: "From Sketch to Heirloom: Our Custom Jewellery Design Process",
    excerpt: "A behind-the-scenes look at how we turn an idea into a finished piece of jewellery — and why the gemstone always leads the design.",
    category: "Jewellery",
    date: "March 22, 2023",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80"
  }
];

export default function Blog() {
  // Seed with the static posts so they're present in the prerendered HTML;
  // live DB posts replace them on the client when available.
  const [posts, setPosts] = useState(staticBlogs);
  const [loading] = useState(false);

  useEffect(() => {
    blogsApi
      .list()
      .then((data) => {
        if (data && data.length > 0) setPosts(data);
      })
      .catch((err) => {
        console.warn('Failed to fetch dynamic blog posts, using fallback static data:', err);
      });
  }, []);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": posts.length,
    "itemListElement": posts.map((post, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": absoluteUrl(`/blog#${post.slug}`),
      "name": post.title,
      "description": post.excerpt,
      "image": post.image
    }))
  };

  return (
    <>
      <SEO
        title="Ceylon Gemstone Guides, Sapphire News & Mining Stories"
        description="Expert guides on Ceylon sapphire quality, gemstone authentication and certification, custom jewellery design, and the Ratnapura gem mining trade."
        path="/blog"
        schema={blogSchema}
      />
      <PageHeader
        eyebrow="Read the Latest"
        title="News & Stories"
        breadcrumb={[{ label: 'Abeywardhane Gems', to: '/' }, { label: 'Blog' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-x">
          {loading ? (
            <p className="text-muted text-center">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-muted text-center">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.1}>
                  <article className="group">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-cream">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <div className="text-xs tracking-[0.2em] uppercase text-sapphire font-semibold mb-2">
                      {post.date} · {post.category}
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-ink group-hover:text-sapphire transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted mt-2 line-clamp-3">{post.excerpt}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
