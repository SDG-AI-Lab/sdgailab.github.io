import { useEffect, useState } from 'react';
import { getPublishedStatistics } from '../lib/queries';
import type { StatisticCard } from '../lib/types';
import { sampleStats } from '../data/sampleContent';

const statVisuals: Record<string, { icon: string; accent: string; glow: string }> = {
  projects: { icon: 'AI', accent: 'text-emerald-300', glow: 'shadow-emerald-400/20' },
  learners: { icon: 'EDU', accent: 'text-sky-300', glow: 'shadow-sky-400/20' },
  knowledge: { icon: 'KP', accent: 'text-orange-300', glow: 'shadow-orange-400/20' },
  volunteers: { icon: 'UNV', accent: 'text-pink-300', glow: 'shadow-pink-400/20' },
  countries: { icon: 'MAP', accent: 'text-cyan-300', glow: 'shadow-cyan-400/20' },
  default: { icon: 'STAT', accent: 'text-blue-200', glow: 'shadow-blue-400/20' },
};

function getVisual(stat: StatisticCard) {
  const iconName = stat.icon_name?.toLowerCase() ?? '';
  const label = stat.label.toLowerCase();

  if (iconName && statVisuals[iconName]) return statVisuals[iconName];
  if (label.includes('project')) return statVisuals.projects;
  if (label.includes('learner') || label.includes('training')) return statVisuals.learners;
  if (label.includes('knowledge') || label.includes('product')) return statVisuals.knowledge;
  if (label.includes('volunteer')) return statVisuals.volunteers;
  if (label.includes('country')) return statVisuals.countries;

  return statVisuals.default;
}

export default function StatsCards() {
  const [stats, setStats] = useState<StatisticCard[]>(sampleStats);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedStatistics().then(({ data, error: err }) => {
      if (err) setError(err);
      setStats(data.length > 0 ? data : sampleStats);
    });
  }, []);

  return (
    <div>
      {error && <p className="sr-only">Live statistics are unavailable; showing indicative figures.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const visual = getVisual(stat);

          return (
            <article
              key={stat.id}
              className={`rounded-2xl border border-white/15 bg-white/[0.06] p-5 text-center shadow-lg backdrop-blur ${visual.glow}`}
            >
              <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-current bg-white/[0.04] text-2xl ${visual.accent}`} aria-hidden="true">
                {visual.icon}
              </div>
              <p className={`mt-4 text-3xl font-black sm:text-4xl ${visual.accent}`} aria-label={`${stat.label}: ${stat.value}`}>
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase leading-5 tracking-[0.18em] text-slate-200 sm:text-sm">
                {stat.label}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

