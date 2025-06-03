import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
const Planos = () => {
  const plans = [{
    name: "Personal",
    highlight: "Ideal para Personal Trainers Autônomos",
    price: "49",
    originalPrice: "99",
    features: ["Gestão de até 50 alunos", "App do Aluno personalizado", "Criação e atribuição de treinos", "Agendamento de sessões individuais", "Acompanhamento de progresso básico", "Recebimento de pagamentos online", "Suporte por email"],
    cta: "Assinar Plano Personal",
    popular: false
  }, {
    name: "Academia",
    highlight: "Perfeito para Academias de Unidade Única",
    price: "99",
    originalPrice: "199",
    features: ["Tudo do plano Personal", "Gestão de membros completa", "Controle de acesso integrado", "Grade de aulas coletivas", "Gestão financeira da unidade", "App do aluno completo", "Gestão de instrutores", "POS integrado", "Relatórios da unidade", "Agente WhatsApp básico", "Suporte prioritário"],
    cta: "Assinar Plano Academia",
    popular: true
  }, {
    name: "Rede",
    highlight: "Solução Completa para Redes e Grandes Academias",
    price: "149",
    originalPrice: "299",
    features: ["Tudo do plano Academia", "Gestão multi-unidades", "Painel admin global", "Analytics avançado e comparativo", "Gestão centralizada de templates", "Marketplace interno", "RBAC avançado", "Logs de auditoria", "Agente WhatsApp avançado", "Suporte dedicado 24/7", "Treinamento personalizado"],
    cta: "Assinar Plano Rede",
    popular: false
  }];
  const faqs = [{
    question: "Posso mudar de plano depois?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor no próximo ciclo de cobrança."
  }, {
    question: "Existe contrato de fidelidade?",
    answer: "Não trabalhamos com contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento."
  }, {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos cartão de crédito, débito automático, PIX e boleto bancário. Para planos anuais, oferecemos desconto adicional."
  }, {
    question: "Há período de teste gratuito?",
    answer: "Sim! Oferecemos 14 dias de teste gratuito para todos os planos, sem compromisso."
  }, {
    question: "O que acontece com meus dados se eu cancelar?",
    answer: "Seus dados ficam disponíveis por 90 dias após o cancelamento. Você pode reativar sua conta ou solicitar backup completo."
  }, {
    question: "Vocês oferecem treinamento?",
    answer: "Sim! Todos os planos incluem onboarding gratuito. O plano Rede inclui treinamento personalizado para sua equipe."
  }];
  return <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Planos Wefit: Flexibilidade e Poder para Todos os Tamanhos de Negócio Fitness
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Escolha o plano ideal e aproveite nossa oferta especial de lançamento: 
            <span className="font-bold text-yellow-300"> 50% de desconto no primeiro mês!</span>
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => <Card key={index} className={`relative p-8 ${plan.popular ? 'border-2 border-purple-500 shadow-xl' : ''}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Mais Popular
                    </div>
                  </div>}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-purple-600 font-medium mb-4">{plan.highlight}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">R$ {plan.price}</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-500">no primeiro mês, depois</span>
                      <span className="text-lg line-through text-gray-400">R$ {plan.originalPrice}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>)}
                </ul>

                <Button asChild className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`} size="lg">
                  <Link to="/cadastro">{plan.cta}</Link>
                </Button>
              </Card>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes sobre os Planos
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nossos planos e funcionalidades
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ainda tem dúvidas? Fale conosco!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
          </p>
          <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-4">
            <Link to="/contato">Falar com Consultor</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Planos;