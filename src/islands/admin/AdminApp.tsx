import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import LoginPage from './auth/LoginPage';
import AdminLayout from './layout/AdminLayout';
import DashboardPage from './dashboard/DashboardPage';
import StatisticsListPage from './statistics/StatisticsListPage';
import StatisticFormPage from './statistics/StatisticFormPage';
import ProjectsListPage from './projects/ProjectsListPage';
import ProjectFormPage from './projects/ProjectFormPage';
import NewsListPage from './news/NewsListPage';
import NewsFormPage from './news/NewsFormPage';
import PeopleListPage from './people/PeopleListPage';
import PersonFormPage from './people/PersonFormPage';
import PartnersListPage from './partners/PartnersListPage';
import PartnerFormPage from './partners/PartnerFormPage';
import PageContentListPage from './page-content/PageContentListPage';
import PageContentFormPage from './page-content/PageContentFormPage';

interface NavigationGuardContextType {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
}

export const NavigationGuardContext =
  createContext<NavigationGuardContextType>({
    isDirty: false,
    setIsDirty: () => {},
  });

export function useNavigationGuard() {
  return useContext(NavigationGuardContext);
}

function parseHash(hash: string): { path: string; id: string | null } {
  const raw = hash.replace(/^#/, '') || '/';
  const parts = raw.split('/').filter(Boolean);
  if (parts.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(parts[parts.length - 1])) {
    return {
      path: '/' + parts.slice(0, -1).join('/'),
      id: parts[parts.length - 1],
    };
  }
  return {
    path: '/' + parts.join('/') || '/',
    id: null,
  };
}

function useHashRoute() {
  const { isDirty } = useNavigationGuard();
  const skipConfirmRef = useRef(false);
  const [route, setRoute] = useState(() =>
    parseHash(typeof window !== 'undefined' ? window.location.hash : '')
  );

  useEffect(() => {
    const handleHashChange = (e: HashChangeEvent) => {
      const newHash = new URL(e.newURL).hash;
      const oldHash = new URL(e.oldURL).hash;
      if (skipConfirmRef.current) {
        skipConfirmRef.current = false;
        setRoute(parseHash(newHash));
        return;
      }
      if (isDirty && !window.confirm('You have unsaved changes. Leave anyway?')) {
        skipConfirmRef.current = true;
        window.location.hash = oldHash;
        return;
      }
      setRoute(parseHash(newHash));
    };

    const hash = window.location.hash;
    setRoute(parseHash(hash || '#/'));

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isDirty]);

  return route;
}

function matchRoute(path: string, id: string | null): React.ReactNode {
  const normalized = path === '' ? '/' : path;
  switch (normalized) {
    case '/':
      return <DashboardPage />;
    case '/statistics':
      return <StatisticsListPage />;
    case '/statistics/new':
      return <StatisticFormPage />;
    case '/statistics/edit':
      return <StatisticFormPage id={id} />;
    case '/projects':
      return <ProjectsListPage />;
    case '/projects/new':
      return <ProjectFormPage />;
    case '/projects/edit':
      return <ProjectFormPage id={id} />;
    case '/news':
      return <NewsListPage />;
    case '/news/new':
      return <NewsFormPage />;
    case '/news/edit':
      return <NewsFormPage id={id} />;
    case '/people':
      return <PeopleListPage />;
    case '/people/new':
      return <PersonFormPage />;
    case '/people/edit':
      return <PersonFormPage id={id} />;
    case '/partners':
      return <PartnersListPage />;
    case '/partners/new':
      return <PartnerFormPage />;
    case '/partners/edit':
      return <PartnerFormPage id={id} />;
    case '/page-content':
      return <PageContentListPage />;
    case '/page-content/new':
      return <PageContentFormPage />;
    case '/page-content/edit':
      return <PageContentFormPage id={id} />;
    default:
      return (
        <div className="py-12 text-center text-gray-500">
          Page not found.{' '}
          <a href="#/" className="text-primary underline">
            Go to Dashboard
          </a>
        </div>
      );
  }
}

function AdminAppInner() {
  const { session, loading } = useAuth();
  const { path, id } = useHashRoute();
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (hash.includes('access_token')) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Signing you in...
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <AdminLayout currentPath={path}>
      {matchRoute(path, id)}
    </AdminLayout>
  );
}

export default function AdminApp() {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <AuthProvider>
      <NavigationGuardContext.Provider value={{ isDirty, setIsDirty }}>
        <AdminAppInner />
      </NavigationGuardContext.Provider>
    </AuthProvider>
  );
}
