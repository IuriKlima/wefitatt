import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';

const CadastroFinalizado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, formData, userName, businessName } = location.state || {};

  const getDashboardRoute = () => {
    switch (profile) {
      case 'personal': return '/instrutor/dashboard';
      case 'academia': return '/gestor/dashboard';
      case 'rede': return '/admin/dashboard';
      default: return '/login';
    }
  };

  const getRoleName = () => {
    switch (profile) {
      case 'personal': return 'Personal Trainer';
      case 'academia': return 'Gestor de Academia';
      case 'rede': return 'Administrador de Rede';
      default: return 'Usuário';
    }
  };

  return (
    <div className="min-h-screen flex bg-[#09090f]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#09090f] to-indigo-900/30" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center items-center p-16 w-full">
          <div className="max-w-md text-center">
            <Link to="/" className="flex items-center gap-3 mb-12 justify-center">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">WeFit</span>
            </Link>

            <div className="h-20 w-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Bem-vindo(a) à família WeFit!</h2>
            <p className="text-gray-400 leading-relaxed">Sua jornada de transformação fitness começa agora!</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0c0c14]">
        <div className="w-full max-w-xl animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">WeFit</span>
          </div>

          <div className="text-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 lg:hidden">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Cadastro Concluído!</h1>
            <p className="text-gray-500 text-sm">Tudo pronto para você começar</p>
          </div>

          {/* Info Cards */}
          <div className="space-y-4 mb-8">
            <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <h3 className="text-sm font-semibold text-purple-400 mb-1">Conta Criada</h3>
              <p className="text-white font-medium">{userName || 'Usuário'}</p>
              {businessName && <p className="text-gray-400 text-sm">{businessName}</p>}
              <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20 font-medium uppercase tracking-wider">
                {getRoleName()}
              </span>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-sm font-semibold text-white mb-3">Próximos Passos</h3>
              <ul className="space-y-2">
                {['Acesse seu Painel de Administração', 'Configure suas preferências iniciais', 'Explore todas as funcionalidades'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            onClick={() => navigate(getDashboardRoute())}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 group"
          >
            <span className="flex items-center gap-2">
              Acessar meu Painel WeFit
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Button>

          <p className="text-center text-[11px] text-gray-600 mt-4">
            Você pode fazer login a qualquer momento usando seu email e senha.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CadastroFinalizado;
