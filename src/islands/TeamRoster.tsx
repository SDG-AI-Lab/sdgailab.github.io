import { useEffect, useState } from 'react';
import { logAppError } from '../lib/observability';
import { getPublishedPeople } from '../lib/queries';
import { groupPeopleByTeamGroup } from '../lib/teamGroups';
import type { PersonCard } from '../lib/types';
import ObservabilityBoundary from './components/ObservabilityBoundary';

const LOAD_TIMEOUT_MS = 12_000;

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

function TeamRosterContent() {
  const [people, setPeople] = useState<PersonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPeople() {
      try {
        const { data, error: err } = await withTimeout(getPublishedPeople('team'), LOAD_TIMEOUT_MS);
        if (cancelled) return;
        if (err) {
          logAppError('public.team.load', new Error(err));
          setError(err);
        } else {
          setPeople(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          logAppError('public.team.load', loadError);
          setError('Unable to load team information at this time.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPeople();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="team-status" role="status" aria-label="Loading team">
        <span className="team-spinner" aria-hidden="true" />
        <span className="sr-only">Loading team...</span>
      </div>
    );
  }

  if (error && people.length === 0) {
    return (
      <div className="team-status" role="alert">
        <p>Unable to load team information at this time.</p>
      </div>
    );
  }

  const groups = groupPeopleByTeamGroup(people);

  if (groups.length === 0) {
    return (
      <div className="team-status">
        <p>No members listed yet.</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <p className="team-refresh-note">Team information is currently being refreshed.</p>
      )}
      {groups.map((group) => (
        <div className="team-group reveal is-visible" key={group.title}>
          <h2>{group.title}</h2>
          <div className="team-row">
            {group.members.map((person) => (
              <article className="person-card" key={person.id}>
                <div className="person-avatar">
                  {person.photo_url ? (
                    <img
                      src={person.photo_url}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
                <div className="name">{person.name}</div>
                <div className="role">{person.role_title}</div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function TeamRoster() {
  return (
    <ObservabilityBoundary surface="public" name="TeamRoster">
      <TeamRosterContent />
    </ObservabilityBoundary>
  );
}
