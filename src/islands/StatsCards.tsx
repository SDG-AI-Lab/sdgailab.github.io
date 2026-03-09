import { useEffect, useState } from 'react';
import { getPublishedStatistics } from '../lib/queries';
import type { StatisticCard } from '../lib/types';

export default function StatsCards() {
  const [stats, setStats] = useState<StatisticCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedStatistics().then(({ data, error: err }) => {
      if (err) setError(err);
      else setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading statistics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load statistics at this time.</p>
      </div>
    );
  }

  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        <p>No statistics available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="rounded-lg bg-white p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <p className="text-4xl font-bold text-primary mb-2" aria-label={`${stat.label}: ${stat.value}`}>
            {stat.value}
          </p>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {stat.label}
          </p>
        </article>
      ))}
    </div>
  );
}
