import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { PERMISSIONS } from '@/admin/lib/permissions';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin profile from admin_profiles table
  const fetchProfile = useCallback(async (userId) => {
    console.warn('AuthContext: fetchProfile starting for userId:', userId);
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('AuthContext: fetchProfile database error:', error.message);
        return null;
      }
      console.warn('AuthContext: fetchProfile succeeded, data:', data);
      return data;
    } catch (err) {
      console.error('AuthContext: fetchProfile exception:', err);
      return null;
    }
  }, []);

  // Log activity
  const logActivity = useCallback(async (action, entityType, entityId = null, entityTitle = null, details = null) => {
    if (!session?.user?.id) return;
    try {
      await supabase.from('activity_logs').insert({
        user_id: session.user.id,
        action,
        entity_type: entityType,
        entity_id: entityId,
        entity_title: entityTitle,
        details,
      });
    } catch (err) {
      console.error('Failed to log activity:', err);
    }
  }, [session]);

  // 1. Manage and listen to auth session state
  useEffect(() => {
    let active = true;
    console.warn('AuthContext: Setting up session listener...');

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!active) return;
      console.warn('AuthContext: Initial getSession resolved, session:', s?.user?.email || 'none');
      setSession(s);
      // If there is no user session at start, stop the loading state immediately
      if (!s?.user) {
        setLoading(false);
      }
    }).catch(err => {
      console.error('AuthContext: Error getting initial session:', err);
      if (active) setLoading(false);
    });

    // Listen for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, s) => {
        if (!active) return;
        console.warn('AuthContext: onAuthStateChange event fired:', event, 'user:', s?.user?.email || 'none');
        
        setSession(s);
        
        // If logged out or session destroyed, immediately reset profile and stop loading
        if (!s?.user) {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      console.warn('AuthContext: Tearing down session listener...');
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // 2. Reactively load user profile in a separate useEffect when session changes (prevents Supabase JS deadlocks)
  useEffect(() => {
    let active = true;

    async function loadProfile() {
      if (!session?.user) {
        return; // Handled by session listener
      }

      console.warn('AuthContext: Session exists. Fetching profile for user:', session.user.email);
      setLoading(true);

      try {
        const p = await fetchProfile(session.user.id);
        if (!active) return;
        setProfile(p);
      } catch (err) {
        console.error('AuthContext: Error in loadProfile:', err);
      } finally {
        if (active) {
          setLoading(false);
          console.warn('AuthContext: Finished loading profile, setting loading to false.');
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [session, fetchProfile]);

  // Auth actions
  const signIn = async (email, password) => {
    console.warn('AuthContext: signIn action starting for email:', email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    // Log login activity
    try {
      await supabase.from('activity_logs').insert({
        user_id: data.user.id,
        action: 'login',
        entity_type: 'auth',
        entity_title: data.user.email,
      });
    } catch (err) {
      console.error('AuthContext: Failed to insert login log:', err);
    }
    
    return data;
  };

  const signOut = async () => {
    await logActivity('logout', 'auth');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  // Permission checker
  const can = useCallback(
    (permission) => {
      if (!profile?.role) return false;
      const checker = PERMISSIONS[permission];
      return checker ? checker(profile.role) : false;
    },
    [profile]
  );

  const value = {
    session,
    user: session?.user || null,
    profile,
    loading,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    logActivity,
    can,
    isAuthenticated: !!session?.user && !!profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
