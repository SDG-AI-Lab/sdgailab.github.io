import { useEffect, useState } from 'react';
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
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
  const hasPortfolioMeta = Boolean(
    project.project_year ||
      project.timeline ||
      project.work_stream ||
      project.business_model ||
      project.project_category ||
      project.reusable_components ||
      hasBestFit ||
      hasCoreCapabilities ||
      hasCountries ||
      hasTechStack ||
      hasCurrentClients ||
      hasFutureClients ||
      project.collaboration_network
  );
  const deploymentLabel = project.deployment_status ?? (project.is_deployed ? 'live' : 'prototype');
  const embedUrl = getYouTubeEmbedUrl(project.video_url);
  const hasStructuredMain = Boolean(
    project.problem ||
      project.solution ||
      project.how_it_works?.length ||
      project.features?.length ||
      project.video_url
  );

  return (
    <article>
      <a href={withBase('/projects')} className="inline-flex items-center text-primary hover:underline font-medium mb-6">
        &larr; Back to Projects
      </a>

      <div className="mb-10 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-8">
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
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

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Project case study</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">{project.title}</h1>

          {project.summary && <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-600">{project.summary}</p>}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={withBase('/contact')} data-analytics-event="cta_click" data-analytics-category="project_detail" data-analytics-label={`Request related support: ${project.title}`} className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-primary-dark">
              Request related support
            </a>
            <a href={withBase('/projects')} data-analytics-event="cta_click" data-analytics-category="project_detail" data-analytics-label={`Explore full portfolio from: ${project.title}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary">
              Explore full portfolio
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {project.image_url ? (
            <img src={project.image_url} alt="" className="aspect-video h-full w-full object-cover lg:aspect-auto" />
          ) : (
            <div className="flex h-full min-h-64 flex-col justify-between p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Visual evidence</p>
                <h2 className="mt-3 text-xl font-bold text-slate-950">Visual context for the solution</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Screenshots, maps or diagrams help explain the solution context, workflow and results.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
                <span className="h-16 rounded-lg bg-[#26BDE2]/20"></span>
                <span className="h-16 rounded-lg bg-[#4C9F38]/20"></span>
                <span className="h-16 rounded-lg bg-[#FD6925]/20"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="space-y-8">
          {project.problem || project.solution ? (
            <section className="grid gap-5 md:grid-cols-2">
              {project.problem && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Problem</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Solution</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{project.solution}</p>
                </div>
              )}
            </section>
          ) : null}

          <ListBlock title="How it works" items={project.how_it_works} />
          <ListBlock title="Key features" items={project.features} />

          {project.video_url ? (
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-950">Video / media</h2>
              {embedUrl ? (
                <iframe
                  className="mt-4 aspect-video w-full rounded-lg border border-slate-200"
                  src={embedUrl}
                  title={`${project.title} video`}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <a href={project.video_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-semibold text-primary hover:underline">
                  Open media
                </a>
              )}
              {project.media_caption && <p className="mt-3 text-sm leading-6 text-slate-600">{project.media_caption}</p>}
            </section>
          ) : null}

          {hasStructuredMain ? (
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-950">Additional context</h2>
              <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
            </section>
          ) : (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </div>

        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          {hasPortfolioMeta && (
            <div className="mb-6 space-y-4 border-b border-slate-200 pb-6">
              {project.project_year ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Year</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{project.project_year}</p>
                </div>
              ) : null}
              {project.timeline && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Indicative lead time</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{project.timeline}</p>
                </div>
              )}
              {project.work_stream ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Work stream</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{project.work_stream}</p>
                </div>
              ) : null}
              {project.business_model || project.project_category ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Delivery model</h2>
                  {project.business_model && <p className="mt-1 text-sm font-semibold text-slate-800">{project.business_model}</p>}
                  {project.project_category && <p className="mt-1 text-sm text-slate-700">{project.project_category}</p>}
                </div>
              ) : null}
              {hasCountries ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Implementation countries</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.implementation_countries!.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
              {hasCurrentClients ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Current client segments</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.current_client_segments!.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
              {hasFutureClients ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Future addressable segments</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.future_client_segments!.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
              {hasBestFit ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Best fit for</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.best_fit!.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
              {hasCoreCapabilities ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core capabilities</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.core_capabilities!.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
              {hasTechStack ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tech stack</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.tech_stack!.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
              {project.reusable_components ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Scalability / reusable components</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{project.reusable_components}</p>
                </div>
              ) : null}
              {project.collaboration_network ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Collaboration / network</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{project.collaboration_network}</p>
                </div>
              ) : null}
              {hasResources ? (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Downloads / resources</h2>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {project.resource_links!.map((item, index) => (
                      <li key={item}>
                        <a href={item} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                          Resource {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
          <h2 className="text-base font-bold text-slate-950">Project information model</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Project profiles are structured around the information needed for reuse, adaptation and follow-up.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li><strong>Problem:</strong> the development need</li>
            <li><strong>Solution:</strong> the product, prototype or support delivered</li>
            <li><strong>How it works:</strong> the delivery or user flow</li>
            <li><strong>Evidence:</strong> media, resources or implementation context</li>
            <li><strong>Reuse:</strong> tech stack, capabilities and support pathways</li>
          </ul>
          <a href={withBase('/contact')} data-analytics-event="cta_click" data-analytics-category="project_detail" data-analytics-label={`Ask about this work: ${project.title}`} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-dark">
            Ask about this work
          </a>
        </aside>
      </div>
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
