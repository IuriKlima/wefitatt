
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, Zap, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/contexts/UserContext';

// Demo accounts for development/testing
const DEMO_ACCOUNTS: Record<string, { id: string; name: string; email: string; profile: UserProfile }> = {
  'super@wefit.com': { id: 'super-1', name: 'Super Admin', email: 'super@wefit.com', profile: 'super_admin' },
  'admin@wefit.com': { id: 'admin-1', name: 'Administrador Rede', email: 'admin@wefit.com', profile: 'administrador' },
  'gestor@wefit.com': { id: 'gestor-1', name: 'Gestor Academia', email: 'gestor@wefit.com', profile: 'gestor' },
  'instrutor@wefit.com': { id: 'inst-1', name: 'Personal Trainer', email: 'instrutor@wefit.com', profile: 'instrutor' },
  'recepcionista@wefit.com': { id: 'recep-1', name: 'Recepcionista', email: 'recepcionista@wefit.com', profile: 'recepcionista' },
  'aluno@wefit.com': { id: 'aluno-1', name: 'Aluno Demo', email: 'aluno@wefit.com', profile: 'aluno' },
};

const ROLE_DASHBOARD: Record<UserProfile, string> = {
  super_admin: '/super/dashboard',
  administrador: '/admin/dashboard',
  gestor: '/gestor/dashboard',
  instrutor: '/instrutor/dashboard',
  recepcionista: '/recepcionista/dashboard',
  aluno: '/aluno/painel',
};

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleDemoLogin = (demoEmail: string) => {
    const account = DEMO_ACCOUNTS[demoEmail];
    if (!account) return;

    // Set auth token so ProtectedRoute works
    localStorage.setItem('wefit_token', 'demo-token');
    localStorage.setItem('wefit_user', JSON.stringify({ id: account.id, email: account.email }));
    localStorage.setItem('wefit_profile_user', JSON.stringify(account));

    setUser(account);
    toast({ title: "Login demo realizado!", description: `Bem-vindo, ${account.name}` });
    // Need to reload to trigger auth state
    window.location.href = ROLE_DASHBOARD[account.profile];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if it's a demo account first
    const demoAccount = DEMO_ACCOUNTS[formData.email];
    if (demoAccount) {
      handleDemoLogin(formData.email);
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ title: "Erro no login", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Login realizado!", description: "Bem-vindo ao WeFit" });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast({ title: "Erro inesperado", description: "Tente novamente", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#09090f]">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#09090f] to-indigo-900/30" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 flex flex-col justify-center p-16 w-full">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-12">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">WeFit</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              Gerencie sua<br />
              <span className="text-gradient">academia inteligente</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-md">
              Plataforma completa para gestão de academias, personal trainers e estúdios fitness com IA integrada.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '2.5K+', label: 'Academias' },
                { value: '150K+', label: 'Alunos ativos' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0c0c14]">
        <div className="w-full max-w-[420px] animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">WeFit</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Acessar plataforma</h2>
            <p className="text-gray-500 text-sm">Entre com suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4 transition-colors group-focus-within:text-purple-400" />
                <Input id="email" type="email" placeholder="seu@email.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-11 h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/40"
                  required disabled={loading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Senha</Label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4 transition-colors group-focus-within:text-purple-400" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-11 pr-11 h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/40"
                  required disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors" disabled={loading}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link to="/recuperar-senha" className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <Button type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-purple-500/20 group"
              disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Acessar plataforma
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              )}
            </Button>
          </form>

          {/* Demo Access */}
          <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="h-3 w-3" /> Acesso demo (senha: 123456)
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {Object.entries(DEMO_ACCOUNTS).map(([email, acc]) => (
                <button key={email} onClick={() => handleDemoLogin(email)}
                  className="text-[10px] py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-purple-500/10 text-gray-500 hover:text-purple-400 transition-colors border border-white/[0.06] hover:border-purple-500/20 truncate font-medium">
                  {acc.profile === 'super_admin' ? '⚡ Super' : acc.profile === 'administrador' ? 'Admin' : acc.profile === 'gestor' ? 'Gestor' : acc.profile === 'instrutor' ? 'Instrutor' : acc.profile === 'recepcionista' ? 'Recep.' : 'Aluno'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Ainda não tem conta?{' '}
              <Link to="/cadastro" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Criar conta
              </Link>
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.06]">
            <p className="text-[11px] text-gray-700 text-center">© 2026 WeFit Platform. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
