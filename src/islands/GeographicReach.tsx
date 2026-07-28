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
    return <div className="h-72 rounded-2xl border border-white/10 bg-white/5" role="status" aria-label="Loading geographic reach" />;
  }

  if (error && countries.length === 0) {
    return (
      <p className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
        Geographic reach information is currently being updated.
      </p>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
        <h3 className="text-lg font-bold text-white">Geographic reach information is being updated.</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">
          Please check back soon for the latest country and territory coverage.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07142c] p-3 shadow-2xl shadow-sky-950/30 sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_76%_36%,rgba(59,130,246,0.13),transparent_35%)]" />
        <svg
          className="relative h-auto w-full"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label={`World map showing ${mappedCountries.length} geographic reach entries`}
        >
          <defs>
            <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(148, 163, 184, 0.10)" strokeWidth="1" />
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
                  fill="rgba(30, 64, 175, 0.58)"
                  stroke="rgba(125, 211, 252, 0.24)"
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
        <div className="relative mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Countries and territories where the Lab has supported work</p>
          </div>
          <button
            type="button"
            onClick={() => setShowList((value) => !value)}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/10 px-4 py-2 text-sm font-bold text-sky-100 transition hover:border-sky-200 hover:bg-sky-300/20"
            aria-expanded={showList}
          >
            {showList ? 'Hide country list' : `View all ${countries.length} countries`}
          </button>
        </div>
      </div>

      {showList ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-sky-200">Country list</h3>
            <span className="text-xs text-slate-400">{countries.length} entries</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {countries.map((country) => (
              <span
                key={country.id}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-center text-sm font-semibold leading-tight text-white shadow-sm backdrop-blur transition hover:border-sky-300/60 hover:bg-sky-300/10"
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
