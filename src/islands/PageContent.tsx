import { useEffect, useState } from 'react';
import { renderMarkdown } from '../lib/markdown';
import { getPageContent } from '../lib/queries';

interface PageContentProps {
  pageSlug: string;
  sectionSlug: string;
}

export default function PageContent({ pageSlug, sectionSlug }: PageContentProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPageContent(pageSlug, sectionSlug).then(async ({ data, error: err }) => {
      if (err) {
        setError(err);
      } else if (data) {
        setHtml(await renderMarkdown(data.body));
      }
      setLoading(false);
    });
  }, [pageSlug, sectionSlug]);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load content at this time.</p>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        <p>No content available yet.</p>
      </div>
    );
  }

  return (
    <div
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
