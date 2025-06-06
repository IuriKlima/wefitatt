
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Copy, 
  Upload, 
  Plus, 
  Trash2, 
  Move, 
  Eye,
  Save,
  Globe,
  Lightbulb,
  Heart,
  Calendar,
  Target,
  Users,
  Dumbbell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LandingPageConfig {
  status: 'draft' | 'published';
  publishedDate?: string;
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundImage: string;
    accentColor: string;
  };
  about: {
    title: string;
    description: string;
    gallery: string[];
  };
  benefits: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
  plans: {
    show: boolean;
  };
  featuredClasses: {
    show: boolean;
    classes: Array<{
      id: string;
      name: string;
      description: string;
      image: string;
    }>;
  };
  contact: {
    showMap: boolean;
    address: string;
    phone: string;
    email: string;
  };
}

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

  const iconOptions = [
    { value: 'dumbbell', label: 'Halter', icon: Dumbbell },
    { value: 'heart', label: 'Coração', icon: Heart },
    { value: 'calendar', label: 'Calendário', icon: Calendar },
    { value: 'target', label: 'Alvo', icon: Target },
    { value: 'users', label: 'Grupo de Pessoas', icon: Users }
  ];

  const updateConfig = (section: keyof LandingPageConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
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

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'tablet': return 'max-w-2xl mx-auto';
      case 'mobile': return 'max-w-sm mx-auto';
      default: return 'w-full';
    }
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
            {/* Status e URL */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <Badge variant={config.status === 'published' ? 'default' : 'secondary'}>
                      {config.status === 'published' 
                        ? `Publicada em: ${config.publishedDate}` 
                        : 'Rascunho'
                      }
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">URL da Página</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input 
                      value="https://wefit.com/unidade/wefit-centro" 
                      readOnly 
                      className="bg-gray-100"
                    />
                    <Button size="sm" variant="outline" onClick={copyUrl}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accordion de Configurações */}
            <Accordion type="multiple" defaultValue={["hero", "about"]} className="space-y-2">
              {/* Seção Hero */}
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

              {/* Seção Sobre */}
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

              {/* Seção Diferenciais */}
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

              {/* Seção Planos */}
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

              {/* Seção Contato */}
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
      </div>
    </div>
  );
};

export default LandingPageBuilder;
