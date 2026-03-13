import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  email?: string;
  user_metadata?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: { message: string } }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: { message: string } }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ao montar, verifica se já existe um token salvo no localStorage
  useEffect(() => {
    const token = localStorage.getItem('wefit_token');
    const savedUser = localStorage.getItem('wefit_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('wefit_token');
        localStorage.removeItem('wefit_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      // Salvar token e dados do usuário
      localStorage.setItem('wefit_token', data.access_token);
      localStorage.setItem('wefit_refresh_token', data.refresh_token);
      localStorage.setItem('wefit_user', JSON.stringify(data.user));
      setUser(data.user);
      return {};
    } catch (err: any) {
      return { error: { message: err.message || 'Erro no login' } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      await api.register({ email, password, full_name: fullName });
      return {};
    } catch (err: any) {
      return { error: { message: err.message || 'Erro no cadastro' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('wefit_token');
    localStorage.removeItem('wefit_refresh_token');
    localStorage.removeItem('wefit_user');
    setUser(null);
  };

  const value = { user, loading, signIn, signUp, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
