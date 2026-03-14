
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

export type UserProfile = 'super_admin' | 'administrador' | 'gestor' | 'instrutor' | 'recepcionista' | 'aluno';

interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  switchProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: authUser } = useAuth();

  const [user, setUser] = useState<User | null>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem('wefit_profile_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return null;
  });

  // Sync with auth: when auth user logs in/out, update user context
  useEffect(() => {
    if (authUser && !user) {
      const role = (authUser as any).role || (authUser as any).user_metadata?.role || 'administrador';
      const newUser: User = {
        id: authUser.id,
        name: (authUser as any).full_name || (authUser as any).user_metadata?.full_name || authUser.email || 'Usuário',
        email: authUser.email || '',
        profile: role as UserProfile,
      };
      setUser(newUser);
      localStorage.setItem('wefit_profile_user', JSON.stringify(newUser));
    } else if (!authUser && user) {
      // Auth logged out
      setUser(null);
      localStorage.removeItem('wefit_profile_user');
    }
  }, [authUser]);

  const switchProfile = (profile: UserProfile) => {
    if (user) {
      const updated = { ...user, profile };
      setUser(updated);
      localStorage.setItem('wefit_profile_user', JSON.stringify(updated));
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, switchProfile }}>
      {children}
    </UserContext.Provider>
  );
};
