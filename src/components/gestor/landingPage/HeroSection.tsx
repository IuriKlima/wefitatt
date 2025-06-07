
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Lightbulb } from 'lucide-react';
import { LandingPageConfig } from '@/types/landingPage';

interface HeroSectionProps {
  config: LandingPageConfig;
  updateConfig: (section: keyof LandingPageConfig, field: string, value: any) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ config, updateConfig }) => {
  return (
    <AccordionItem value="hero" className="border rounded-lg">
      <AccordionTrigger className="px-4">
        <span className="font-medium">Seção Principal (Topo)</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Use um título curto e impactante! A imagem principal deve ser de alta qualidade e refletir a energia da sua academia.
          </p>
        </div>
        
        <div>
          <Label>Título Principal da Página</Label>
          <Input 
            value={config.hero.title}
            onChange={(e) => updateConfig('hero', 'title', e.target.value)}
            placeholder="Academia Wefit Centro: Onde sua Transformação Começa"
          />
        </div>
        
        <div>
          <Label>Subtítulo</Label>
          <Textarea 
            value={config.hero.subtitle}
            onChange={(e) => updateConfig('hero', 'subtitle', e.target.value)}
            placeholder="Treinos personalizados, aulas incríveis..."
            rows={3}
          />
        </div>
        
        <div>
          <Label>Texto do Botão Principal</Label>
          <Input 
            value={config.hero.buttonText}
            onChange={(e) => updateConfig('hero', 'buttonText', e.target.value)}
            placeholder="Ver Planos e Preços"
          />
        </div>
        
        <div>
          <Label>Imagem de Fundo</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Clique para fazer upload da imagem</p>
          </div>
        </div>
        
        <div>
          <Label>Cor de Destaque</Label>
          <div className="flex items-center gap-2">
            <input 
              type="color" 
              value={config.hero.accentColor}
              onChange={(e) => updateConfig('hero', 'accentColor', e.target.value)}
              className="w-12 h-10 rounded border"
            />
            <Input 
              value={config.hero.accentColor}
              onChange={(e) => updateConfig('hero', 'accentColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default HeroSection;
