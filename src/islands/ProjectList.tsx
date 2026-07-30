import { useEffect, useMemo, useState } from 'react';
import { getPublishedProjects } from '../lib/queries';
import type { ProjectListItem } from '../lib/types';
import ProjectCard from './components/ProjectCard';
import { impactAreas } from '../data/sampleContent';

const ALL_AREAS = 'all';
const ALL_YEARS = 'all';
type SortOrder = 'newest' | 'oldest' | 'default';

function getProjectYear(project: ProjectListItem) {
  return typeof project.project_year === 'number' ? project.project_year : null;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [activeArea, setActiveArea] = useState<string>(ALL_AREAS);
  const [activeYear, setActiveYear] = useState<string>(ALL_YEARS);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const availableYears = useMemo(
    () => Array.from(new Set(projects.map(getProjectYear).filter((year): year is number => year !== null))).sort((a, b) => b - a),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesArea = activeArea === ALL_AREAS || project.impact_area === activeArea;
      const matchesYear = activeYear === ALL_YEARS || getProjectYear(project)?.toString() === activeYear;
      return matchesArea && matchesYear;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'default') return a.display_order - b.display_order;

      const yearA = getProjectYear(a) ?? 0;
      const yearB = getProjectYear(b) ?? 0;
      const byYear = sortOrder === 'newest' ? yearB - yearA : yearA - yearB;
      if (byYear !== 0) return byYear;

      return a.display_order - b.display_order;
    });
  }, [activeArea, activeYear, projects, sortOrder]);

  const getAreaCount = (area: string) =>
    projects.filter((project) => project.impact_area === area).length;

  const getYearCount = (year: number) =>
    projects.filter((project) => getProjectYear(project) === year).length;

  useEffect(() => {
    getPublishedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="h-48 rounded-2xl border border-white/15 bg-white/[0.06]" role="status" aria-label="Loading projects" />;
  }

  return (
    <div>
      {error && <p className="mb-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">Project information is currently being updated.</p>}

      <div className="mb-8 rounded-2xl border border-white/15 bg-white/[0.06] p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Filter projects</h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Browse the portfolio by impact area and project year.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[26rem]">
            <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Year
              <select
                value={activeYear}
                onChange={(event) => setActiveYear(event.target.value)}
                className="project-filter-select mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-[#080f26] px-3 py-2 text-sm font-semibold normal-case tracking-normal text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
              >
                <option className="bg-white text-slate-950" value={ALL_YEARS}>All years ({projects.length})</option>
                {availableYears.map((year) => (
                  <option className="bg-white text-slate-950" key={year} value={year.toString()}>
                    {year} ({getYearCount(year)})
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Sort
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                className="project-filter-select mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-[#080f26] px-3 py-2 text-sm font-semibold normal-case tracking-normal text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
              >
                <option className="bg-white text-slate-950" value="newest">Newest first</option>
                <option className="bg-white text-slate-950" value="oldest">Oldest first</option>
                <option className="bg-white text-slate-950" value="default">Default order</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-300" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          {(activeArea !== ALL_AREAS || activeYear !== ALL_YEARS || sortOrder !== 'newest') && (
            <button
              type="button"
              onClick={() => {
                setActiveArea(ALL_AREAS);
                setActiveYear(ALL_YEARS);
                setSortOrder('newest');
              }}
              className="text-sm font-bold text-sky-300 transition hover:text-white"
            >
              Reset filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Project impact area filters">
          <button
            type="button"
            onClick={() => setActiveArea(ALL_AREAS)}
            aria-pressed={activeArea === ALL_AREAS}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeArea === ALL_AREAS
                ? 'bg-blue-500 text-white shadow'
                : 'border border-white/15 bg-white/[0.05] text-slate-200 hover:border-blue-300/70 hover:text-white'
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
                    ? 'bg-blue-500 text-white shadow'
                    : 'border border-white/15 bg-white/[0.05] text-slate-200 hover:border-blue-300/70 hover:text-white'
                }`}
              >
                {area.title} <span className="ml-1 opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.04] p-8 text-center">
          <h3 className="text-lg font-bold text-white">No published projects match these filters yet.</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Try another impact area, year or browse the full portfolio.
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