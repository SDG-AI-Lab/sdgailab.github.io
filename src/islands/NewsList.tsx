import { useEffect, useState } from 'react';
import { getPublishedNews } from '../lib/queries';
import type { NewsListItem } from '../lib/types';
import { withBase } from '../lib/url';

export default function NewsList() {
  const [articles, setArticles] = useState<NewsListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedNews().then(({ data, error: err }) => {
      if (err) setError(err);
      setArticles(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div
        className="h-36 rounded-xl border border-lab-border bg-lab-section"
        role="status"
        aria-label="Loading news"
      />
    );
  }

  return (
    <div>
      {error && (
        <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Newsroom updates are currently being refreshed.
        </p>
      )}
      {articles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-lab-border bg-lab-section p-8 text-center">
          <h3 className="text-lg font-bold text-lab-text">News and publications are being updated.</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-lab-muted">
            Published updates, publications and learning notes will be listed here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.id}
              href={withBase(`/news/detail/?slug=${article.slug}`)}
              className="group block overflow-hidden rounded-2xl bg-lab-surface ring-1 ring-lab-border/70 transition hover:-translate-y-1 hover:ring-lab-accent/55 hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
            >
              {article.featured_image_url && (
                <div className="aspect-video overflow-hidden bg-lab-section">
                  <img
                    src={article.featured_image_url}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-sm text-lab-subtle">
                  <time dateTime={article.publish_date}>
                    {new Date(article.publish_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {article.author_name && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span>{article.author_name}</span>
                    </>
                  )}
                </div>
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-lab-text transition-colors group-hover:text-lab-accent-soft">
                  {article.title}
                </h3>
                {article.summary && (
                  <p className="line-clamp-3 text-sm text-lab-muted">{article.summary}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
