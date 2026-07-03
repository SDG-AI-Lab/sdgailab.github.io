import { useEffect, useState } from 'react';
import { getPublishedProjects } from '../lib/queries';
import type { ProjectListItem } from '../lib/types';
import ProjectCard from './components/ProjectCard';
import { sampleProjects } from '../data/sampleContent';

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectListItem[]>(sampleProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      setProjects(data.length > 0 ? data : sampleProjects);
    });
  }, []);

  return (
    <div>
      {error && <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Live project data is temporarily unavailable. The profiles below demonstrate the intended portfolio structure.</p>}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  );
}
