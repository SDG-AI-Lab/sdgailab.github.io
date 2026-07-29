import { useEffect, useState } from 'react';
import { getPublishedProjects } from '../lib/queries';
import type { ProjectListItem } from '../lib/types';
import ProjectCard from './components/ProjectCard';
import { impactAreas } from '../data/sampleContent';

const ALL_AREAS = 'all';

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [activeArea, setActiveArea] = useState<string>(ALL_AREAS);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const filteredProjects =
    activeArea === ALL_AREAS
      ? projects
      : projects.filter((project) => project.impact_area === activeArea);

  const getAreaCount = (area: string) =>
    projects.filter((project) => project.impact_area === area).length;

  useEffect(() => {
    getPublishedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="h-48 rounded-2xl border border-slate-200 bg-slate-50" role="status" aria-label="Loading projects" />;
  }

  return (
    <div>
      {error && <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Project information is currently being updated.</p>}

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Filter by impact area</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Browse the portfolio by the Lab's six delivery domains.
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-500" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Project impact area filters">
          <button
            type="button"
            onClick={() => setActiveArea(ALL_AREAS)}
            aria-pressed={activeArea === ALL_AREAS}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeArea === ALL_AREAS
                ? 'bg-primary text-white shadow'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary'
            }`}
          >
            All <span className="ml-1 opacity-80">({projects.length})</span>
          </button>
          {impactAreas.map((area) => {
            const count = getAreaCount(area.title);
            const isActive = activeArea === area.title;
            return (
              <button
                key={area.title}
                type="button"
                onClick={() => setActiveArea(area.title)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-primary text-white shadow'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary'
                }`}
              >
                {area.title} <span className="ml-1 opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-lg font-bold text-slate-950">No published projects in this impact area yet.</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Try another impact area or browse the full portfolio.
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
      )}
    </div>
  );
}
