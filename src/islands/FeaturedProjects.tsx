import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../lib/queries';
import type { FeaturedProjectCard } from '../lib/types';
import { withBase } from '../lib/url';
import StatusBadge from './components/StatusBadge';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<FeaturedProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      else setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading featured projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load featured projects at this time.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        <p>No featured projects yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <a
          key={project.id}
          href={withBase(`/projects/detail/?slug=${project.slug}`)}
          className="group block rounded-lg bg-white shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
        >
          {project.image_url && (
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={project.image_url}
                alt=""
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5">
            <div className="mb-2">
              <StatusBadge status={project.project_status} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>
          </div>
        </a>
      ))}
    </div>
  );
}
