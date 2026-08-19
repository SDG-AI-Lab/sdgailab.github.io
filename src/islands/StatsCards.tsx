import { useEffect, useState } from 'react';
import { getPublishedStatistics } from '../lib/queries';
import type { StatisticCard } from '../lib/types';
import { sampleStats } from '../data/sampleContent';

const statVisuals: Record<string, { accent: string }> = {
  projects: { accent: 'text-lab-accent-soft' },
  learners: { accent: 'text-lab-accent-soft' },
  knowledge: { accent: 'text-lab-accent-soft' },
  volunteers: { accent: 'text-lab-accent-soft' },
  countries: { accent: 'text-lab-accent-soft' },
  default: { accent: 'text-lab-accent-soft' },
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
              className="border-l-2 border-lab-accent/45 pl-5"
            >
              <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-lab-accent-soft">
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
