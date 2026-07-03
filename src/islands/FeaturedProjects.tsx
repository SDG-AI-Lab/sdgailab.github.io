import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../lib/queries';
import type { FeaturedProjectCard } from '../lib/types';
import ProjectCard from './components/ProjectCard';
import { sampleFeaturedProjects } from '../data/sampleContent';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<FeaturedProjectCard[]>(sampleFeaturedProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      setProjects(data.length > 0 ? data : sampleFeaturedProjects);
    });
  }, []);

  return (
    <div>
      {error && <p className="sr-only">Live project data is unavailable; showing sample content.</p>}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  );
}
