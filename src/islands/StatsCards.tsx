import { useEffect, useState } from 'react';
import { getPublishedStatistics } from '../lib/queries';
import type { StatisticCard } from '../lib/types';
import { sampleStats } from '../data/sampleContent';

const statVisuals: Record<string, { accent: string }> = {
  projects: { accent: 'text-blue-700' },
  learners: { accent: 'text-blue-700' },
  knowledge: { accent: 'text-blue-700' },
  volunteers: { accent: 'text-blue-700' },
  countries: { accent: 'text-blue-700' },
  default: { accent: 'text-blue-700' },
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
              className="rounded-xl border border-blue-200 bg-[#eef7ff] p-5 shadow-[0_16px_40px_rgba(47,128,237,0.08)]"
            >
              <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-blue-600">
                {stat.label}
              </p>
              <p className={`mt-2 text-4xl font-black tracking-tight ${visual.accent}`} aria-label={`${stat.label}: ${stat.value}`}>
                {stat.value}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
