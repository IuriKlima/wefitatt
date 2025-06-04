
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Bot, 
  Calendar, 
  Dumbbell, 
  DollarSign, 
  Smartphone, 
  Rocket,
  Check,
  X,
  Star,
  MessageCircle,
  Play,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';
import ContactModal from '@/components/ContactModal';

const LandingPage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const benefits = [
    {
      icon: Bot,
      title: "Atendimento automático via WhatsApp",
      description: "Bot inteligente responde seus alunos 24/7"
    },
    {
      icon: Calendar,
      title: "Agendamento de aulas sem esforço",
      description: "Sistema automático de reservas e cancelamentos"
    },
    {
      icon: Dumbbell,
      title: "Ficha de treino digital e evolução dos alunos",
      description: "Acompanhe o progresso completo de cada aluno"
    },
    {
      icon: DollarSign,
      title: "Controle financeiro e de planos",
      description: "Gestão completa de mensalidades e inadimplência"
    },
    {
      icon: Smartphone,
      title: "Área do aluno e do professor",
      description: "Apps dedicados para melhor experiência"
    },
    {
      icon: Rocket,
      title: "Lançamento de campanhas automáticas",
      description: "Marketing inteligente para aumentar vendas"
    }
  ];

  const comparison = [
    { feature: "Bot no WhatsApp integrado", competitor1: false, competitor2: true, wefit: true },
    { feature: "Agendamento automático", competitor1: true, competitor2: true, wefit: true },
    { feature: "Funil de vendas integrado", competitor1: false, competitor2: false, wefit: true },
    { feature: "Treino digital personalizável", competitor1: true, competitor2: false, wefit: true },
    { feature: "Controle de planos e pagamentos", competitor1: true, competitor2: true, wefit: true },
    { feature: "Campanhas automáticas", competitor1: false, competitor2: false, wefit: true },
    { feature: "Preço a partir de R$49/mês", competitor1: false, competitor2: false, wefit: true },
    { feature: "Suporte via WhatsApp", competitor1: true, competitor2: true, wefit: true }
  ];

  const testimonials = [
    {
      name: "Júlio",
      business: "Studio Box Fit, SP",
      quote: "Resolvi 90% dos problemas com organização só no primeiro mês!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Larissa",
      business: "Personal Trainer, MG",
      quote: "Meu WhatsApp virou meu vendedor. E eu ganhei tempo com minha família.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c8f8?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Carlos",
      business: "Academia Corpo&Forma, RJ",
      quote: "Testei vários. Nenhum é tão completo quanto o WeFit.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "Preciso de ajuda para configurar?",
      answer: "A gente te ajuda no WhatsApp e tem tutoriais passo a passo."
    },
    {
      question: "Funciona no celular?",
      answer: "Sim, você e seus alunos acessam tudo pelo celular."
    },
    {
      question: "E se eu não gostar?",
      answer: "Cancele a qualquer momento. Sem contrato."
    },
    {
      question: "É só para academia?",
      answer: "Funciona perfeitamente também para studios e personal trainers."
    }
  ];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Olá! Vi a oferta no site e gostaria de saber mais sobre o WeFit com 50% de desconto!");
    window.open(`https://wa.me/5519993070799?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎁 Promoção por tempo limitado: 1º mês com 50% de desconto!
              </div>
              
              <h1 className="text-4xl font-bold mb-6 leading-tight lg:text-6xl">
                Sua academia organizada, seus alunos felizes e seu tempo de volta.
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                Com a WeFit, você automatiza agendamentos, responde alunos no WhatsApp e controla sua academia de forma simples e inteligente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 text-lg px-8 py-4 font-bold">
                  <Link to="/planos">Quero testar com 50% OFF</Link>
                </Button>
                <Button 
                  onClick={() => setIsContactModalOpen(true)}
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-4"
                >
                  Falar com um especialista
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <Smartphone className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-3">
                    <Bot className="h-6 w-6" />
                    <span className="text-sm">WhatsApp Bot</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-3">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Agendamento</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-3">
                    <Dumbbell className="h-6 w-6" />
                    <span className="text-sm">Ficha Treino</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-3">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm">Financeiro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa. Nada do que você não precisa.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que a WeFit é a melhor escolha?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Recursos / Sistemas</th>
                  <th className="px-6 py-4 text-center">Concorrente 1</th>
                  <th className="px-6 py-4 text-center">Concorrente 2</th>
                  <th className="px-6 py-4 text-center bg-purple-700">WeFit</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{item.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {item.competitor1 ? 
                        <Check className="h-6 w-6 text-green-500 mx-auto" /> : 
                        <X className="h-6 w-6 text-red-500 mx-auto" />
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.competitor2 ? 
                        <Check className="h-6 w-6 text-green-500 mx-auto" /> : 
                        <X className="h-6 w-6 text-red-500 mx-auto" />
                      }
                    </td>
                    <td className="px-6 py-4 text-center bg-purple-50">
                      {item.wefit ? 
                        <Check className="h-6 w-6 text-purple-600 mx-auto" /> : 
                        <X className="h-6 w-6 text-red-500 mx-auto" />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
              <Link to="/planos">Quero experimentar com 50% de desconto</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-purple-600 text-sm">{testimonial.business}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Comece hoje com 50% de desconto no primeiro mês 🎉
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Sem taxas escondidas. Sem compromisso.<br />
            Você experimenta, ama e decide se continua.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 text-lg px-8 py-4 font-bold">
              <Link to="/planos">🔥 Quero aproveitar agora</Link>
            </Button>
            <Button 
              onClick={handleWhatsAppContact}
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-4"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Me chame no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
