import { useEffect, useState } from 'react';
import { samplePublications } from '../data/sampleContent';
import { getPublishedNews } from '../lib/queries';
import type { NewsListItem } from '../lib/types';
import { withBase } from '../lib/url';

function PublicationCard({ publication }: { publication: NewsListItem }) {
  const href = withBase(`/news/detail/?slug=${publication.slug}`);
  const showSummary = !publication.featured_image_url && publication.summary;

  return (
    <article className="flex h-full flex-col">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-lab-text">Publications</p>

      {publication.featured_image_url ? (
        <a href={href} className="group mt-4 block overflow-hidden">
          <img
            src={publication.featured_image_url}
            alt=""
            className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </a>
      ) : null}

      <h2 className="mt-4 text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-tight text-lab-text">
        <a href={href} className="transition hover:text-lab-accent-soft">
          {publication.title}
        </a>
      </h2>

      {showSummary ? (
        <p className="mt-4 flex-1 text-base leading-7 text-lab-muted">{publication.summary}</p>
      ) : (
        <div className="flex-1" />
      )}

      <a
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lab-accent-soft transition hover:text-lab-text"
      >
        Read more
        <span aria-hidden="true">&gt;</span>
      </a>
    </article>
  );
}

export default function PublicationsList() {
  const [publications, setPublications] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedNews().then(({ data }) => {
      setPublications(data.length > 0 ? data : samplePublications);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading publications">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-lg bg-lab-section" />
        ))}
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <p className="text-center text-lg text-lab-muted">No publications are available yet.</p>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
