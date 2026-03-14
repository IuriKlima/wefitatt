import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', academia: '', assunto: '', mensagem: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setFormData({ nome: '', email: '', telefone: '', academia: '', assunto: '', mensagem: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Fale <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Conosco</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para ajudar você a transformar sua academia. Entre em contato.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold mb-8 tracking-tight">Envie sua Mensagem</h2>
            {messageSent ? (
              <div className="glass-card p-10 text-center">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                <p className="text-gray-400">Nossa equipe responderá em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-gray-300 text-sm">Nome Completo *</Label>
                    <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Seu nome" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 text-sm">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="seu@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 rounded-xl h-11" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-gray-300 text-sm">Telefone/WhatsApp</Label>
                    <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(11) 99999-9999" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academia" className="text-gray-300 text-sm">Nome da Academia</Label>
                    <Input id="academia" name="academia" value={formData.academia} onChange={handleChange} placeholder="Sua academia" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 rounded-xl h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto" className="text-gray-300 text-sm">Assunto *</Label>
                  <select id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} required className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                    <option value="" className="bg-gray-900">Selecione um assunto</option>
                    <option value="comercial" className="bg-gray-900">Dúvidas Comerciais</option>
                    <option value="suporte" className="bg-gray-900">Suporte Técnico</option>
                    <option value="parcerias" className="bg-gray-900">Parcerias</option>
                    <option value="outros" className="bg-gray-900">Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-gray-300 text-sm">Sua Mensagem *</Label>
                  <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} required rows={5} placeholder="Descreva como podemos ajudar..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none" />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white py-6 rounded-xl font-semibold shadow-lg shadow-purple-600/20 transition-all">
                  Enviar Mensagem
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-8 tracking-tight">Informações de Contato</h2>
            <div className="space-y-4 mb-8">
              {[
                { icon: Mail, title: 'Email', info: 'contato@wefit.com.br', sub: 'Respondemos em até 24 horas' },
                { icon: Phone, title: 'Telefone', info: '+55 (19) 99307-0799', sub: 'Seg a Sex, 9h às 18h' },
                { icon: MapPin, title: 'Endereço', info: 'Rua da Inovação Fitness, 123', sub: 'Centro - Campinas, SP' },
                { icon: Clock, title: 'Horário', info: 'Seg a Sex: 9h às 18h', sub: 'Sáb: 9h às 14h' }
              ].map((item, i) => (
                <div key={i} className="glass-card p-5 flex items-start gap-4 hover-glow">
                  <div className="h-11 w-11 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-0.5">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.info}</p>
                    <p className="text-gray-500 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="glass-card p-5">
              <h3 className="font-semibold text-white text-sm mb-4">Nossa Localização</h3>
              <div className="w-full h-64 bg-white/5 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.8267569456976!2d-47.0647688!3d-22.9068467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8f7d6b5b7b7%3A0x1234567890abcdef!2sCampinas%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                  width="100%" height="100%"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
