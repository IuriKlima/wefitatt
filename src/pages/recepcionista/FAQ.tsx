
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  HelpCircle, 
  CreditCard, 
  Clock, 
  Users, 
  Smartphone,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FAQ {
  id: number;
  categoria: string;
  pergunta: string;
  resposta: string;
  tags: string[];
}

interface Categoria {
  id: string;
  nome: string;
  icon: React.ComponentType<{ className?: string }>;
  cor: string;
}

const RecepcionistaFAQ: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('todas');
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const categorias: Categoria[] = [
    { id: 'todas', nome: 'Todas as Categorias', icon: HelpCircle, cor: 'bg-gray-100 text-gray-800' },
    { id: 'planos', nome: 'Planos e Preços', icon: CreditCard, cor: 'bg-blue-100 text-blue-800' },
    { id: 'horarios', nome: 'Horários e Aulas', icon: Clock, cor: 'bg-green-100 text-green-800' },
    { id: 'regras', nome: 'Regras da Academia', icon: Users, cor: 'bg-purple-100 text-purple-800' },
    { id: 'app', nome: 'Uso do App Aluno', icon: Smartphone, cor: 'bg-orange-100 text-orange-800' },
    { id: 'problemas', nome: 'Problemas Comuns', icon: Settings, cor: 'bg-red-100 text-red-800' }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      categoria: 'planos',
      pergunta: 'Quais são os planos disponíveis e seus preços?',
      resposta: 'Oferecemos 3 planos: Básico (R$ 89,90/mês) - acesso à musculação e 2 aulas por semana; Premium (R$ 149,90/mês) - acesso completo + aulas ilimitadas; VIP (R$ 199,90/mês) - acesso completo + personal trainer 2x por mês. Todos com matrícula grátis na primeira mensalidade.',
      tags: ['preço', 'mensalidade', 'valor', 'plano']
    },
    {
      id: 2,
      categoria: 'planos',
      pergunta: 'Posso cancelar ou pausar meu plano?',
      resposta: 'Sim! Cancelamento: com 30 dias de antecedência sem taxa. Pausamento: até 60 dias por ano, R$ 29,90/mês taxa de manutenção. Ambos devem ser solicitados presencialmente com documento.',
      tags: ['cancelar', 'pausar', 'contrato', 'taxa']
    },
    {
      id: 3,
      categoria: 'horarios',
      pergunta: 'Qual o horário de funcionamento da academia?',
      resposta: 'Segunda a sexta: 5h às 23h. Sábados: 6h às 20h. Domingos e feriados: 8h às 18h. O último acesso é sempre 30 minutos antes do fechamento.',
      tags: ['horário', 'funcionamento', 'aberto', 'fechado']
    },
    {
      id: 4,
      categoria: 'horarios',
      pergunta: 'Como faço para reservar uma aula coletiva?',
      resposta: 'Pelo app Wefit, no balcão da recepção ou pelo WhatsApp (11) 9999-9999. Reservas até 2h antes da aula. Cancelamentos até 4h antes para evitar multa.',
      tags: ['aula', 'reserva', 'agendamento', 'cancelar aula']
    },
    {
      id: 5,
      categoria: 'regras',
      pergunta: 'Preciso usar máscara na academia?',
      resposta: 'Máscara é opcional na musculação. Obrigatória apenas durante aulas de alta intensidade ou se o aluno preferir. Sempre respeitamos a escolha individual.',
      tags: ['máscara', 'covid', 'proteção', 'regras']
    },
    {
      id: 6,
      categoria: 'regras',
      pergunta: 'Posso trazer convidados?',
      resposta: 'Plano Básico: 1 cortesia/mês. Plano Premium: 2 cortesias/mês. Plano VIP: cortesias ilimitadas. Convidado deve apresentar documento e assinar termo de responsabilidade.',
      tags: ['convidado', 'cortesia', 'visitante']
    },
    {
      id: 7,
      categoria: 'app',
      pergunta: 'Como baixo e acesso o app da academia?',
      resposta: 'Busque "Wefit" na Play Store/App Store. Login com CPF e senha fornecida na matrícula. No app: agendamentos, check-in, treinos, pagamentos e muito mais!',
      tags: ['app', 'aplicativo', 'download', 'login']
    },
    {
      id: 8,
      categoria: 'app',
      pergunta: 'Esqueci minha senha do app. Como recupero?',
      resposta: 'Na tela de login, clique "Esqueci minha senha", digite seu CPF e siga as instruções por email. Ou venha à recepção com documento para resetar na hora.',
      tags: ['senha', 'recuperar', 'esqueci', 'reset']
    },
    {
      id: 9,
      categoria: 'problemas',
      pergunta: 'Minha digital não está funcionando na catraca.',
      resposta: 'Teste com outro dedo. Se não funcionar, use o QR code do app ou solicite liberação manual na recepção. Agende recadastramento biométrico.',
      tags: ['digital', 'biometria', 'catraca', 'acesso']
    },
    {
      id: 10,
      categoria: 'problemas',
      pergunta: 'Não consigo fazer check-in pelo app.',
      resposta: 'Verifique: 1) Localização ativada 2) Internet estável 3) App atualizado 4) Mensalidade em dia. Se persistir, use check-in manual na recepção.',
      tags: ['check-in', 'app', 'problema', 'localização']
    },
    {
      id: 11,
      categoria: 'planos',
      pergunta: 'Existe desconto para estudantes ou idosos?',
      resposta: 'Sim! Estudantes: 15% de desconto com carteirinha válida. Idosos 60+: 20% de desconto. Funcionários públicos: 10% de desconto. Apresentar comprovação.',
      tags: ['desconto', 'estudante', 'idoso', 'funcionário público']
    },
    {
      id: 12,
      categoria: 'horarios',
      pergunta: 'Que horas é menos movimentado na academia?',
      resposta: 'Menos movimento: 10h-15h e após 21h nos dias úteis. Fins de semana são mais tranquilos o dia todo. Maior movimento: 6h-9h e 18h-21h.',
      tags: ['movimento', 'horário', 'vazio', 'cheio']
    }
  ];

  const faqsFiltrados = faqs.filter(faq => {
    const matchCategoria = categoriaSelecionada === 'todas' || faq.categoria === categoriaSelecionada;
    const matchBusca = !busca || 
      faq.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(busca.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchCategoria && matchBusca;
  });

  const toggleFAQ = (id: number) => {
    setFaqAberto(faqAberto === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Consulta Rápida Wefit (FAQ Interno)</h1>
          <p className="text-gray-600 mt-2">Base de conhecimento para atendimento de excelência</p>
        </div>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              placeholder="O que você procura? Digite palavras-chave..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 text-lg h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias Principais</CardTitle>
          <CardDescription>Clique em uma categoria para filtrar as perguntas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categorias.map((categoria) => {
              const IconComponent = categoria.icon;
              return (
                <button
                  key={categoria.id}
                  onClick={() => setCategoriaSelecionada(categoria.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    categoriaSelecionada === categoria.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">{categoria.nome}</p>
                    <Badge className={`mt-1 ${categoria.cor} text-xs`}>
                      {faqs.filter(faq => categoria.id === 'todas' || faq.categoria === categoria.id).length}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {categoriaSelecionada === 'todas' ? 'Todas as Perguntas' : 
           categorias.find(c => c.id === categoriaSelecionada)?.nome}
        </h2>
        <p className="text-gray-600">
          {faqsFiltrados.length} pergunta(s) encontrada(s)
        </p>
      </div>

      {/* Lista de FAQs */}
      <div className="space-y-3">
        {faqsFiltrados.map((faq) => {
          const categoria = categorias.find(c => c.id === faq.categoria);
          return (
            <Card key={faq.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={categoria?.cor || 'bg-gray-100 text-gray-800'}>
                          {categoria?.nome}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{faq.pergunta}</h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {faq.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{faq.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {faqAberto === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>
                
                {faqAberto === faq.id && (
                  <div className="px-6 pb-6 border-t bg-gray-50">
                    <div className="pt-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.resposta}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {faqsFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhuma pergunta encontrada
            </h3>
            <p className="text-gray-500">
              Tente usar palavras-chave diferentes ou selecionar outra categoria
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dicas de Uso */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas para Usar o FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>• <strong>Use palavras-chave:</strong> Digite termos como "preço", "horário", "cancelar"</li>
            <li>• <strong>Explore as categorias:</strong> Navegue por temas específicos</li>
            <li>• <strong>Respostas completas:</strong> Clique nas perguntas para ver a resposta completa</li>
            <li>• <strong>Informações atualizadas:</strong> Este FAQ é atualizado regularmente</li>
            <li>• <strong>Não encontrou?</strong> Anote a dúvida e consulte o gestor para adicionar ao FAQ</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecepcionistaFAQ;
