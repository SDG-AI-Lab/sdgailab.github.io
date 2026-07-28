import { useEffect, useState } from 'react';
import { getPublishedPartners } from '../lib/queries';
import type { PartnerLogo } from '../lib/types';
import { samplePartners } from '../data/sampleContent';

interface PartnerLogosProps {
  limit?: number;
}

export default function PartnerLogos({ limit }: PartnerLogosProps) {
  const [partners, setPartners] = useState<PartnerLogo[]>(samplePartners);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPartners().then(({ data, error: err }) => {
      if (err) setError(err);
      setPartners(data.length > 0 ? data : samplePartners);
    });
  }, []);

  return (
    <div>
      {error && <p className="sr-only">Live partner data is unavailable; showing a representative partner list.</p>}
      <div className="grid grid-cols-2 items-stretch gap-3 md:grid-cols-4">
        {(limit ? partners.slice(0, limit) : partners).map((partner) => (
        <a
          key={partner.id}
          href={partner.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-24 items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center transition hover:border-primary-200 hover:shadow-md"
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
    </div>
  );
}
