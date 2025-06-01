
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, 
  User, 
  AlertTriangle, 
  MessageSquare, 
  ThumbsUp, 
  HelpCircle,
  Settings,
  CheckCircle,
  Clock,
  Search
} from 'lucide-react';

interface Ocorrencia {
  id: number;
  aluno?: string;
  tipo: string;
  prioridade: 'baixa' | 'media' | 'alta';
  titulo: string;
  descricao: string;
  resolvidoRecepcao: boolean;
  dataRegistro: string;
  status: 'aberto' | 'em_andamento' | 'resolvido';
}

interface NovaOcorrencia {
  aluno: string;
  tipo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  resolvidoRecepcao: boolean;
}

const RecepcionistaOcorrencias: React.FC = () => {
  const [etapa, setEtapa] = useState<'lista' | 'novo'>('lista');
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  
  const [novaOcorrencia, setNovaOcorrencia] = useState<NovaOcorrencia>({
    aluno: '',
    tipo: '',
    descricao: '',
    prioridade: 'media',
    resolvidoRecepcao: false
  });

  const [feedback, setFeedback] = useState<{tipo: 'success' | 'error', mensagem: string} | null>(null);

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([
    {
      id: 1,
      aluno: 'Maria Silva Santos',
      tipo: 'Sugestão',
      prioridade: 'baixa',
      titulo: 'Sugestão para nova modalidade',
      descricao: 'Gostaria de sugerir aulas de dança do ventre para as tardes',
      resolvidoRecepcao: false,
      dataRegistro: '2025-06-01 14:30',
      status: 'aberto'
    },
    {
      id: 2,
      aluno: 'João Santos',
      tipo: 'Reclamação',
      prioridade: 'alta',
      titulo: 'Ar condicionado não funcionando',
      descricao: 'O ar condicionado da sala de musculação está com problema. Temperatura muito alta.',
      resolvidoRecepcao: false,
      dataRegistro: '2025-06-01 09:15',
      status: 'em_andamento'
    },
    {
      id: 3,
      tipo: 'Problema Técnico (Equipamento/Instalação)',
      prioridade: 'media',
      titulo: 'Esteira 05 com ruído',
      descricao: 'Esteira número 5 está fazendo ruído estranho durante o uso',
      resolvidoRecepcao: false,
      dataRegistro: '2025-05-31 16:45',
      status: 'resolvido'
    },
    {
      id: 4,
      aluno: 'Ana Costa',
      tipo: 'Elogio',
      prioridade: 'baixa',
      titulo: 'Excelente atendimento',
      descricao: 'Parabenizo toda a equipe pelo excelente atendimento. Muito satisfeita com a academia.',
      resolvidoRecepcao: true,
      dataRegistro: '2025-05-30 18:20',
      status: 'resolvido'
    }
  ]);

  const tiposOcorrencia = [
    'Sugestão',
    'Reclamação', 
    'Elogio',
    'Dúvida Geral',
    'Problema Técnico (Equipamento/Instalação)',
    'Outro'
  ];

  const alunos = [
    'Maria Silva Santos',
    'João Santos Oliveira', 
    'Ana Costa Lima',
    'Pedro Ferreira',
    'Carla Rodrigues'
  ];

  const ocorrenciasFiltradas = ocorrencias.filter(ocorrencia => {
    const matchBusca = !busca || 
      ocorrencia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      ocorrencia.aluno?.toLowerCase().includes(busca.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || ocorrencia.tipo === filtroTipo;
    const matchStatus = filtroStatus === 'todos' || ocorrencia.status === filtroStatus;
    
    return matchBusca && matchTipo && matchStatus;
  });

  const salvarOcorrencia = () => {
    if (!novaOcorrencia.tipo) {
      setFeedback({tipo: 'error', mensagem: 'Selecione o tipo de registro'});
      return;
    }

    if (!novaOcorrencia.descricao.trim()) {
      setFeedback({tipo: 'error', mensagem: 'Descrição é obrigatória'});
      return;
    }

    const nova: Ocorrencia = {
      id: ocorrencias.length + 1,
      aluno: novaOcorrencia.aluno || undefined,
      tipo: novaOcorrencia.tipo,
      prioridade: novaOcorrencia.prioridade,
      titulo: `${novaOcorrencia.tipo}${novaOcorrencia.aluno ? ` - ${novaOcorrencia.aluno}` : ''}`,
      descricao: novaOcorrencia.descricao,
      resolvidoRecepcao: novaOcorrencia.resolvidoRecepcao,
      dataRegistro: new Date().toLocaleString('pt-BR'),
      status: novaOcorrencia.resolvidoRecepcao ? 'resolvido' : 'aberto'
    };

    setOcorrencias([nova, ...ocorrencias]);
    
    setFeedback({
      tipo: 'success',
      mensagem: `Ocorrência registrada com sucesso! ID: #${nova.id}`
    });

    // Reset form
    setNovaOcorrencia({
      aluno: '',
      tipo: '',
      descricao: '',
      prioridade: 'media',
      resolvidoRecepcao: false
    });

    // Voltar para lista após 2 segundos
    setTimeout(() => {
      setEtapa('lista');
      setFeedback(null);
    }, 2000);
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-orange-100 text-orange-800';
      case 'resolvido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Sugestão': return MessageSquare;
      case 'Reclamação': return AlertTriangle;
      case 'Elogio': return ThumbsUp;
      case 'Dúvida Geral': return HelpCircle;
      case 'Problema Técnico (Equipamento/Instalação)': return Settings;
      default: return ClipboardList;
    }
  };

  const estatisticas = {
    total: ocorrencias.length,
    abertas: ocorrencias.filter(o => o.status === 'aberto').length,
    resolvidas: ocorrencias.filter(o => o.status === 'resolvido').length,
    alta_prioridade: ocorrencias.filter(o => o.prioridade === 'alta' && o.status !== 'resolvido').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Registrar Atendimento/Ocorrência</h1>
          <p className="text-gray-600 mt-2">Registre feedbacks, problemas e atendimentos realizados</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={etapa === 'lista' ? 'default' : 'outline'}
            onClick={() => setEtapa('lista')}
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Ver Registros
          </Button>
          <Button 
            variant={etapa === 'novo' ? 'default' : 'outline'}
            onClick={() => setEtapa('novo')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Novo Registro
          </Button>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <Alert className={feedback.tipo === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={feedback.tipo === 'success' ? 'text-green-700' : 'text-red-700'}>
            {feedback.mensagem}
          </AlertDescription>
        </Alert>
      )}

      {etapa === 'lista' ? (
        <>
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
                <ClipboardList className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{estatisticas.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Aberto</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{estatisticas.abertas}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolvidas</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{estatisticas.resolvidas}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alta Prioridade</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{estatisticas.alta_prioridade}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por título ou aluno..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    {tiposOcorrencia.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="resolvido">Resolvido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Ocorrências */}
          <div className="space-y-4">
            {ocorrenciasFiltradas.map((ocorrencia) => {
              const IconComponent = getTipoIcon(ocorrencia.tipo);
              return (
                <Card key={ocorrencia.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{ocorrencia.titulo}</h3>
                            {ocorrencia.aluno && (
                              <p className="text-sm text-gray-600">Aluno: {ocorrencia.aluno}</p>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Badge className={getPrioridadeColor(ocorrencia.prioridade)}>
                              {ocorrencia.prioridade.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(ocorrencia.status)}>
                              {ocorrencia.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{ocorrencia.descricao}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>ID: #{ocorrencia.id}</span>
                            <span>Tipo: {ocorrencia.tipo}</span>
                            <span>Registrado em: {ocorrencia.dataRegistro}</span>
                          </div>
                          
                          {ocorrencia.resolvidoRecepcao && (
                            <Badge variant="outline" className="bg-green-50">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolvido na Recepção
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        /* Formulário de Nova Ocorrência */
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Novo Registro de Atendimento/Ocorrência
            </CardTitle>
            <CardDescription>
              Registre feedbacks, problemas ou atendimentos realizados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Aluno (opcional)
              </label>
              <Select value={novaOcorrencia.aluno} onValueChange={(value) => setNovaOcorrencia({...novaOcorrencia, aluno: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um aluno ou deixe em branco para atendimento geral" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Atendimento Geral (sem aluno específico)</SelectItem>
                  {alunos.map((aluno) => (
                    <SelectItem key={aluno} value={aluno}>
                      {aluno}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Registro *
              </label>
              <Select value={novaOcorrencia.tipo} onValueChange={(value) => setNovaOcorrencia({...novaOcorrencia, tipo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposOcorrencia.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Descrição Detalhada *
              </label>
              <Textarea
                placeholder="Descreva detalhadamente o atendimento, problema ou feedback..."
                value={novaOcorrencia.descricao}
                onChange={(e) => setNovaOcorrencia({...novaOcorrencia, descricao: e.target.value})}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Prioridade (para Gestor)
              </label>
              <Select 
                value={novaOcorrencia.prioridade} 
                onValueChange={(value: 'baixa' | 'media' | 'alta') => setNovaOcorrencia({...novaOcorrencia, prioridade: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="resolvido"
                checked={novaOcorrencia.resolvidoRecepcao}
                onCheckedChange={(checked) => setNovaOcorrencia({...novaOcorrencia, resolvidoRecepcao: !!checked})}
              />
              <label htmlFor="resolvido" className="text-sm font-medium">
                Resolvido na Recepção?
              </label>
            </div>

            <Button onClick={salvarOcorrencia} className="w-full" size="lg">
              <ClipboardList className="h-4 w-4 mr-2" />
              Salvar Registro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecepcionistaOcorrencias;
