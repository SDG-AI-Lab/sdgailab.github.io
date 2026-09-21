import { useEffect, useMemo, useState } from 'react';
import { getPublishedProjects } from '../lib/queries';
import { withBase } from '../lib/url';
import type { ProjectListItem } from '../lib/types';

type Workstream = 'all' | 'gis' | 'nlp' | 'training' | 'other';
type ProjectStatusLabel = 'ongoing' | 'completed';

type PortfolioCard = ProjectListItem & {
  workstream: Exclude<Workstream, 'all'>;
  label: string;
  statusLabel: ProjectStatusLabel;
  yearLabel: string;
  summaryLabel: string;
  code: string;
};

function toStatus(project: ProjectListItem): ProjectStatusLabel {
  return project.project_status === 'completed' ? 'completed' : 'ongoing';
}

function toWorkstream(project: ProjectListItem): Exclude<Workstream, 'all'> {
  const text = [
    project.work_stream,
    project.impact_area,
    project.project_category,
    ...(project.capabilities_involved ?? []),
    ...(project.tech_stack ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (/(gis|geo|remote|satellite|map|mapping|spatial)/.test(text)) return 'gis';
  if (/(nlp|gen ai|language|llm|machine learning|chatbot|document|text|ai)/.test(text)) return 'nlp';
  if (/(training|course|fellowship|capacity|bootcamp|learning)/.test(text)) return 'training';
  return 'other';
}

function toWorkstreamLabel(workstream: Exclude<Workstream, 'all'>): string {
  if (workstream === 'gis') return 'GIS & GeoAI';
  if (workstream === 'nlp') return 'NLP & Gen AI';
  if (workstream === 'training') return 'Training';
  return 'Other';
}

function toCode(workstream: Exclude<Workstream, 'all'>): string {
  if (workstream === 'gis') return 'GIS';
  if (workstream === 'nlp') return 'NLP';
  if (workstream === 'training') return 'TR';
  return 'R&D';
}

function toYear(project: ProjectListItem): string {
  return project.project_year ? String(project.project_year) : 'Year TBC';
}

function toSummary(project: ProjectListItem): string {
  return project.summary?.trim() || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}

function toCard(project: ProjectListItem): PortfolioCard {
  const workstream = toWorkstream(project);
  return {
    ...project,
    workstream,
    label: toWorkstreamLabel(workstream),
    statusLabel: toStatus(project),
    yearLabel: toYear(project),
    summaryLabel: toSummary(project),
    code: toCode(workstream),
  };
}

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workstreamFilter, setWorkstreamFilter] = useState<Workstream>('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;

    getPublishedProjects()
      .then(({ data, error }) => {
        if (cancelled) return;
        setProjects(data);
        setError(error);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Unable to load projects.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => projects.map(toCard), [projects]);
  const countries = useMemo(() => Array.from(new Set(cards.flatMap((project) => project.implementation_countries ?? []).filter(Boolean))).sort(), [cards]);
  const years = useMemo(() => Array.from(new Set(cards.map((project) => project.project_year).filter((year): year is number => Boolean(year)))).sort((a, b) => b - a), [cards]);
  const filteredCards = useMemo(
    () =>
      cards.filter((project) => {
        const workstreamMatch = workstreamFilter === 'all' || project.workstream === workstreamFilter;
        const countryMatch = countryFilter === 'all' || (project.implementation_countries ?? []).includes(countryFilter);
        const yearMatch = yearFilter === 'all' || project.project_year === Number(yearFilter);
        return workstreamMatch && countryMatch && yearMatch;
      }),
    [cards, countryFilter, workstreamFilter, yearFilter]
  );

  function openProject(project: PortfolioCard) {
    window.location.href = withBase(`/projects/detail/?slug=${project.slug}`);
  }

  return (
    <>
      <div className="band-head reveal">
        <h1>
          {loading
            ? 'Products, seven years of delivery.'
            : `${cards.length} ${cards.length === 1 ? 'product' : 'products'}, seven years of delivery.`}
        </h1>
        <p className="desc">
          Explore a range of projects addressing real-world challenges across different focus areas.
          Each case highlights the problem, the solution delivered, and where it runs. Filter by focus
          area or status, then open a card to explore the full story.
        </p>
      </div>

      <div className="portfolio-toolbar reveal">
        <div className="proj-filters" role="group" aria-label="Filter by focus area">
          <button type="button" className={`proj-filter ${workstreamFilter === 'all' ? 'active' : ''}`} onClick={() => setWorkstreamFilter('all')}>All focus areas</button>
          <button type="button" className={`proj-filter ${workstreamFilter === 'gis' ? 'active' : ''}`} onClick={() => setWorkstreamFilter('gis')}>GIS &amp; GeoAI</button>
          <button type="button" className={`proj-filter ${workstreamFilter === 'nlp' ? 'active' : ''}`} onClick={() => setWorkstreamFilter('nlp')}>NLP &amp; Gen AI</button>
          <button type="button" className={`proj-filter ${workstreamFilter === 'training' ? 'active' : ''}`} onClick={() => setWorkstreamFilter('training')}>Training</button>
          <button type="button" className={`proj-filter ${workstreamFilter === 'other' ? 'active' : ''}`} onClick={() => setWorkstreamFilter('other')}>Other</button>
        </div>
        <details className="filter-dropdown"><summary>Country <span className="filter-current">{countryFilter === 'all' ? 'All' : countryFilter}</span></summary><div className="filter-panel" role="group" aria-label="Filter by country"><button type="button" className={`status-btn ${countryFilter === 'all' ? 'active' : ''}`} onClick={() => setCountryFilter('all')}>All countries</button>{countries.map((country) => <button key={country} type="button" className={`status-btn ${countryFilter === country ? 'active' : ''}`} onClick={() => setCountryFilter(country)}>{country}</button>)}</div></details>
        <details className="filter-dropdown"><summary>Year <span className="filter-current">{yearFilter === 'all' ? 'All' : yearFilter}</span></summary><div className="filter-panel" role="group" aria-label="Filter by year"><button type="button" className={`status-btn ${yearFilter === 'all' ? 'active' : ''}`} onClick={() => setYearFilter('all')}>All years</button>{years.map((year) => <button key={year} type="button" className={`status-btn ${yearFilter === String(year) ? 'active' : ''}`} onClick={() => setYearFilter(String(year))}>{year}</button>)}</div></details>
      </div>

      {loading ? <p className="portfolio-count">Loading published products…</p> : null}
      {!loading && error ? <p className="portfolio-count">Published products are temporarily unavailable.</p> : null}

      <div className={`portfolio-grid ${!loading && filteredCards.length === 0 ? 'is-empty' : ''}`}>
        {filteredCards.map((project) => (
          <button
            key={project.id}
            type="button"
            className="portfolio-card reveal"
            onClick={() => openProject(project)}
            aria-label={`Open project page for ${project.title}`}
          >
            {project.image_url ? (
              <div className="card-tile">
                <img src={project.image_url} alt="" loading="lazy" decoding="async" />
              </div>
            ) : (
              <div className="card-tile is-generated"><span className="card-tile-code">{project.code}</span></div>
            )}
            <div className="card-body">
              <div className="card-meta">
                {project.label} &middot; {project.yearLabel} &middot; {(project.implementation_countries ?? []).join(', ') || 'Global'}
              </div>
              <h3>{project.title}</h3>
              <p>{project.summaryLabel}</p>
              <div className="card-more">
                Open project page
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {!loading ? <p className="portfolio-count" style={{ marginTop: 22 }}>{filteredCards.length} of {cards.length} products shown</p> : null}
    </>
  );
}
