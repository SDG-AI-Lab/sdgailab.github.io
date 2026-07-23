import { useEffect, useState } from 'react';
import { renderMarkdown } from '../lib/markdown';
import { logAppError } from '../lib/observability';
import { getProjectBySlug } from '../lib/queries';
import type { Project } from '../lib/types';
import { withBase } from '../lib/url';
import StatusBadge from './components/StatusBadge';
import ObservabilityBoundary from './components/ObservabilityBoundary';
import { getSampleProject } from '../data/sampleContent';

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
  const hasPortfolioMeta = Boolean(project.timeline || hasBestFit || hasCoreCapabilities);
  const deploymentLabel = project.deployment_status ?? (project.is_deployed ? 'live' : 'prototype');

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
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            {project.title}
          </h1>

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
            <img
              src={project.image_url}
              alt=""
              className="aspect-video h-full w-full object-cover lg:aspect-auto"
            />
          ) : (
            <div className="flex h-full min-h-64 flex-col justify-between p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Visual evidence</p>
                <h2 className="mt-3 text-xl font-bold text-slate-950">Screenshots, maps or diagrams can be added here</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Project pages are structured to support product visuals once approved material is available.
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

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          {hasPortfolioMeta && (
            <div className="mb-6 space-y-4 border-b border-slate-200 pb-6">
              {project.timeline && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Typical timeline</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{project.timeline}</p>
                </div>
              )}
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
            </div>
          )}
          <h2 className="text-base font-bold text-slate-950">How to assess this work</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Each project profile is organized around the information partners need before reuse, adaptation or follow-up.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li><strong>Problem:</strong> what development need the work responds to</li>
            <li><strong>Approach:</strong> method, prototype, product or advisory support</li>
            <li><strong>Status:</strong> maturity, implementation stage and next step</li>
            <li><strong>Evidence:</strong> results, limitations and lessons where available</li>
            <li><strong>Reuse:</strong> resources, documentation or support pathways</li>
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
