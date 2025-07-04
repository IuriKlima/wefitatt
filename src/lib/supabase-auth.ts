
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const authService = {
  // Fazer login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Registrar usuário
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  },

  // Fazer logout
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Obter sessão atual
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Listener para mudanças na autenticação
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Resetar senha
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { data, error };
  },

  // Atualizar senha
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    return { data, error };
  },

  // Atualizar perfil
  async updateProfile(updates: {
    full_name?: string;
    phone?: string;
    cpf?: string;
    avatar_url?: string;
  }) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    return { data, error };
  },
};
