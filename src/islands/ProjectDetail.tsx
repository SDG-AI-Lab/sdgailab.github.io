import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { getProjectBySlug } from '../lib/queries';
import type { Project } from '../lib/types';
import StatusBadge from './components/StatusBadge';

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

    getProjectBySlug(slug).then(({ data, error: err }) => {
      if (err) {
        setError(err);
      } else if (!data) {
        setError('Project not found.');
      } else {
        setProject(data);
        const rendered = marked.parse(data.description);
        if (typeof rendered === 'string') {
          setHtml(rendered);
        } else {
          rendered.then(setHtml);
        }
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
        <a href="/projects" className="text-primary hover:underline font-medium">
          &larr; Back to Projects
        </a>
      </div>
    );
  }

  return (
    <article>
      <a href="/projects" className="inline-flex items-center text-primary hover:underline font-medium mb-6">
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
        {project.is_deployed && (
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
            Deployed
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        {project.title}
      </h1>

      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
