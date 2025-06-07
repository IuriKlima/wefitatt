
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Lightbulb, Dumbbell, Heart, Calendar, Target, Users } from 'lucide-react';
import { LandingPageConfig, IconOption } from '@/types/landingPage';

interface BenefitsSectionProps {
  config: LandingPageConfig;
  addBenefit: () => void;
  removeBenefit: (id: string) => void;
  updateBenefit: (id: string, field: string, value: string) => void;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ 
  config, 
  addBenefit, 
  removeBenefit, 
  updateBenefit 
}) => {
  const iconOptions: IconOption[] = [
    { value: 'dumbbell', label: 'Halter', icon: Dumbbell },
    { value: 'heart', label: 'Coração', icon: Heart },
    { value: 'calendar', label: 'Calendário', icon: Calendar },
    { value: 'target', label: 'Alvo', icon: Target },
    { value: 'users', label: 'Grupo de Pessoas', icon: Users }
  ];

  return (
    <AccordionItem value="benefits" className="border rounded-lg">
      <AccordionTrigger className="px-4">
        <span className="font-medium">Destaque seus Diferenciais</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Foque nos benefícios que resolvem as dores dos seus clientes. Seja específico e direto!
          </p>
        </div>
        
        {config.benefits.map((benefit, index) => (
          <Card key={benefit.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Diferencial {index + 1}</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => removeBenefit(benefit.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label>Ícone</Label>
                <Select 
                  value={benefit.icon} 
                  onValueChange={(value) => updateBenefit(benefit.id, 'icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Título</Label>
                <Input 
                  value={benefit.title}
                  onChange={(e) => updateBenefit(benefit.id, 'title', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Descrição</Label>
                <Textarea 
                  value={benefit.description}
                  onChange={(e) => updateBenefit(benefit.id, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </Card>
        ))}
        
        <Button onClick={addBenefit} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Diferencial
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BenefitsSection;
