import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

function hasAuthTokens(): boolean {
  const hash = window.location.hash;
  if (!hash) return false;
  const params = new URLSearchParams(hash.substring(1));
  return (
    params.has('access_token') ||
    params.has('refresh_token') ||
    params.get('type') === 'magiclink' ||
    params.get('type') === 'recovery'
  );
}

export default function AuthCallback() {
  const { session, loading } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    const tokensPresent = hasAuthTokens();
    if (!tokensPresent) {
      setError(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (!error && session) {
      window.location.hash = '#/';
    }
  }, [session, error]);

  useEffect(() => {
    if (error) return;
    const tokensPresent = hasAuthTokens();
    if (tokensPresent && !loading) {
      const t = setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [loading, error]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
        <p className="text-center text-gray-600">
          Invalid or expired link. Please request a new magic link.
        </p>
        <a
          href="#/login"
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:bg-primary-dark"
        >
          Back to login
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary" />
      <p className="text-gray-600">Signing you in...</p>
    </div>
  );
}
