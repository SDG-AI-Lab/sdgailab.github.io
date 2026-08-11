import { useEffect, useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { getPublishedGeographicReach } from '../lib/queries';
import type { GeographicReachCard } from '../lib/types';
import type { Feature, FeatureCollection, Geometry } from 'geojson';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

const topology = worldAtlas as any;
const countriesFeature = feature(topology, topology.objects.countries) as unknown as FeatureCollection;
const countryFeatures = countriesFeature.features as Feature<Geometry>[];
const projection = geoNaturalEarth1().fitSize([MAP_WIDTH, MAP_HEIGHT], countriesFeature);
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
    getPublishedGeographicReach().then(({ data, error: err }) => {
      setCountries(data);
      setError(err);
      setLoading(false);
    });
  }, []);

  const mappedCountries = useMemo(
    () => countries.filter((country) => country.latitude != null && country.longitude != null),
    [countries]
  );

  if (loading) {
    return <div className="h-72 rounded-2xl border border-[#c9ddf4] bg-white shadow-sm" role="status" aria-label="Loading geographic reach" />;
  }

  if (error && countries.length === 0) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
        Geographic reach information is currently being updated.
      </p>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#c9ddf4] bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-bold text-[#101d35]">Geographic reach information is being updated.</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#667995]">
          Please check back soon for the latest country and territory coverage.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-[#c9ddf4] bg-white p-3 shadow-[0_18px_50px_rgba(16,29,53,0.08)] sm:p-5">
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
              const d = path(country);
              if (!d) return null;
              return (
                <path
                  key={country.id ?? index}
                  d={d}
                  fill="#d9e8fb"
                  stroke="#b8cde8"
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
                <circle r="6" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
        <div className="relative mt-4 flex flex-col gap-4 border-t border-[#d7e5f7] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#101d35]">Countries and territories where the Lab has supported work</p>
          </div>
          <button
            type="button"
            onClick={() => setShowList((value) => !value)}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#bdd9fb] bg-[#eaf5ff] px-4 py-2 text-sm font-bold text-[#246bfe] transition hover:border-[#246bfe]/40 hover:bg-[#d8ecff]"
            aria-expanded={showList}
          >
            {showList ? 'Hide country list' : `View all ${countries.length} countries`}
          </button>
        </div>
      </div>

      {showList ? (
        <div className="rounded-2xl border border-[#c9ddf4] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#246bfe]">Country list</h3>
            <span className="text-xs font-semibold text-[#667995]">{countries.length} entries</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {countries.map((country) => (
              <span
                key={country.id}
                className="rounded-full border border-[#c9ddf4] bg-[#f4f8fd] px-3 py-2 text-center text-sm font-semibold leading-tight text-[#334867] shadow-sm transition hover:border-[#246bfe]/40 hover:bg-[#eaf5ff]"
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
