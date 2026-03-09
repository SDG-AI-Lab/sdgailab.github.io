import { useEffect, useState } from 'react';
import { getPublishedPeople } from '../lib/queries';
import type { PersonCard, PeopleGroup } from '../lib/types';

interface PeopleGridProps {
  groupType: PeopleGroup;
}

export default function PeopleGrid({ groupType }: PeopleGridProps) {
  const [people, setPeople] = useState<PersonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPeople(groupType).then(({ data, error: err }) => {
      if (err) setError(err);
      else setPeople(data);
      setLoading(false);
    });
  }, [groupType]);

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
        <span className="sr-only">Loading people...</span>
      </div>
    );
  }

  if (error) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {people.map((person) => (
        <article
          key={person.id}
          className="rounded-lg bg-white shadow-md border border-gray-100 overflow-hidden text-center"
        >
          <div className="aspect-square overflow-hidden bg-gray-100">
            {person.photo_url ? (
              <img
                src={person.photo_url}
                alt={person.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary-50">
                <svg className="h-20 w-20 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{person.role_title}</p>
            {person.biography && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-3">{person.biography}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
