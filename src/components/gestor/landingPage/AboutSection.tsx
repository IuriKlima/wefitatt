
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Lightbulb } from 'lucide-react';
import { LandingPageConfig } from '@/types/landingPage';

interface AboutSectionProps {
  config: LandingPageConfig;
  updateConfig: (section: keyof LandingPageConfig, field: string, value: any) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ config, updateConfig }) => {
  return (
    <AccordionItem value="about" className="border rounded-lg">
      <AccordionTrigger className="px-4">
        <span className="font-medium">Seção 'Sobre Nós'</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Mostre o que sua academia tem de melhor! Fotos dos equipamentos, ambientes e alunos felizes geram muita conexão.
          </p>
        </div>
        
        <div>
          <Label>Título da Seção</Label>
          <Input 
            value={config.about.title}
            onChange={(e) => updateConfig('about', 'title', e.target.value)}
            placeholder="Conheça a Wefit Centro"
          />
        </div>
        
        <div>
          <Label>Texto Descritivo</Label>
          <Textarea 
            value={config.about.description}
            onChange={(e) => updateConfig('about', 'description', e.target.value)}
            placeholder="Nossa academia oferece..."
            rows={4}
          />
        </div>
        
        <div>
          <Label>Galeria de Fotos (3-6 imagens)</Label>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AboutSection;
