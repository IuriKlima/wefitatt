
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Lightbulb } from 'lucide-react';
import { LandingPageConfig } from '@/types/landingPage';

interface ContactSectionProps {
  config: LandingPageConfig;
  updateConfig: (section: keyof LandingPageConfig, field: string, value: any) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ config, updateConfig }) => {
  return (
    <AccordionItem value="contact" className="border rounded-lg">
      <AccordionTrigger className="px-4">
        <span className="font-medium">Informações de Contato</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            As informações abaixo são puxadas das 'Configurações da Academia', mas você pode editá-las aqui especificamente para esta página.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            checked={config.contact.showMap}
            onCheckedChange={(checked) => updateConfig('contact', 'showMap', checked)}
          />
          <Label>Mostrar mapa de localização</Label>
        </div>
        
        <div>
          <Label>Endereço Completo</Label>
          <Input 
            value={config.contact.address}
            onChange={(e) => updateConfig('contact', 'address', e.target.value)}
          />
        </div>
        
        <div>
          <Label>Telefone/WhatsApp</Label>
          <Input 
            value={config.contact.phone}
            onChange={(e) => updateConfig('contact', 'phone', e.target.value)}
          />
        </div>
        
        <div>
          <Label>Email de Contato</Label>
          <Input 
            value={config.contact.email}
            onChange={(e) => updateConfig('contact', 'email', e.target.value)}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ContactSection;
