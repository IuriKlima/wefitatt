import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, ArrowRight } from 'lucide-react';

const Planos = () => {
  const plans = [
    {
      name: "Personal",
      highlight: "Ideal para Personal Trainers Autônomos",
      price: "49",
      originalPrice: "99",
      features: ["Gestão de até 50 alunos", "App do Aluno personalizado", "Criação e atribuição de treinos", "Agendamento de sessões individuais", "Acompanhamento de progresso básico", "Recebimento de pagamentos online", "Suporte por email"],
      cta: "Assinar Personal",
      popular: false
    },
    {
      name: "Academia",
      highlight: "Perfeito para Academias de Unidade Única",
      price: "99",
      originalPrice: "199",
      features: ["Tudo do plano Personal", "Gestão de membros completa", "Controle de acesso integrado", "Grade de aulas coletivas", "Gestão financeira da unidade", "App do aluno completo", "Gestão de instrutores", "POS integrado", "Relatórios da unidade", "Agente WhatsApp básico", "Suporte prioritário"],
      cta: "Assinar Academia",
      popular: true
    },
    {
      name: "Rede",
      highlight: "Solução Completa para Redes e Grandes Academias",
      price: "Consultar",
      originalPrice: null,
      features: ["Tudo do plano Academia", "Gestão multi-unidades", "Painel admin global", "Analytics avançado e comparativo", "Gestão centralizada de templates", "Marketplace interno", "RBAC avançado", "Logs de auditoria", "Agente WhatsApp avançado", "Suporte dedicado 24/7", "Treinamento personalizado"],
      cta: "Falar com Consultor",
      popular: false
    }
  ];

  const faqs = [
    { question: "Posso mudar de plano depois?", answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor no próximo ciclo de cobrança." },
    { question: "Existe contrato de fidelidade?", answer: "Não trabalhamos com contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento." },
    { question: "Quais são as formas de pagamento?", answer: "Aceitamos cartão de crédito, débito automático, PIX e boleto bancário. Para planos anuais, oferecemos desconto adicional." },
    { question: "Há período de teste gratuito?", answer: "Sim! Oferecemos 14 dias de teste gratuito para todos os planos, sem compromisso." },
    { question: "O que acontece com meus dados se eu cancelar?", answer: "Seus dados ficam disponíveis por 90 dias após o cancelamento. Você pode reativar sua conta ou solicitar backup completo." },
    { question: "Vocês oferecem treinamento?", answer: "Sim! Todos os planos incluem onboarding gratuito. O plano Rede inclui treinamento personalizado para sua equipe." }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>50% OFF no primeiro mês</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Planos que escalam <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
              com o seu negócio
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal e transforme a gestão da sua academia com tecnologia de elite.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`glass-card p-8 relative flex flex-col hover-glow animate-fade-in ${
                  plan.popular ? 'border-purple-500/50 ring-1 ring-purple-500/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/30">
                      <Star className="h-3.5 w-3.5" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8 pt-2">
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-purple-400 text-sm font-medium mb-6">{plan.highlight}</p>
                  <div className="mb-2">
                    <span className="text-5xl font-extrabold text-white tracking-tight">
                      {plan.price === "Consultar" ? plan.price : `R$ ${plan.price}`}
                    </span>
                    {plan.price !== "Consultar" && <span className="text-gray-500 ml-1">/mês</span>}
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500">
                      depois <span className="line-through">R$ {plan.originalPrice}</span>/mês
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className={`w-full py-6 rounded-xl font-semibold transition-all text-sm ${
                    plan.popular 
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <Link to={plan.cta === "Falar com Consultor" ? "/contato" : "/cadastro"} className="flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Perguntas Frequentes</h2>
            <p className="text-gray-400">Tire suas dúvidas sobre os planos</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card p-6 hover-glow">
                <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-emerald-400" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Ainda tem dúvidas?</h2>
          <p className="text-gray-400 mb-8">Nossa equipe está pronta para te ajudar a encontrar o plano ideal.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-6 rounded-xl shadow-lg shadow-purple-600/20 font-semibold">
            <Link to="/contato">Falar com Consultor</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Planos;
