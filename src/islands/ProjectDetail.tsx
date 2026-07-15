import { useEffect, useState } from 'react';
import { renderMarkdown } from '../lib/markdown';
import { getProjectBySlug } from '../lib/queries';
import type { Project } from '../lib/types';
import { withBase } from '../lib/url';
import StatusBadge from './components/StatusBadge';
import { getSampleProject } from '../data/sampleContent';

export default function ProjectDetail() {
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

  return (
    <article>
      <a href={withBase('/projects')} className="inline-flex items-center text-primary hover:underline font-medium mb-6">
        &larr; Back to Projects
      </a>

      {project.image_url && (
        <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 mb-8 max-h-96">
          <img
            src={project.image_url}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <StatusBadge status={project.project_status} />
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium capitalize text-slate-700">
          {project.deployment_status ?? (project.is_deployed ? 'live' : 'prototype')}
        </span>
        {project.is_sample && <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Sample content</span>}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        {project.title}
      </h1>

      {project.summary && <p className="mb-10 max-w-3xl text-xl leading-8 text-slate-600">{project.summary}</p>}

      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
