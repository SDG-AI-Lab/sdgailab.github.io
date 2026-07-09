import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseAuth } from '../../../lib/supabase-auth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  adminUser: { email: string; role: 'admin' | 'editor' } | null;
  isEditor: boolean;
  loading: boolean;
  authorizationError: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; role: 'admin' | 'editor' } | null>(
    null
  );
  const [authorizationError, setAuthorizationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    await getSupabaseAuth().auth.signOut();
    setSession(null);
    setUser(null);
    setAdminUser(null);
    setAuthorizationError(null);
  }, []);

  const applySession = useCallback(async (s: Session | null) => {
    setSession(s);
    setUser(s?.user ?? null);
    setAdminUser(null);
    setAuthorizationError(null);

    if (!s) {
      setLoading(false);
      return;
    }

    const { data, error } = await getSupabaseAuth()
      .from('admin_users')
      .select('email, role')
      .maybeSingle();

    if (error) {
      setAuthorizationError(error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setAuthorizationError('This account is not approved for editor access.');
      setLoading(false);
      return;
    }

    setAdminUser(data as { email: string; role: 'admin' | 'editor' });
    setLoading(false);
  }, []);

  useEffect(() => {
    getSupabaseAuth().auth.getSession().then(({ data: { session: s } }) => {
      void applySession(s);
    });

    const { data: { subscription } } = getSupabaseAuth().auth.onAuthStateChange((event, s) => {
      if (event === 'SIGNED_IN' && s) {
        setLoading(true);
        void applySession(s);
      } else if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !s)) {
        void applySession(null);
      } else if (event === 'TOKEN_REFRESHED' && s) {
        void applySession(s);
      }
    });

    return () => subscription.unsubscribe();
  }, [applySession]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        adminUser,
        isEditor: Boolean(adminUser),
        loading,
        authorizationError,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
