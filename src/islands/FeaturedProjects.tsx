import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../lib/queries';
import type { FeaturedProjectCard } from '../lib/types';
import ProjectCard from './components/ProjectCard';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<FeaturedProjectCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="h-40 rounded-xl border border-slate-200 bg-slate-50" role="status" aria-label="Loading featured projects" />;
  }

  return (
    <div>
      {error && projects.length === 0 && <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Featured projects are currently being updated.</p>}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-lg font-bold text-slate-950">Featured projects are being updated.</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Explore the full portfolio or check back soon for highlighted work.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
}
