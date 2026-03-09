import { useEffect, useState } from 'react';
import { getPublishedNews } from '../lib/queries';
import type { NewsListItem } from '../lib/types';

export default function NewsList() {
  const [articles, setArticles] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedNews().then(({ data, error: err }) => {
      if (err) setError(err);
      else setArticles(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading news...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load news at this time.</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        <p>No news articles yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <a
          key={article.id}
          href={`/news/detail/?slug=${article.slug}`}
          className="group block rounded-lg bg-white shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
        >
          {article.featured_image_url && (
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={article.featured_image_url}
                alt=""
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
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
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {article.title}
            </h3>
            {article.summary && (
              <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
