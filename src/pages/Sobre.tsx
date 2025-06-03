import React from 'react';
import { Card } from '@/components/ui/card';
import { Target, Eye, Heart, Users, Lightbulb, Award } from 'lucide-react';
const Sobre = () => {
  const values = [{
    icon: Lightbulb,
    title: "Inovação",
    description: "Buscamos constantemente novas formas de revolucionar o mercado fitness através da tecnologia."
  }, {
    icon: Users,
    title: "Foco no Cliente",
    description: "Cada decisão é tomada pensando no sucesso e satisfação dos nossos parceiros."
  }, {
    icon: Eye,
    title: "Transparência",
    description: "Construímos relações baseadas na honestidade, clareza e comunicação aberta."
  }, {
    icon: Heart,
    title: "Paixão por Resultados",
    description: "Nos dedicamos incansavelmente para entregar soluções que geram resultados reais."
  }];
  return <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Nossa Jornada: Conheça a Wefit
          </h1>
          <p className="text-xl lg:text-2xl opacity-90">
            Descubra como nasceu a revolução na gestão fitness brasileira
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Nossa História</h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="text-xl mb-8">
              A <strong className="text-purple-600">Wefit foi fundada em 2023 por Iuri Klimavicius</strong>, 
              um visionário apaixonado por tecnologia e pelo universo fitness. Nossa jornada começou de forma 
              singular: inicialmente, nossa equipe se dedicava ao desenvolvimento de websites personalizados 
              para academias em todo o Brasil.
            </p>
            
            <p className="text-lg mb-8">
              Durante esse período de desenvolvimento web, tivemos a oportunidade única de mergulhar profundamente 
              no dia a dia de centenas de academias. Foi então que percebemos uma <strong>carência significativa 
              no mercado</strong>: muitas academias lutavam com sistemas de gestão complexos, desatualizados ou 
              que simplesmente não atendiam às suas necessidades dinâmicas e específicas.
            </p>
            
            <p className="text-lg mb-8">
              Proprietários de academias relatavam frustrações constantes: sistemas que não conversavam entre si, 
              dificuldades para engajar alunos, processos manuais demorados e a falta de dados estratégicos para 
              tomada de decisões. Era evidente que o mercado fitness brasileiro precisava de uma <strong>solução 
              verdadeiramente inteligente e integrada</strong>.
            </p>
            
            <p className="text-lg mb-8">
              Motivados por essa deficiência de mercado e pela nossa paixão por tecnologia e pelo universo fitness, 
              em <strong className="text-purple-600">2025, decidimos canalizar toda nossa experiência</strong> para 
              criar algo revolucionário: o <strong>Wefit - um sistema de gestão inteligente, completo e intuitivo</strong>, 
              projetado especificamente para revolucionar a forma como as academias operam e se conectam com seus alunos.
            </p>
            
            <div className="bg-purple-50 p-8 rounded-lg mt-12">
              <p className="text-lg text-purple-800 italic text-center">
                "Nossa missão sempre foi clara: transformar a tecnologia em um aliado poderoso para o sucesso 
                das academias brasileiras, criando experiências extraordinárias tanto para gestores quanto para alunos."
              </p>
              <p className="text-center mt-4 font-semibold text-purple-600">- Iuri Klimavicius, Fundador da Wefit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
              <p className="text-gray-600">
                Empoderar negócios fitness com tecnologia inteligente e intuitiva, 
                simplificando a gestão e potencializando resultados através de soluções inovadoras.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
              <p className="text-gray-600">
                Ser a plataforma líder em inovação e resultados para o mercado fitness brasileiro, 
                transformando a forma como academias se conectam com seus alunos.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Propósito</h3>
              <p className="text-gray-600">
                Democratizar o acesso à tecnologia de ponta no mercado fitness, 
                permitindo que academias de todos os tamanhos alcancem seu máximo potencial.
              </p>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Nossos Valores</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
            const Icon = value.icon;
            return <Card key={index} className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">O Fundador</h2>
            <p className="text-xl text-gray-600">Conheça a mente por trás da revolução Wefit</p>
          </div>

          <Card className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Iuri Klimavicius</h3>
                <p className="text-xl text-purple-600 font-semibold mb-6">Fundador & CEO da Wefit</p>
                
                <div className="space-y-4 text-gray-600">
                  <p>
                    Empreendedor serial com mais de 10 anos de experiência em tecnologia e desenvolvimento 
                    de software. Especialista em transformação digital para o mercado fitness.
                  </p>
                  <p>
                    Sua visão para a Wefit nasceu da combinação única entre expertise técnica e profundo 
                    conhecimento das necessidades reais das academias brasileiras.
                  </p>
                  <p>
                    <strong>"Acredito que a tecnologia deve ser um facilitador, não um complicador. 
                    Na Wefit, criamos soluções que realmente fazem diferença no dia a dia dos nossos clientes."</strong>
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <img alt="Iuri Klimavicius" className="w-64 h-64 rounded-full object-cover mx-auto shadow-xl" src="/lovable-uploads/10c39f96-e16a-41e7-8de7-e05c2ed3b96d.png" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
            <p className="text-xl text-gray-600">Profissionais apaixonados por inovação e resultados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b332c8f8?w=200&h=200&fit=crop&crop=face" alt="Ana Silva" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ana Silva</h3>
              <p className="text-purple-600 font-medium mb-3">Head de Produto</p>
              <p className="text-gray-600 text-sm">Especialista em UX/UI com foco em experiência do usuário no mercado fitness.</p>
            </Card>

            <Card className="p-6 text-center">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" alt="Carlos Santos" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Carlos Santos</h3>
              <p className="text-purple-600 font-medium mb-3">CTO</p>
              <p className="text-gray-600 text-sm">Arquiteto de software com expertise em sistemas escaláveis e inteligência artificial.</p>
            </Card>

            <Card className="p-6 text-center">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" alt="Marina Costa" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Marina Costa</h3>
              <p className="text-purple-600 font-medium mb-3">Head de Customer Success</p>
              <p className="text-gray-600 text-sm">Especialista em relacionamento com clientes e crescimento sustentável no mercado fitness.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>;
};
export default Sobre;