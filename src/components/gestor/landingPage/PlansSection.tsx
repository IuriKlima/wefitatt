
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Lightbulb } from 'lucide-react';
import { LandingPageConfig } from '@/types/landingPage';

interface PlansSectionProps {
  config: LandingPageConfig;
  updateConfig: (section: keyof LandingPageConfig, field: string, value: any) => void;
}

const PlansSection: React.FC<PlansSectionProps> = ({ config, updateConfig }) => {
  return (
    <AccordionItem value="plans" className="border rounded-lg">
      <AccordionTrigger className="px-4">
        <span className="font-medium">Exibição de Planos</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Os planos exibidos são atualizados automaticamente da página 'Planos da Academia'. Para editar os planos, acesse Gerenciar Planos no menu principal.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            checked={config.plans.show}
            onCheckedChange={(checked) => updateConfig('plans', 'show', checked)}
          />
          <Label>Mostrar seção de planos na Landing Page</Label>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PlansSection;
