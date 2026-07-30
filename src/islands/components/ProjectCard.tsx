import type { ProjectListItem } from '../../lib/types';
import { withBase } from '../../lib/url';
import StatusBadge from './StatusBadge';

const sdgColors: Record<number, string> = {
  9: '#FD6925', 11: '#FD9D24', 13: '#3F7E44', 16: '#00689D', 17: '#19486A',
};

export default function ProjectCard({ project }: { project: ProjectListItem }) {
  const deployment = project.deployment_status ?? (project.is_deployed ? 'live' : 'prototype');
  const deploymentLabel = deployment === 'live' ? 'Live' : deployment === 'internal' ? 'Internal' : 'Prototype';
  const hasBestFit = Boolean(project.best_fit?.length);
  const hasPortfolioMeta = Boolean(project.timeline || hasBestFit);

  return (
    <a
      href={withBase(`/projects/detail/?slug=${project.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {project.image_url ? (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img src={project.image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br from-primary-900 via-primary to-primary-500 p-5">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/20" />
          <div className="absolute right-8 top-8 h-16 w-16 rounded-full border border-white/10" />
          <div className="relative flex gap-2" aria-label={project.sdgs?.map((sdg) => `SDG ${sdg}`).join(', ')}>
            {(project.sdgs ?? [17]).map((sdg) => (
              <span key={sdg} className="flex h-10 w-10 items-center justify-center rounded-sm text-sm font-bold text-white shadow" style={{ backgroundColor: sdgColors[sdg] ?? '#19486A' }}>
                {sdg}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusBadge status={project.project_status} />
          <span className={`ui-badge ui-badge--sm ui-badge--deployment-${deployment}`}>{deploymentLabel}</span>
          {project.impact_area && <span className="ui-badge ui-badge--sm ui-badge--impact">{project.impact_area}</span>}
        </div>
        <h3 className="text-xl font-semibold text-slate-950 transition-colors group-hover:text-primary">{project.title}</h3>
        {project.summary && <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{project.summary}</p>}
        {hasPortfolioMeta && (
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
            {project.timeline && <p><strong className="text-slate-700">Timeline:</strong> {project.timeline}</p>}
            {hasBestFit ? <p><strong className="text-slate-700">Best fit:</strong> {project.best_fit!.slice(0, 2).join(', ')}</p> : null}
          </div>
        )}
        <span className="mt-5 text-sm font-semibold text-primary">View project <span aria-hidden="true">→</span></span>
      </div>
    </a>
  );
}

