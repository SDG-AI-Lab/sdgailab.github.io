import { useEffect, useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { getPublishedGeographicReach } from '../lib/queries';
import type { GeographicReachCard } from '../lib/types';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

type CountryFeature = {
  id?: string | number;
  type: 'Feature';
  geometry: unknown;
  properties?: Record<string, unknown>;
};

type CountryFeatureCollection = {
  type: 'FeatureCollection';
  features: CountryFeature[];
};

const topology = worldAtlas as any;
const countriesFeature = feature(topology, topology.objects.countries) as unknown as CountryFeatureCollection;
const countryFeatures = countriesFeature.features;
const projection = geoNaturalEarth1().fitSize([MAP_WIDTH, MAP_HEIGHT], countriesFeature as any);
const path = geoPath(projection);

function projectPoint(latitude: number, longitude: number) {
  const projected = projection([longitude, latitude]);
  if (!projected) return null;
  return { x: projected[0], y: projected[1] };
}

export default function GeographicReach() {
  const [countries, setCountries] = useState<GeographicReachCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(() => {
      if (cancelled) return;
      setError('Geographic reach request timed out.');
      setLoading(false);
    }, 6000);

    getPublishedGeographicReach()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        setCountries(data);
        setError(err);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setCountries([]);
        setError(err instanceof Error ? err.message : 'Geographic reach information is currently unavailable.');
      })
      .finally(() => {
        if (cancelled) return;
        window.clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  const mappedCountries = useMemo(
    () => countries.filter((country) => country.latitude != null && country.longitude != null),
    [countries]
  );

  if (loading) {
    return (
      <div
        className="relative min-h-[340px] overflow-hidden rounded-3xl border border-lab-border bg-lab-surface/70 p-5 shadow-sm"
        role="status"
        aria-label="Loading geographic reach"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(76,141,255,0.14),transparent_34%),radial-gradient(circle_at_78%_36%,rgba(127,169,255,0.12),transparent_38%)]" />
        <div className="relative h-[260px] overflow-hidden rounded-2xl border border-lab-border/70 bg-lab-base">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(228,230,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(228,230,235,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute left-[9%] top-[42%] h-24 w-28 rounded-[55%_45%_50%_50%] bg-lab-accent/18" />
          <div className="absolute left-[36%] top-[28%] h-32 w-40 rounded-[45%_55%_50%_50%] bg-lab-accent/16" />
          <div className="absolute right-[12%] top-[30%] h-36 w-52 rounded-[55%_45%_48%_52%] bg-lab-accent/18" />
          <div className="absolute left-[49%] top-[55%] h-24 w-20 rounded-[48%_52%_55%_45%] bg-lab-accent/14" />
          {['18%_38%', '31%_54%', '43%_44%', '51%_50%', '61%_40%', '72%_46%', '84%_54%'].map((position) => {
            const [left, top] = position.split('_');
            return (
              <span
                key={position}
                className="absolute h-3 w-3 rounded-full bg-lab-accent shadow-[0_0_0_5px_rgba(76,141,255,0.18),0_0_18px_rgba(76,141,255,0.45)]"
                style={{ left, top }}
              />
            );
          })}
        </div>
        <p className="relative mt-4 text-sm font-semibold text-lab-muted">Loading geographic reach map...</p>
      </div>
    );
  }

  if (error && countries.length === 0) {
    return (
      <div className="rounded-3xl border border-lab-border bg-lab-surface/70 p-8 text-center shadow-sm">
        <h3 className="text-lg font-bold text-lab-text">Geographic reach information is being updated.</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-lab-muted">
          The map will appear here once published country records are available.
        </p>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-lab-border bg-lab-surface p-8 text-center shadow-sm">
        <h3 className="text-lg font-bold text-lab-text">Geographic reach information is being updated.</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-lab-muted">
          Country and territory coverage will be displayed here as portfolio records are published.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl bg-lab-surface/70 p-3 ring-1 ring-lab-border/70 sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(36,107,254,0.10),transparent_32%),radial-gradient(circle_at_76%_36%,rgba(82,173,255,0.12),transparent_35%)]" />
        <svg
          className="relative h-auto w-full"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label={`World map showing ${mappedCountries.length} geographic reach entries`}
        >
          <defs>
            <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(148, 163, 184, 0.18)" strokeWidth="1" />
            </pattern>
            <filter id="pin-glow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} rx="26" fill="url(#map-grid)" />
          <g>
            {countryFeatures.map((country, index) => {
              const d = path(country as any);
              if (!d) return null;
              return (
                <path
                  key={country.id ?? index}
                  d={d}
                  fill="rgba(228, 230, 235, 0.18)"
                  stroke="rgba(228, 230, 235, 0.26)"
                  strokeWidth="0.7"
                />
              );
            })}
          </g>
          {mappedCountries.map((country) => {
            const point = projectPoint(country.latitude!, country.longitude!);
            if (!point) return null;
            return (
              <g key={country.id} transform={`translate(${point.x} ${point.y})`} filter="url(#pin-glow)">
                <title>{country.country_name}</title>
                <circle r="13" fill="rgba(14, 165, 233, 0.22)" />
                <circle r="6" fill="#4C8DFF" stroke="#B8D4FF" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
        <div className="relative mt-4 flex flex-col gap-4 border-t border-lab-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-lab-text">Countries and territories where the Lab has supported work</p>
          </div>
          <button
            type="button"
            onClick={() => setShowList((value) => !value)}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-lab-border bg-lab-section px-4 py-2 text-sm font-bold text-lab-accent-soft transition hover:border-lab-accent/50 hover:bg-lab-elevated"
            aria-expanded={showList}
          >
            {showList ? 'Hide country list' : `View all ${countries.length} countries`}
          </button>
        </div>
      </div>

      {showList ? (
        <div className="border-t border-lab-border/70 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-lab-accent-soft">Country list</h3>
            <span className="text-xs font-semibold text-lab-muted">{countries.length} entries</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {countries.map((country) => (
              <span
                key={country.id}
                className="rounded-full border border-lab-border bg-lab-base px-3 py-2 text-center text-sm font-semibold leading-tight text-lab-muted shadow-sm transition hover:border-lab-accent/50 hover:bg-lab-section"
              >
                {country.country_name}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}


