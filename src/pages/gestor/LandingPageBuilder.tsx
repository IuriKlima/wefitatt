
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion } from '@/components/ui/accordion';
import { Save, Globe, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LandingPageConfig } from '@/types/landingPage';
import StatusSection from '@/components/gestor/landingPage/StatusSection';
import HeroSection from '@/components/gestor/landingPage/HeroSection';
import AboutSection from '@/components/gestor/landingPage/AboutSection';
import BenefitsSection from '@/components/gestor/landingPage/BenefitsSection';
import PlansSection from '@/components/gestor/landingPage/PlansSection';
import ContactSection from '@/components/gestor/landingPage/ContactSection';
import PreviewPanel from '@/components/gestor/landingPage/PreviewPanel';

const LandingPageBuilder: React.FC = () => {
  const { toast } = useToast();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  
  const [config, setConfig] = useState<LandingPageConfig>({
    status: 'draft',
    hero: {
      title: 'Academia Wefit Centro: Onde sua Transformação Começa',
      subtitle: 'Treinos personalizados, aulas incríveis e a melhor comunidade fitness da região.',
      buttonText: 'Ver Planos e Preços',
      backgroundImage: '',
      accentColor: '#7C3AED'
    },
    about: {
      title: 'Conheça a Wefit Centro',
      description: 'Nossa academia oferece a mais completa estrutura para você alcançar seus objetivos. Com equipamentos modernos, profissionais qualificados e um ambiente acolhedor.',
      gallery: []
    },
    benefits: [
      {
        id: '1',
        icon: 'dumbbell',
        title: 'Acompanhamento Individualizado',
        description: 'Nossos instrutores estão prontos para criar um plano focado nos seus objetivos.'
      },
      {
        id: '2',
        icon: 'heart',
        title: 'Ambiente Acolhedor',
        description: 'Uma comunidade que te motiva e apoia em cada conquista.'
      },
      {
        id: '3',
        icon: 'calendar',
        title: 'Horários Flexíveis',
        description: 'Aulas e treinos nos horários que se encaixam na sua rotina.'
      }
    ],
    plans: {
      show: true
    },
    featuredClasses: {
      show: true,
      classes: [
        {
          id: '1',
          name: 'Spinning',
          description: 'Aulas dinâmicas de ciclismo indoor com música motivacional.',
          image: ''
        },
        {
          id: '2',
          name: 'Yoga',
          description: 'Encontre equilíbrio e bem-estar através da prática milenar.',
          image: ''
        }
      ]
    },
    contact: {
      showMap: true,
      address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
      phone: '(11) 99999-9999',
      email: 'contato@wefitcentro.com.br'
    }
  });

  const updateConfig = (section: keyof LandingPageConfig, field: string, value: any) => {
    setConfig(prev => {
      const currentSection = prev[section];
      if (typeof currentSection === 'object' && currentSection !== null && !Array.isArray(currentSection)) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const addBenefit = () => {
    const newBenefit = {
      id: Date.now().toString(),
      icon: 'dumbbell',
      title: 'Novo Diferencial',
      description: 'Descrição do diferencial'
    };
    setConfig(prev => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit]
    }));
  };

  const removeBenefit = (id: string) => {
    setConfig(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b.id !== id)
    }));
  };

  const updateBenefit = (id: string, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      benefits: prev.benefits.map(b => 
        b.id === id ? { ...b, [field]: value } : b
      )
    }));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Rascunho salvo!",
      description: "Suas alterações foram salvas como rascunho.",
    });
  };

  const handlePublish = () => {
    setConfig(prev => ({
      ...prev,
      status: 'published',
      publishedDate: new Date().toLocaleDateString('pt-BR')
    }));
    setShowPublishDialog(false);
    toast({
      title: "Landing page publicada!",
      description: "Sua landing page está agora disponível publicamente.",
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText('https://wefit.com/unidade/wefit-centro');
    toast({
      title: "URL copiada!",
      description: "Link da landing page copiado para a área de transferência.",
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Editor da Landing Page da Sua Academia</h1>
        <p className="text-gray-600 mt-1">Crie uma landing page personalizada para sua unidade</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Painel Esquerdo - Configurações */}
        <div className="w-2/5 border-r bg-gray-50 overflow-y-auto">
          <div className="p-6 space-y-6">
            <StatusSection config={config} onCopyUrl={copyUrl} />

            <Accordion type="multiple" defaultValue={["hero", "about"]} className="space-y-2">
              <HeroSection config={config} updateConfig={updateConfig} />
              <AboutSection config={config} updateConfig={updateConfig} />
              <BenefitsSection 
                config={config} 
                addBenefit={addBenefit}
                removeBenefit={removeBenefit}
                updateBenefit={updateBenefit}
              />
              <PlansSection config={config} updateConfig={updateConfig} />
              <ContactSection config={config} updateConfig={updateConfig} />
            </Accordion>

            {/* Botões de Ação */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Salvar Rascunho
              </Button>
              
              <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
                <DialogTrigger asChild>
                  <Button className="flex-1">
                    <Globe className="h-4 w-4 mr-2" />
                    Publicar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Publicar Landing Page</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja publicar as alterações? A landing page ficará disponível publicamente.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handlePublish}>
                      Confirmar Publicação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Painel Direito - Preview */}
        <PreviewPanel 
          config={config}
          previewDevice={previewDevice}
          setPreviewDevice={setPreviewDevice}
        />
      </div>
    </div>
  );
};

export default LandingPageBuilder;
