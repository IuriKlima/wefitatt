import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Users, Building, Network, ArrowRight, Check, Star } from 'lucide-react';

const Cadastro = () => {
  const plans = [
    {
      id: 'personal',
      name: 'Personal',
      icon: Users,
      role: 'instrutor',
      price: '49',
      originalPrice: '99',
      highlight: 'Para Personal Trainers',
      description: 'Gerencie seus alunos, treinos e agenda em uma plataforma profissional.',
      features: ['Até 50 alunos', 'App do aluno', 'Treinos personalizados', 'Agendamento', 'Pagamentos online'],
      popular: false
    },
    {
      id: 'academia',
      name: 'Academia',
      icon: Building,
      role: 'gestor',
      price: '99',
      originalPrice: '199',
      highlight: 'Para Academias',
      description: 'Gestão completa da sua academia com controle total de operações.',
      features: ['Membros ilimitados', 'Controle de acesso', 'Grade de aulas', 'Financeiro completo', 'Gestão de equipe', 'Relatórios'],
      popular: true
    },
    {
      id: 'rede',
      name: 'Rede',
      icon: Network,
      role: 'administrador',
      price: 'Consultar',
      originalPrice: null,
      highlight: 'Para Redes de Academias',
      description: 'Solução enterprise para multi-unidades com analytics avançado.',
      features: ['Multi-unidades', 'Painel global', 'Analytics comparativo', 'RBAC avançado', 'Suporte 24/7', 'API dedicada'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#09090f]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#09090f] to-indigo-900/30" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 flex flex-col justify-center p-16 w-full">
          <div className="max-w-lg">
            <Link to="/" className="flex items-center gap-3 mb-12">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">WeFit</span>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
              Escolha o plano<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">ideal para você</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-md">
              Cada plano foi desenhado para atender diferentes necessidades do mercado fitness. Comece com 14 dias grátis.
            </p>

            <div className="space-y-4">
              {['Sem contrato de fidelidade', 'Migre de plano a qualquer momento', '14 dias de teste grátis'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Plan Cards */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 bg-[#0c0c14] overflow-y-auto">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">WeFit</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Selecione seu plano</h2>
            <p className="text-gray-500 text-sm">Escolha o tipo de conta e comece sua jornada</p>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                to={`/cadastro-fluxo?profile=${plan.id}`}
                className={`block group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
                  plan.popular 
                    ? 'bg-white/[0.06] border-purple-500/40 hover:border-purple-500/60 shadow-lg shadow-purple-500/5' 
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
                      <Star className="h-3 w-3" /> MAIS POPULAR
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-5">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    plan.popular ? 'bg-purple-500/20' : 'bg-white/[0.06]'
                  }`}>
                    <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-purple-400' : 'text-gray-400'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                        <p className="text-xs text-purple-400 font-medium">{plan.highlight}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          {plan.price === 'Consultar' ? plan.price : `R$${plan.price}`}
                        </div>
                        {plan.originalPrice && (
                          <div className="text-xs text-gray-600">
                            <span className="line-through">R${plan.originalPrice}</span>/mês
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-3">{plan.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {plan.features.slice(0, 4).map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.06]">
                          {f}
                        </span>
                      ))}
                      {plan.features.length > 4 && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          +{plan.features.length - 4} mais
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-[11px] text-gray-700 text-center">
              © 2026 WeFit Platform. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
