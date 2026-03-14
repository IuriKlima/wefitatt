import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, Calendar, CreditCard, BarChart3, Smartphone, Brain,
  ArrowRight, Zap, ShieldCheck, TrendingUp, Star
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Homepage = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe ALL elements with .reveal class
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const chartData = [
    { name: 'Jan', alunos: 320, receita: 2400 },
    { name: 'Fev', alunos: 380, receita: 2800 },
    { name: 'Mar', alunos: 420, receita: 3200 },
    { name: 'Abr', alunos: 490, receita: 3800 },
    { name: 'Mai', alunos: 560, receita: 4200 },
    { name: 'Jun', alunos: 620, receita: 4800 },
    { name: 'Jul', alunos: 710, receita: 5400 },
  ];

  const features = [
    { icon: Users, title: 'Gestão de Alunos', description: 'Cadastro completo, histórico de treinos e acompanhamento personalizado de alta performance.' },
    { icon: Calendar, title: 'Agendamento Inteligente', description: 'Sistema automatizado de aulas com reserva dinâmica e notificações em tempo real.' },
    { icon: CreditCard, title: 'Financeiro Completo', description: 'Gestão de recorrência automatizada com integração direta aos principais gateways.' },
    { icon: BarChart3, title: 'Analytics Preditivo', description: 'Dados em tempo real transformados em insights estratégicos para o seu crescimento.' },
    { icon: Smartphone, title: 'App Experience', description: 'Experiência mobile fluida para alunos e controle total para gestores na palma da mão.' },
    { icon: Brain, title: 'WeFit AI Brain', description: 'Inteligência artificial proprietária que otimiza treinos e reduz a evasão em até 40%.' }
  ];

  const testimonials = [
    { name: 'Carlos Silva', role: 'FitLife Academia', text: 'O WeFit revolucionou nossa gestão. Aumentamos 40% na retenção de alunos!', rating: 5 },
    { name: 'Marina Santos', role: 'PowerGym', text: 'Interface intuitiva e suporte excepcional. Recomendo para todas as academias.', rating: 5 },
    { name: 'João Oliveira', role: 'BodyShape', text: 'Automatizou todos nossos processos. Economizamos 15 horas por semana!', rating: 5 },
  ];

  return (
    <div className="pt-20">
      {/* ──── HERO ──── */}
      <section className="relative py-24 lg:py-32 px-6">
        {/* Decorative line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text */}
            <div className="lg:w-1/2 text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                <span>Nova Versão 2.0 Disponível</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                A Experiência <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                  Definitiva em Gestão
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
                Transforme sua academia com uma plataforma tecnológica de elite. Gestão, IA e Analytics integrados em um ecossistema premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 transition-all text-base" asChild>
                  <Link to="/cadastro" className="flex items-center gap-2">
                    Começar Agora <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-6 rounded-xl font-semibold transition-all text-base" asChild>
                  <Link to="/login">Demonstração</Link>
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2 relative animate-fade-in-delay-1">
              <div className="absolute -inset-8 bg-purple-500/10 blur-3xl rounded-full" />
              <div className="relative animate-float">
                <img 
                  src="/assets/dashboard_mockup.png" 
                  alt="WeFit Dashboard" 
                  className="rounded-2xl border border-white/10 shadow-2xl w-full"
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 hidden md:flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Crescimento Mensal</div>
                    <div className="text-lg font-bold text-white">+24.8%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── STATS BAR ──── */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Academias Ativas', value: '500+' },
              { label: 'Alunos Gerenciados', value: '1.2M' },
              { label: 'Países', value: '12' },
              { label: 'Retenção Média', value: '94%' }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── DASHBOARD PREVIEW (Charts) ──── */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Inteligência Orientada a Dados</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Visualize cada detalhe da sua operação com dashboards dinâmicos e interativos.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch reveal">
            {/* Main Chart */}
            <div className="lg:col-span-2 glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Crescimento de Alunos
                </h3>
                <span className="text-sm text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1 rounded-full">+12% vs mês anterior</span>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gradientAlunos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradientReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="alunos" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#gradientAlunos)" name="Alunos" />
                    <Area type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#gradientReceita)" name="Receita (R$)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Side Cards */}
            <div className="flex flex-col gap-8">
              <div className="glass-card p-8 flex-1 hover-glow">
                <ShieldCheck className="h-8 w-8 text-emerald-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Segurança Avançada</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Dados protegidos com criptografia de ponta a ponta e redundância global.</p>
              </div>
              <div className="glass-card p-8 flex-1 hover-glow">
                <Brain className="h-8 w-8 text-purple-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Automação com IA</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Otimize recepção e suporte com inteligência artificial integrada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── FEATURES ──── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Arquitetura de Alta Performance</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Cada funcionalidade foi desenhada para maximizar a eficiência e a lucratividade do seu negócio.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 hover-glow group">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── TESTIMONIALS ──── */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">O que nossos clientes dizem</h2>
            <p className="text-gray-400">Academias reais, resultados reais</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-8 hover-glow">
                <div className="flex mb-4 gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic text-sm leading-relaxed">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FINAL CTA ──── */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden reveal">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-emerald-400" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              Pronto para entrar na elite <br />
              <span className="text-purple-400">da gestão fitness?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Escolha a tecnologia que as melhores academias do mundo já utilizam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-6 rounded-xl font-semibold shadow-lg shadow-purple-600/20 transition-all text-base" asChild>
                <Link to="/cadastro">Começar Agora Grátis</Link>
              </Button>
              <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-6 rounded-xl font-semibold transition-all text-base" asChild>
                <Link to="/contato">Falar com Consultor</Link>
              </Button>
            </div>
            <p className="text-[11px] text-gray-600 mt-6 uppercase tracking-widest font-bold">Teste grátis por 30 dias • Cancelamento a qualquer momento</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
