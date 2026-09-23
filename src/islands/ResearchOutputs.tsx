import { useEffect, useMemo, useState } from 'react';
import { getPublishedPublications } from '../lib/queries';
import type { PublicationListItem, PublicationType } from '../lib/types';

type Filter = 'all' | PublicationType;

const filters: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All outputs' },
  { id: 'academic_paper', label: 'Academic papers' },
  { id: 'report', label: 'Reports' },
  { id: 'brief_white_paper', label: 'Briefs & white papers' },
  { id: 'dataset', label: 'Datasets' },
];

const typeLabels: Record<PublicationType, string> = {
  report: 'Report',
  brief_white_paper: 'Brief / white paper',
  academic_paper: 'Academic paper',
  dataset: 'Dataset',
};

const typeCoverLabels: Record<PublicationType, string> = {
  report: 'Report',
  brief_white_paper: 'Brief',
  academic_paper: 'Academic paper',
  dataset: 'Dataset',
};

function dateForCard(publication: PublicationListItem): string | null {
  if (publication.date_label?.trim()) return publication.date_label;
  if (publication.publication_date) return String(new Date(`${publication.publication_date}T00:00:00`).getFullYear());
  return null;
}

export default function ResearchOutputs() {
  const [publications, setPublications] = useState<PublicationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    let cancelled = false;
    getPublishedPublications()
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        setPublications(data);
        setError(fetchError);
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load research outputs.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visiblePublications = useMemo(
    () => publications.filter((publication) => filter === 'all' || publication.publication_type === filter),
    [filter, publications]
  );

  return (
    <div className="research-outputs">
      <div className="research-toolbar" role="group" aria-label="Filter by output type">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`research-filter ${filter === item.id ? 'active' : ''}`}
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? <p className="research-status">Loading research outputs…</p> : null}
      {!loading && error ? <p className="research-status">Research outputs are temporarily unavailable.</p> : null}
      {!loading && !error && visiblePublications.length === 0 ? (
        <p className="research-empty">No published outputs are available in this category yet.</p>
      ) : null}

      <div className="output-grid" aria-live="polite">
        {visiblePublications.map((publication) => {
          const date = dateForCard(publication);
          return (
            <article className="output-card" key={publication.id}>
              <a
                className="output-link"
                href={publication.source_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${publication.title}`}
              >
                <div className={`output-cover output-cover--${publication.publication_type}`}>
                  {publication.cover_image_url ? (
                    <img src={publication.cover_image_url} alt="" loading="lazy" />
                  ) : (
                    <span>{typeCoverLabels[publication.publication_type]}</span>
                  )}
                </div>
                <div className="output-meta">
                  <span>{typeLabels[publication.publication_type]}</span>
                  {date ? <span>{date}</span> : null}
                </div>
                <h2>{publication.title}</h2>
                <p>{publication.summary}</p>
                <span className="output-more">Open output <span aria-hidden="true">→</span></span>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
