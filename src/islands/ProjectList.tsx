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

function getSearchText(project: ProjectListItem) {
  return [
    project.title,
    project.summary,
    project.impact_area,
    project.timeline,
    ...(project.best_fit ?? []),
    ...(project.core_capabilities ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [activeArea, setActiveArea] = useState<string>(ALL_AREAS);
  const [activeYear, setActiveYear] = useState<string>(ALL_YEARS);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const availableYears = useMemo(
    () => Array.from(new Set(projects.map(getProjectYear).filter((year): year is number => year !== null))).sort((a, b) => b - a),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = projects.filter((project) => {
      const matchesArea = activeArea === ALL_AREAS || project.impact_area === activeArea;
      const matchesYear = activeYear === ALL_YEARS || getProjectYear(project)?.toString() === activeYear;
      const matchesQuery = !normalizedQuery || getSearchText(project).includes(normalizedQuery);
      return matchesArea && matchesYear && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'default') return a.display_order - b.display_order;

      const yearA = getProjectYear(a) ?? 0;
      const yearB = getProjectYear(b) ?? 0;
      const byYear = sortOrder === 'newest' ? yearB - yearA : yearA - yearB;
      if (byYear !== 0) return byYear;

      return a.display_order - b.display_order;
    });
  }, [activeArea, activeYear, projects, searchQuery, sortOrder]);

  const getAreaCount = (area: string) => projects.filter((project) => project.impact_area === area).length;
  const getYearCount = (year: number) => projects.filter((project) => getProjectYear(project) === year).length;
  const hasActiveFilters = activeArea !== ALL_AREAS || activeYear !== ALL_YEARS || sortOrder !== 'newest' || searchQuery.trim().length > 0;

  useEffect(() => {
    getPublishedProjects().then(({ data, error: err }) => {
      if (err) setError(err);
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="h-48 rounded-2xl border border-blue-100 bg-blue-50" role="status" aria-label="Loading projects" />;
  }

  return (
    <div>
      {error && <p className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">Project information is currently being updated.</p>}

      <div className="mb-8 rounded-2xl border border-blue-100 bg-[#eef7ff] p-4 shadow-[0_18px_50px_rgba(47,128,237,0.08)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block text-xs font-black uppercase tracking-[0.16em] text-blue-700">
            Search projects
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title, domain, audience or capability"
              className="mt-2 min-h-12 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-base font-semibold normal-case tracking-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/70"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[28rem]">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Year
              <select
                value={activeYear}
                onChange={(event) => setActiveYear(event.target.value)}
                className="project-filter-select mt-2 min-h-12 w-full rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/70"
              >
                <option value={ALL_YEARS}>All years ({projects.length})</option>
                {availableYears.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year} ({getYearCount(year)})
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Sort
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                className="project-filter-select mt-2 min-h-12 w-full rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/70"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="default">Default order</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-slate-700" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setActiveArea(ALL_AREAS);
                setActiveYear(ALL_YEARS);
                setSortOrder('newest');
                setSearchQuery('');
              }}
              className="text-sm font-black text-blue-700 transition hover:text-blue-900"
            >
              Reset filters
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Project impact area filters">
          <button
            type="button"
            onClick={() => setActiveArea(ALL_AREAS)}
            aria-pressed={activeArea === ALL_AREAS}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              activeArea === ALL_AREAS
                ? 'bg-blue-600 text-white shadow'
                : 'border border-blue-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-700'
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
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow'
                    : 'border border-blue-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-700'
                }`}
              >
                {area.title} <span className="ml-1 opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-8 text-center">
          <h3 className="text-lg font-black text-slate-950">No published projects match these filters yet.</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-600">
            Try another keyword, impact area or year.
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
