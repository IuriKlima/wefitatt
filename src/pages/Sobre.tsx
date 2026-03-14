import React from 'react';
import { Card } from '@/components/ui/card';
import { Target, Eye, Heart, Users, Lightbulb, Award } from 'lucide-react';

const Sobre = () => {
  const values = [
    { icon: Lightbulb, title: "Inovação", description: "Buscamos constantemente novas formas de revolucionar o mercado fitness." },
    { icon: Users, title: "Foco no Cliente", description: "Cada decisão é tomada pensando no sucesso dos nossos parceiros." },
    { icon: Eye, title: "Transparência", description: "Relações baseadas na honestidade e comunicação aberta." },
    { icon: Heart, title: "Paixão", description: "Dedicação incansável para entregar soluções que geram resultados reais." }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Conheça a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">WeFit</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Descubra como nasceu a revolução na gestão fitness brasileira
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-14 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Nossa História</h2>
            <p className="text-gray-400 leading-relaxed">
              A <strong className="text-purple-400">WeFit foi fundada em 2023 por Iuri Klimavicius</strong>, 
              um visionário apaixonado por tecnologia e pelo universo fitness. Nossa equipe começou desenvolvendo 
              websites personalizados para academias, onde mergulhamos no dia a dia de centenas de negócios fitness.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Percebemos uma carência significativa no mercado: academias lutando com sistemas complexos, desatualizados 
              e fragmentados. Em <strong className="text-purple-400">2025</strong>, canalizamos toda essa experiência para criar 
              o <strong className="text-white">WeFit — um sistema de gestão inteligente e completo</strong>, projetado para revolucionar 
              a forma como academias operam.
            </p>
            <div className="glass-card p-8 mt-8 border-l-4 border-purple-500">
              <p className="text-gray-300 italic">
                "Nossa missão é transformar a tecnologia em um aliado poderoso para o sucesso das academias brasileiras."
              </p>
              <p className="text-purple-400 text-sm font-semibold mt-3">— Iuri Klimavicius, Fundador</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Purpose */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {[
            { icon: Target, title: 'Missão', text: 'Empoderar negócios fitness com tecnologia inteligente, simplificando a gestão e potencializando resultados.' },
            { icon: Eye, title: 'Visão', text: 'Ser a plataforma líder em inovação para o mercado fitness brasileiro, transformando experiências.' },
            { icon: Award, title: 'Propósito', text: 'Democratizar o acesso à tecnologia de ponta, permitindo que academias alcancem seu máximo potencial.' }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 text-center hover-glow">
              <div className="h-14 w-14 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 text-center hover-glow group">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="font-bold mb-2">{value.title}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">O Fundador</h2>
          <div className="glass-card p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h3 className="text-2xl font-bold mb-2">Iuri Klimavicius</h3>
                <p className="text-purple-400 font-semibold mb-6 text-sm">Fundador & CEO</p>
                <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                  <p>Empreendedor serial com mais de 10 anos de experiência em tecnologia e desenvolvimento de software.</p>
                  <p>"Acredito que a tecnologia deve ser um facilitador, não um complicador. Na WeFit, criamos soluções que realmente fazem diferença."</p>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img alt="Iuri Klimavicius" className="w-48 h-48 rounded-2xl object-cover border border-white/10 shadow-2xl" src="/lovable-uploads/10c39f96-e16a-41e7-8de7-e05c2ed3b96d.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Nossa Equipe</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Ana Silva', role: 'Head de Produto', desc: 'Especialista em UX/UI com foco em experiência do usuário.', img: 'https://images.unsplash.com/photo-1494790108755-2616b332c8f8?w=200&h=200&fit=crop&crop=face' },
              { name: 'Carlos Santos', role: 'CTO', desc: 'Arquiteto de software com expertise em sistemas escaláveis e IA.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
              { name: 'Marina Costa', role: 'Head de Customer Success', desc: 'Especialista em relacionamento e crescimento sustentável.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' }
            ].map((member, i) => (
              <div key={i} className="glass-card p-8 text-center hover-glow">
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 border border-white/10" />
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-xs">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;