import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, Smartphone, TrendingUp, Megaphone, MessageCircle, Shield, Users, Clock, BarChart3, Target, Brain } from 'lucide-react';
import DiscountPopup from '@/components/DiscountPopup';

const Homepage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const features = [{
    icon: Settings,
    title: "Gestão Inteligente e Centralizada",
    description: "Controle total da sua academia em uma única plataforma"
  }, {
    icon: Smartphone,
    title: "Aplicativo Completo",
    description: "Para alunos e instrutores com experiência intuitiva"
  }, {
    icon: TrendingUp,
    title: "Financeiro Simplificado",
    description: "Controle total das finanças com relatórios detalhados"
  }, {
    icon: Megaphone,
    title: "Marketing e Retenção",
    description: "Ferramentas para engajar e fidelizar seus alunos"
  }, {
    icon: MessageCircle,
    title: "Agente WhatsApp Inteligente",
    description: "Atendimento automatizado 24/7 para seus clientes"
  }, {
    icon: Shield,
    title: "Segurança e Confiabilidade",
    description: "Dados protegidos com a mais alta tecnologia"
  }];
  const benefits = [{
    icon: Users,
    title: "Aumente a Retenção de Alunos",
    description: "Ferramentas de engajamento, acompanhamento personalizado e comunicação eficaz."
  }, {
    icon: Clock,
    title: "Otimize seu Tempo",
    description: "Automatize tarefas repetitivas e foque no que realmente importa: seus alunos e seu negócio."
  }, {
    icon: Target,
    title: "Melhore a Experiência do Aluno",
    description: "App intuitivo, treinos na palma da mão, agendamentos fáceis e acompanhamento de progresso."
  }, {
    icon: TrendingUp,
    title: "Venda Mais Planos e Serviços",
    description: "Funis de venda, gestão de leads e ponto de venda integrado."
  }, {
    icon: BarChart3,
    title: "Decisões Baseadas em Dados",
    description: "Relatórios completos e analytics para uma gestão estratégica."
  }];
  const differentials = [{
    title: "Inteligência Artificial e Agente WhatsApp",
    description: "Um salto para o futuro do atendimento e gestão."
  }, {
    title: "Ecossistema Completo e Integrado",
    description: "Da gestão administrativa ao engajamento total do aluno em uma única plataforma."
  }, {
    title: "Foco na Experiência do Usuário",
    description: "Interfaces pensadas para todos os níveis, do admin ao aluno."
  }];
  const testimonials = [{
    name: "Carlos Silva",
    gym: "Academia Forte & Saudável",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "O Wefit revolucionou nossa gestão. Aumentamos 40% na retenção de alunos nos primeiros 6 meses!"
  }, {
    name: "Ana Paula Santos",
    gym: "FitSpace Premium",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c8f8?w=150&h=150&fit=crop&crop=face",
    quote: "A automação do WhatsApp mudou completamente nosso atendimento. Respondemos 5x mais rápido!"
  }, {
    name: "Roberto Lima",
    gym: "Rede MoveFit",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Gerenciar 8 unidades nunca foi tão fácil. O dashboard centralizado é simplesmente perfeito."
  }];

  const comparisonData = [
    { feature: 'Bot no WhatsApp integrado', competitor1: '❌', competitor2: '✅', wefit: '✅' },
    { feature: 'Agendamento automático', competitor1: '✅', competitor2: '✅', wefit: '✅' },
    { feature: 'Funil de vendas integrado', competitor1: '❌', competitor2: '❌', wefit: '✅' },
    { feature: 'Treino digital personalizável', competitor1: '✅', competitor2: '❌', wefit: '✅' },
    { feature: 'Controle de planos e pagamentos', competitor1: '✅', competitor2: '✅', wefit: '✅' },
    { feature: 'Campanhas automáticas', competitor1: '❌', competitor2: '❌', wefit: '✅' },
    { feature: 'Preço a partir de R$49/mês', competitor1: '❌', competitor2: '❌', wefit: '✅' },
    { feature: 'Suporte via WhatsApp', competitor1: '✅', competitor2: '✅', wefit: '✅' },
  ];

  return <div className="min-h-screen bg-white">
      <DiscountPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6 leading-tight lg:text-5xl">
                Wefit: A Inteligência que sua Academia Precisa para Evoluir
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                Gestão completa, alunos engajados e resultados ampliados com a plataforma líder em inovação para o mercado fitness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-4">
                  <Link to="/planos">Descubra Nossos Planos</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500 text-lg px-8 py-4">
                  <Link to="/contato">Comece Agora</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img alt="Academia moderna com tecnologia" className="rounded-lg shadow-2xl object-cover" src="/lovable-uploads/f2ed33c3-f8a1-428a-8b3e-53997fc31839.png" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/20 rounded-full"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que Wefit? Suas Qualidades em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra como nossa plataforma pode transformar a gestão da sua academia
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transforme sua Academia: Benefícios que Vão Além
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra os resultados concretos que o Wefit proporciona para o seu negócio
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>;
            })}
            </div>
            <div className="relative">
              <img alt="Pessoa usando aplicativo fitness" className="rounded-lg shadow-xl" src="/lovable-uploads/25e125e9-3020-441a-96bd-df4208648a45.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Wefit vs. O Comum: Nosso Diferencial para Você
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja por que somos únicos no mercado de gestão fitness
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {differentials.map((differential, index) => <Card key={index} className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{differential.title}</h3>
                <p className="text-gray-600">{differential.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que a WeFit é a melhor escolha?
            </h2>
          </div>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-center">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 font-semibold text-gray-700 text-left">Recursos / Sistemas</th>
                    <th className="py-4 px-6 font-semibold text-gray-700">Concorrente 1</th>
                    <th className="py-4 px-6 font-semibold text-gray-700">Concorrente 2</th>
                    <th className="py-4 px-6 font-semibold text-purple-600 bg-purple-50">WeFit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-800 text-left font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-2xl">{row.competitor1}</td>
                      <td className="py-4 px-6 text-2xl">{row.competitor2}</td>
                      <td className="py-4 px-6 text-2xl font-bold text-purple-600 bg-purple-50">{row.wefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-yellow-500 text-white hover:bg-yellow-600 text-lg px-8 py-4">
              <Link to="/planos">Quero experimentar com 50% de desconto</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça histórias reais de transformação e sucesso
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="p-8">
                <div className="flex items-center mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-purple-600 font-medium">{testimonial.gym}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para Levar sua Academia ao Próximo Nível?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de academias que já transformaram seus negócios com o Wefit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-4">
              <Link to="/planos">Ver Planos e Preços</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500 text-lg px-8 py-4">
              <Link to="/contato">Falar com um Consultor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Homepage;
