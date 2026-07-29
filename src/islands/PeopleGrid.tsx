import { useEffect, useState } from 'react';
import { logAppError } from '../lib/observability';
import { getPublishedPeople } from '../lib/queries';
import type { PersonCard, PeopleGroup } from '../lib/types';
import ObservabilityBoundary from './components/ObservabilityBoundary';

const LOAD_TIMEOUT_MS = 12_000;
const TEAM_SECTIONS = [
  'Coordination Team',
  'Research & Advisory Team',
  'GIS & GeoAI Team',
  'Software Development Team',
  'NLP/LLM Team',
  'Training Team',
] as const;

interface PeopleGridProps {
  groupType: PeopleGroup;
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('Request timed out')), ms);
    promise
      .then((value) => {
        window.clearTimeout(timer);
        resolve(value);
      })
      .catch((error: unknown) => {
        window.clearTimeout(timer);
        reject(error);
      });
  });
}

function getTeamSection(person: PersonCard) {
  return TEAM_SECTIONS.find((section) => person.biography?.includes(section)) ?? 'Team';
}

function PersonCardView({ person }: { person: PersonCard }) {
  const section = getTeamSection(person);

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-[#111a36] text-center shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-blue-300/40 hover:shadow-blue-950/30">
      <div className="aspect-[1.15/1] overflow-hidden bg-[#e9edff]">
        {person.photo_url ? (
          <img
            src={person.photo_url}
            alt={person.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#eef1ff]">
            <svg className="h-16 w-16 text-indigo-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="inline-flex rounded-full bg-blue-500/25 px-3 py-1 text-[11px] font-bold leading-none text-blue-100">
          {section}
        </span>
        <h3 className="mt-3 text-base font-bold text-white">{person.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{person.role_title}</p>
      </div>
    </article>
  );
}

export default function PeopleGrid({ groupType }: PeopleGridProps) {
  return (
    <ObservabilityBoundary surface="public" name="PeopleGrid">
      <PeopleGridContent groupType={groupType} />
    </ObservabilityBoundary>
  );
}

function PeopleGridContent({ groupType }: PeopleGridProps) {
  const [people, setPeople] = useState<PersonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPeople() {
      try {
        const { data, error: err } = await withTimeout(
          getPublishedPeople(groupType),
          LOAD_TIMEOUT_MS
        );

        if (cancelled) return;

        if (err) {
          logAppError('public.people.load', new Error(err), { groupType });
          setError(err);
        } else {
          setPeople(data);
        }
      } catch (error) {
        if (!cancelled) {
          logAppError('public.people.load', error, { groupType });
          setError('Unable to load team information at this time.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPeople();

    return () => {
      cancelled = true;
    };
  }, [groupType]);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-300/30 border-t-blue-400" />
        <span className="sr-only">Loading people...</span>
      </div>
    );
  }

  if (error && people.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-slate-300">
        <p>Unable to load team information at this time.</p>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-slate-300 italic">
        <p>No members listed yet.</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <p className="mb-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
          Team information is currently being refreshed.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {people.map((person) => (
          <PersonCardView key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
}