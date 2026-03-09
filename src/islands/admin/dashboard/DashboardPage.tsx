import { useEffect, useState } from "react";
import { getDashboardCounts, type ContentCounts } from "../../../lib/admin-queries";

type ContentKey =
  | "statistics"
  | "projects"
  | "news_articles"
  | "people"
  | "partners"
  | "page_content";

const CARD_CONFIG: {
  key: ContentKey;
  label: string;
  slug: string;
}[] = [
  { key: "statistics", label: "Statistics", slug: "statistics" },
  { key: "projects", label: "Projects", slug: "projects" },
  { key: "news_articles", label: "News Articles", slug: "news" },
  { key: "people", label: "People", slug: "people" },
  { key: "partners", label: "Partners", slug: "partners" },
  { key: "page_content", label: "Page Content", slug: "page-content" },
];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-24 mb-4" />
      <div className="h-9 bg-gray-200 rounded w-16 mb-4" />
      <div className="flex flex-wrap gap-2">
        <div className="h-6 bg-gray-200 rounded w-16" />
        <div className="h-6 bg-gray-200 rounded w-20" />
        <div className="h-6 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  counts,
  href,
}: {
  label: string;
  counts: ContentCounts;
  href: string;
}) {
  return (
    <a
      href={href}
      className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow cursor-pointer block"
    >
      <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-3">{counts.total}</p>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
          {counts.draft} draft
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
          {counts.published} published
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
          {counts.archived} archived
        </span>
      </div>
    </a>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<Record<ContentKey, ContentCounts> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchCounts() {
    setLoading(true);
    setError(null);
    const { data: counts, error: err } = await getDashboardCounts();
    if (err) {
      setError(err);
      setData(null);
    } else {
      setData(counts);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            type="button"
            onClick={fetchCounts}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARD_CONFIG.map(({ key, label, slug }) => (
          <StatCard
            key={key}
            label={label}
            counts={data![key]}
            href={`#/${slug}`}
          />
        ))}
      </div>
    </div>
  );
}
