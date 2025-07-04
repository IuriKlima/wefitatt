
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Smartphone, 
  Brain,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Homepage = () => {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Alunos',
      description: 'Cadastro completo, histórico de treinos e acompanhamento personalizado'
    },
    {
      icon: Calendar,
      title: 'Agendamento Inteligente',
      description: 'Sistema automatizado de aulas, horários e notificações'
    },
    {
      icon: CreditCard,
      title: 'Financeiro Completo',
      description: 'Controle de mensalidades, pagamentos e relatórios financeiros'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avançado',
      description: 'Dashboards interativos e insights para tomada de decisão'
    },
    {
      icon: Smartphone,
      title: 'App Mobile',
      description: 'Aplicativo para alunos e gestores com todas as funcionalidades'
    },
    {
      icon: Brain,
      title: 'IA Integrada',
      description: 'Inteligência artificial para personalização e automação'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Proprietário - FitLife Academia',
      content: 'O Wefit revolucionou nossa gestão. Aumentamos 40% na retenção de alunos!',
      rating: 5
    },
    {
      name: 'Marina Santos',
      role: 'Gerente - PowerGym',
      content: 'Interface intuitiva e suporte excepcional. Recomendo para todas as academias.',
      rating: 5
    },
    {
      name: 'João Oliveira',
      role: 'Diretor - BodyShape',
      content: 'Automatizou todos nossos processos. Economizamos 15 horas por semana!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              O Futuro da Gestão de Academias
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Sistema completo com IA integrada para transformar sua academia em um negócio de alto desempenho
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Link to="/cadastro" className="flex items-center">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Link to="/login">
                  Fazer Login
                </Link>
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">Teste grátis por 30 dias • Sem cartão de crédito</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades Completas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua academia de forma profissional e eficiente
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Por que escolher o Wefit?</h2>
              <div className="space-y-4">
                {[
                  'Interface intuitiva e moderna',
                  'Suporte técnico especializado 24/7',
                  'Integrações com principais meios de pagamento',
                  'Relatórios detalhados e personalizáveis',
                  'App mobile nativo para iOS e Android',
                  'IA para personalização de treinos',
                  'Sistema de gamificação para engajamento',
                  'Backup automático e segurança avançada'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Comece hoje mesmo!</h3>
                <p className="text-gray-700 mb-6">
                  Junte-se a mais de 500 academias que já transformaram seus negócios
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/cadastro">
                    Teste Grátis por 30 Dias
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-xl text-gray-600">Academias reais, resultados reais</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para revolucionar sua academia?</h2>
          <p className="text-xl mb-8 opacity-90">
            Comece seu teste gratuito hoje e veja a diferença em 30 dias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4">
              <Link to="/cadastro">
                Começar Teste Grátis
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
              <Link to="/contato">
                Falar com Especialista
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
