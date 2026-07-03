import { useEffect, useState } from 'react';
import { getPublishedStatistics } from '../lib/queries';
import type { StatisticCard } from '../lib/types';
import { sampleStats } from '../data/sampleContent';

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
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.id} className="bg-white p-6 sm:p-8">
            <p className="text-3xl font-bold text-primary sm:text-4xl" aria-label={`${stat.label}: ${stat.value}`}>{stat.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-wider text-slate-600 sm:text-sm">{stat.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
