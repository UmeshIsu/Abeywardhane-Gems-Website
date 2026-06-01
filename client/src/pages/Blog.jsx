import { useEffect, useState } from 'react';
import { blogsApi } from '@/lib/api';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsApi
      .list()
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Read the Latest"
        title="News & Stories"
        breadcrumb={[{ label: 'Abeywardana Gems', to: '/' }, { label: 'Blog' }]}
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
