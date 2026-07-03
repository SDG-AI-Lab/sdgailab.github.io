import { useEffect, useState } from 'react';
import { getPublishedNews } from '../lib/queries';
import type { NewsListItem } from '../lib/types';
import { withBase } from '../lib/url';
import { sampleNews } from '../data/sampleContent';

export default function NewsList() {
  const [articles, setArticles] = useState<NewsListItem[]>(sampleNews);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedNews().then(({ data, error: err }) => {
      if (err) setError(err);
      setArticles(data.length > 0 ? data : sampleNews);
    });
  }, []);

  return (
    <div>
      {error && <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Live newsroom data is temporarily unavailable. The cards below demonstrate the planned publication format.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <a
          key={article.id}
          href={withBase(`/news/detail/?slug=${article.slug}`)}
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
    </div>
  );
}
