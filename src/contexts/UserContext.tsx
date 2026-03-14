
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(null);

  const switchProfile = (profile: UserProfile) => {
    if (user) {
      setUser({ ...user, profile });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, switchProfile }}>
      {children}
    </UserContext.Provider>
  );
};
