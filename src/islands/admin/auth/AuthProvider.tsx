import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabaseAuth } from '../../../lib/supabase-auth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    await supabaseAuth.auth.signOut();
  }, []);

  useEffect(() => {
    supabaseAuth.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((event, s) => {
      if (event === 'SIGNED_IN' && s) {
        setSession(s);
        setUser(s.user);
      } else if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !s)) {
        setSession(null);
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED' && s) {
        setSession(s);
        setUser(s.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
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
