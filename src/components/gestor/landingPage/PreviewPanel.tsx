
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Monitor, Tablet, Smartphone, Dumbbell, Heart, Calendar, Target, Users } from 'lucide-react';
import { LandingPageConfig, IconOption } from '@/types/landingPage';

interface PreviewPanelProps {
  config: LandingPageConfig;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ config, previewDevice, setPreviewDevice }) => {
  const iconOptions: IconOption[] = [
    { value: 'dumbbell', label: 'Halter', icon: Dumbbell },
    { value: 'heart', label: 'Coração', icon: Heart },
    { value: 'calendar', label: 'Calendário', icon: Calendar },
    { value: 'target', label: 'Alvo', icon: Target },
    { value: 'users', label: 'Grupo de Pessoas', icon: Users }
  ];

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'tablet': return 'max-w-2xl mx-auto';
      case 'mobile': return 'max-w-sm mx-auto';
      default: return 'w-full';
    }
  };

  return (
    <div className="flex-1 bg-white overflow-hidden flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pré-visualização da Landing Page</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={previewDevice === 'desktop' ? 'default' : 'outline'}
            onClick={() => setPreviewDevice('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={previewDevice === 'tablet' ? 'default' : 'outline'}
            onClick={() => setPreviewDevice('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={previewDevice === 'mobile' ? 'default' : 'outline'}
            onClick={() => setPreviewDevice('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className={`${getDeviceClass()} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
          {/* Hero Section Preview */}
          <div 
            className="relative h-96 flex items-center justify-center text-white"
            style={{ backgroundColor: config.hero.accentColor }}
          >
            <div className="text-center z-10 px-6">
              <h1 className="text-4xl font-bold mb-4">{config.hero.title}</h1>
              <p className="text-xl mb-6 opacity-90">{config.hero.subtitle}</p>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                {config.hero.buttonText}
              </Button>
            </div>
          </div>
          
          {/* About Section Preview */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-6">{config.about.title}</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
              {config.about.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Foto {i}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Benefits Section Preview */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-8">Nossos Diferenciais</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {config.benefits.map((benefit) => {
                const IconComponent = iconOptions.find(opt => opt.value === benefit.icon)?.icon || Dumbbell;
                return (
                  <div key={benefit.id} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: config.hero.accentColor }}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Plans Section Preview */}
          {config.plans.show && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Nossos Planos</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <Card key={i} className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-2">Plano {i}</h3>
                    <p className="text-3xl font-bold mb-4" style={{ color: config.hero.accentColor }}>
                      R$ {99 + (i * 50)},90
                    </p>
                    <p className="text-gray-600 mb-4">Descrição do plano {i}</p>
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: config.hero.accentColor }}
                    >
                      Escolher Plano
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact Section Preview */}
          <div className="p-8 bg-gray-900 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Entre em Contato</h2>
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <p>{config.contact.address}</p>
              <p>{config.contact.phone}</p>
              <p>{config.contact.email}</p>
              {config.contact.showMap && (
                <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center mt-6">
                  <span className="text-gray-300">Mapa de Localização</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
