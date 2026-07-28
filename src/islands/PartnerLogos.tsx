import { useEffect, useState } from 'react';
import { getPublishedPartners } from '../lib/queries';
import type { PartnerLogo } from '../lib/types';
import { samplePartners } from '../data/sampleContent';

interface PartnerLogosProps {
  limit?: number;
  variant?: 'grid' | 'marquee';
}

function PartnerLogoCard({ partner }: { partner: PartnerLogo }) {
  return (
    <a
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
  );
}

export default function PartnerLogos({ limit, variant = 'grid' }: PartnerLogosProps) {
  const [partners, setPartners] = useState<PartnerLogo[]>(samplePartners);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPartners().then(({ data, error: err }) => {
      if (err) setError(err);
      setPartners(data.length > 0 ? data : samplePartners);
    });
  }, []);

  const visiblePartners = limit ? partners.slice(0, limit) : partners;

  if (variant === 'marquee') {
    const scrollingPartners = [...visiblePartners, ...visiblePartners];

    return (
      <div>
        {error && <p className="sr-only">Live partner data is unavailable; showing a representative partner list.</p>}
        <div
          className="partner-marquee group relative overflow-hidden py-2"
          aria-label="Partners and network"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070d20] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070d20] to-transparent" />
          <div className="partner-marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {scrollingPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="w-44 shrink-0 sm:w-52"
                aria-hidden={index >= visiblePartners.length ? 'true' : undefined}
              >
                <PartnerLogoCard partner={partner} />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes partner-marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .partner-marquee-track {
            animation: partner-marquee-scroll 34s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .partner-marquee {
              overflow-x: auto;
            }

            .partner-marquee-track {
              animation: none;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {error && <p className="sr-only">Live partner data is unavailable; showing a representative partner list.</p>}
      <div className="grid grid-cols-2 items-stretch gap-3 md:grid-cols-4">
        {visiblePartners.map((partner) => (
          <PartnerLogoCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}
