import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { renderMarkdown } from '../lib/markdown';
import { logAppError } from '../lib/observability';
import { getProjectBySlug } from '../lib/queries';
import type { Project } from '../lib/types';
import { withBase } from '../lib/url';
import StatusBadge from './components/StatusBadge';
import ObservabilityBoundary from './components/ObservabilityBoundary';
import { getSampleProject } from '../data/sampleContent';

function getYouTubeEmbedUrl(url?: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    let id = '';
    if (host === 'youtu.be') {
      id = parsed.pathname.replace(/^\//, '');
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname.startsWith('/embed/')) id = parsed.pathname.split('/embed/')[1] ?? '';
      else id = parsed.searchParams.get('v') ?? '';
    }
    const cleanId = id.split(/[?&#/]/)[0];
    return cleanId ? `https://www.youtube-nocookie.com/embed/${cleanId}` : null;
  } catch {
    return null;
  }
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MetaCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{title}</h2>
      <div className="mt-3 text-sm font-semibold leading-6 text-slate-800">{children}</div>
    </article>
  );
}

function TextSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{label}</h2>
      <div className="mt-4 text-base leading-7 text-slate-700">{children}</div>
    </section>
  );
}

function ProjectDetailContent() {
  const [project, setProject] = useState<Project | null>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
      setError('No project specified.');
      setLoading(false);
      return;
    }

    getProjectBySlug(slug).then(async ({ data, error: err }) => {
      if (err) {
        logAppError('public.project.load', new Error(err), { slug });
        setError(err);
      } else if (!data) {
        const sample = getSampleProject(slug);
        if (!sample) {
          setError('Project not found.');
          setLoading(false);
          return;
        }
        setProject(sample);
        setHtml(await renderMarkdown(sample.description));
      } else {
        setProject(data);
        setHtml(await renderMarkdown(data.description));
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-12" role="status" aria-label="Loading">
        <h1 className="sr-only">Loading project</h1>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading project...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12" role="alert">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-xl text-gray-500 mb-4">{error || 'The requested project could not be found.'}</p>
        <a href={withBase('/projects')} className="text-primary hover:underline font-medium">
          &larr; Back to Projects
        </a>
      </div>
    );
  }

  const hasBestFit = Boolean(project.best_fit?.length);
  const hasCoreCapabilities = Boolean(project.core_capabilities?.length);
  const hasCountries = Boolean(project.implementation_countries?.length);
  const hasTechStack = Boolean(project.tech_stack?.length);
  const hasResources = Boolean(project.resource_links?.length);
  const hasCurrentClients = Boolean(project.current_client_segments?.length);
  const hasFutureClients = Boolean(project.future_client_segments?.length);
  const deploymentLabel = project.deployment_status ?? (project.is_deployed ? 'live' : 'prototype');
  const embedUrl = getYouTubeEmbedUrl(project.video_url);
  const objectiveText = project.solution || project.summary;
  const backgroundText = project.problem;
  const hasResults = Boolean(project.reusable_components || hasCoreCapabilities || hasBestFit);
  const hasMedia = Boolean(project.image_url || project.video_url || project.media_caption);
  const hasAdditionalMetadata = Boolean(
    project.work_stream ||
      project.business_model ||
      project.project_category ||
      hasTechStack ||
      hasCurrentClients ||
      hasFutureClients
  );

  return (
    <article className="space-y-10">
      <a href={withBase('/projects')} className="inline-flex items-center text-primary hover:underline font-medium">
        &larr; Back to Projects
      </a>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.project_status} />
          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium capitalize text-slate-700">
            {deploymentLabel}
          </span>
          {project.impact_area && (
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary">
              {project.impact_area}
            </span>
          )}
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-primary">Project case study</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-5xl">{project.title}</h1>

        {project.summary && <p className="mt-5 max-w-4xl text-xl leading-8 text-slate-600">{project.summary}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {backgroundText && (
            <TextSection label="Background">
              <p>{backgroundText}</p>
            </TextSection>
          )}
          {objectiveText && (
            <TextSection label="Objectives">
              <p>{objectiveText}</p>
            </TextSection>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Project metadata">
        {hasCountries && (
          <MetaCard title="Countries">
            <ul className="space-y-1">
              {project.implementation_countries!.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </MetaCard>
        )}
        {project.collaboration_network && (
          <MetaCard title="Partners / network">
            <p>{project.collaboration_network}</p>
          </MetaCard>
        )}
        {(project.business_model || project.project_category || project.work_stream) && (
          <MetaCard title="Funding / model">
            {project.business_model && <p>{project.business_model}</p>}
            {project.project_category && <p className="mt-1 font-normal text-slate-600">{project.project_category}</p>}
            {project.work_stream && <p className="mt-1 font-normal text-slate-600">{project.work_stream}</p>}
          </MetaCard>
        )}
        {(project.timeline || project.project_year) && (
          <MetaCard title="Timeline">
            {project.timeline && <p>{project.timeline}</p>}
            {project.project_year ? <p className="mt-1 font-normal text-slate-600">{project.project_year}</p> : null}
          </MetaCard>
        )}
      </section>

      <ListBlock title="Activities / how it works" items={project.how_it_works} />

      {project.features?.length ? <ListBlock title="Key features" items={project.features} /> : null}

      {hasResults && (
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm lg:p-8" aria-labelledby="results-heading">
          <h2 id="results-heading" className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Results & impact</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {project.reusable_components && (
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-950">Reusable components</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{project.reusable_components}</p>
              </article>
            )}
            {hasCoreCapabilities && (
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-950">Core capabilities</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {project.core_capabilities!.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            )}
            {hasBestFit && (
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-950">Best fit for</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {project.best_fit!.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            )}
          </div>
        </section>
      )}

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {hasMedia && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Media</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {project.video_url && embedUrl ? (
                <iframe
                  className="aspect-video w-full"
                  src={embedUrl}
                  title={`${project.title} video`}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : project.image_url ? (
                <img src={project.image_url} alt="" className="aspect-video w-full object-cover" />
              ) : project.video_url ? (
                <div className="p-6">
                  <a href={project.video_url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                    Open media
                  </a>
                </div>
              ) : null}
            </div>
            {project.media_caption && <p className="mt-4 text-sm leading-6 text-slate-600">{project.media_caption}</p>}
          </div>
        )}

        <div className="space-y-6">
          {hasTechStack && <ListBlock title="Tech stack" items={project.tech_stack} />}
          {hasResources && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Publications & downloads</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {project.resource_links!.map((item, index) => (
                  <a key={item} href={item} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary">
                    Resource {index + 1}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {hasAdditionalMetadata && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8" aria-labelledby="additional-heading">
          <h2 id="additional-heading" className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Additional portfolio details</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hasCurrentClients && (
              <div>
                <h3 className="font-bold text-slate-950">Current client segments</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {project.current_client_segments!.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}
            {hasFutureClients && (
              <div>
                <h3 className="font-bold text-slate-950">Future addressable segments</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {project.future_client_segments!.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}
            {project.work_stream && (
              <div>
                <h3 className="font-bold text-slate-950">Work stream</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{project.work_stream}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm lg:p-8">
        <h2 className="text-xl font-bold text-slate-950">More context</h2>
        <div className="prose-content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={withBase('/contact')} data-analytics-event="cta_click" data-analytics-category="project_detail" data-analytics-label={`Ask about this work: ${project.title}`} className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-primary-dark">
            Ask about this work
          </a>
          <a href={withBase('/projects')} data-analytics-event="cta_click" data-analytics-category="project_detail" data-analytics-label={`Explore full portfolio from: ${project.title}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary">
            Explore full portfolio
          </a>
        </div>
      </section>
    </article>
  );
}

export default function ProjectDetail() {
  return (
    <ObservabilityBoundary surface="public" name="ProjectDetail">
      <ProjectDetailContent />
    </ObservabilityBoundary>
  );
}
