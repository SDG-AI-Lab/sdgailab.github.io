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

function getSectionId(section: string) {
  return `team-section-${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function groupPeopleBySection(people: PersonCard[]) {
  const sections = new Map<string, PersonCard[]>();

  for (const person of people) {
    const section = getTeamSection(person);
    sections.set(section, [...(sections.get(section) ?? []), person]);
  }

  return [
    ...TEAM_SECTIONS.map((section) => [section, sections.get(section) ?? []] as const),
    ...Array.from(sections.entries()).filter(
      ([section]) => !TEAM_SECTIONS.includes(section as (typeof TEAM_SECTIONS)[number])
    ),
  ].filter(([, members]) => members.length > 0);
}

function PersonCardView({ person }: { person: PersonCard }) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white text-center shadow-md">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {person.photo_url ? (
          <img
            src={person.photo_url}
            alt={person.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-50">
            <svg className="h-20 w-20 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{person.role_title}</p>
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading people...</span>
      </div>
    );
  }

  if (error && people.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load team information at this time.</p>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 italic">
        <p>No members listed yet.</p>
      </div>
    );
  }

  const groupedPeople =
    groupType === 'team' ? groupPeopleBySection(people) : ([['People', people]] as const);

  return (
    <div>
      {error && (
        <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Team information is currently being refreshed.
        </p>
      )}

      <div className="space-y-12">
        {groupedPeople.map(([section, members]) => (
          <section key={section} aria-labelledby={getSectionId(section)}>
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
              <div>
                <p className="section-label">Team</p>
                <h2 id={getSectionId(section)} className="text-2xl font-bold text-slate-950">
                  {section}
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {members.length} member{members.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((person) => (
                <PersonCardView key={person.id} person={person} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
