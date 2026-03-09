import { useEffect, useState } from 'react';
import { getPublishedPartners } from '../lib/queries';
import type { PartnerLogo } from '../lib/types';

export default function PartnerLogos() {
  const [partners, setPartners] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPartners().then(({ data, error: err }) => {
      if (err) setError(err);
      else setPartners(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading partners...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load partner information at this time.</p>
      </div>
    );
  }

  if (partners.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        <p>No partners listed yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
      {partners.map((partner) => (
        <a
          key={partner.id}
          href={partner.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow h-24"
          title={partner.name}
        >
          {partner.logo_url ? (
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="max-h-16 max-w-full object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'block';
              }}
            />
          ) : null}
          <span
            className={`text-sm font-medium text-gray-600 text-center ${partner.logo_url ? 'hidden' : 'block'}`}
          >
            {partner.name}
          </span>
        </a>
      ))}
    </div>
  );
}
