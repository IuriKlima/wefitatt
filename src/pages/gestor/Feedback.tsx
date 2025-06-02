
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, TrendingUp, MessageSquare, Filter, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Feedback {
  id: number;
  aluno: string;
  tipo: 'aula' | 'instrutor' | 'instalacao' | 'geral';
  referencia: string;
  pontuacao: number;
  comentario: string;
  data: string;
  status: 'novo' | 'lido' | 'resolvido';
  anonimo: boolean;
}

interface DadosNPS {
  mes: string;
  nps: number;
  promotores: number;
  neutros: number;
  detratores: number;
}

const GestorFeedback: React.FC = () => {
  const [feedbacks] = useState<Feedback[]>([
    {
      id: 1,
      aluno: 'Maria Silva',
      tipo: 'aula',
      referencia: 'Yoga das 18h',
      pontuacao: 5,
      comentario: 'Excelente aula! A instrutora Ana é muito atenciosa e as técnicas são bem explicadas.',
      data: '2024-12-05',
      status: 'novo',
      anonimo: false
    },
    {
      id: 2,
      aluno: 'Anônimo',
      tipo: 'instalacao',
      referencia: 'Vestiário Masculino',
      pontuacao: 2,
      comentario: 'Chuveiros com água fria e armários com problemas na fechadura.',
      data: '2024-12-04',
      status: 'lido',
      anonimo: true
    },
    {
      id: 3,
      aluno: 'João Santos',
      tipo: 'instrutor',
      referencia: 'Carlos Lima - Crossfit',
      pontuacao: 4,
      comentario: 'Bom instrutor, mas às vezes as aulas ficam muito intensas para iniciantes.',
      data: '2024-12-03',
      status: 'resolvido',
      anonimo: false
    },
    {
      id: 4,
      aluno: 'Ana Costa',
      tipo: 'geral',
      referencia: 'Experiência Geral',
      pontuacao: 5,
      comentario: 'Adoro esta academia! Ambiente limpo, equipamentos modernos e equipe super atenciosa.',
      data: '2024-12-02',
      status: 'lido',
      anonimo: false
    }
  ]);

  const [dadosNPS] = useState<DadosNPS[]>([
    { mes: 'Jul', nps: 65, promotores: 45, neutros: 35, detratores: 20 },
    { mes: 'Ago', nps: 68, promotores: 48, neutros: 32, detratores: 20 },
    { mes: 'Set', nps: 72, promotores: 52, neutros: 28, detratores: 20 },
    { mes: 'Out', nps: 75, promotores: 55, neutros: 25, detratores: 20 },
    { mes: 'Nov', nps: 73, promotores: 53, neutros: 27, detratores: 20 },
    { mes: 'Dez', nps: 78, promotores: 58, neutros: 22, detratores: 20 }
  ]);

  const [distribuicaoNPS] = useState([
    { name: 'Promotores', value: 58, color: '#10B981' },
    { name: 'Neutros', value: 22, color: '#F59E0B' },
    { name: 'Detratores', value: 20, color: '#EF4444' }
  ]);

  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [modalPesquisaAberto, setModalPesquisaAberto] = useState(false);

  const form = useForm({
    defaultValues: {
      titulo: '',
      descricao: '',
      segmento: '',
      perguntas: ''
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'destructive';
      case 'lido': return 'secondary';
      case 'resolvido': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'novo': return <AlertTriangle className="h-4 w-4" />;
      case 'lido': return <Clock className="h-4 w-4" />;
      case 'resolvido': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'aula': return 'default';
      case 'instrutor': return 'secondary';
      case 'instalacao': return 'outline';
      case 'geral': return 'default';
      default: return 'default';
    }
  };

  const renderEstrelas = (pontuacao: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < pontuacao ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const feedbacksFiltrados = feedbacks.filter(feedback => {
    const tipoMatch = filtroTipo === 'todos' || feedback.tipo === filtroTipo;
    const statusMatch = filtroStatus === 'todos' || feedback.status === filtroStatus;
    return tipoMatch && statusMatch;
  });

  const npsAtual = dadosNPS[dadosNPS.length - 1]?.nps || 0;

  const handleCriarPesquisa = (data: any) => {
    console.log('Criando pesquisa:', data);
    setModalPesquisaAberto(false);
    form.reset();
  };

  const handleMarcarComoLido = (id: number) => {
    console.log('Marcando feedback como lido:', id);
  };

  const handleMarcarComoResolvido = (id: number) => {
    console.log('Marcando feedback como resolvido:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Voz do Aluno - Feedback e NPS</h1>
          <p className="text-gray-600 mt-2">Monitore a satisfação dos alunos e melhore continuamente</p>
        </div>
        <Button onClick={() => setModalPesquisaAberto(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Pesquisa
        </Button>
      </div>

      <Tabs defaultValue="nps" className="space-y-6">
        <TabsList>
          <TabsTrigger value="nps">Dashboard NPS</TabsTrigger>
          <TabsTrigger value="feedbacks">Feedbacks Detalhados</TabsTrigger>
        </TabsList>

        <TabsContent value="nps" className="space-y-6">
          {/* KPIs do NPS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-wefit-primary">
                  {npsAtual}
                </CardTitle>
                <CardDescription className="text-center">NPS Atual</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-green-600">
                  {distribuicaoNPS[0].value}%
                </CardTitle>
                <CardDescription className="text-center">Promotores</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-yellow-600">
                  {distribuicaoNPS[1].value}%
                </CardTitle>
                <CardDescription className="text-center">Neutros</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-red-600">
                  {distribuicaoNPS[2].value}%
                </CardTitle>
                <CardDescription className="text-center">Detratores</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Gráficos do NPS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Evolução do NPS
                </CardTitle>
                <CardDescription>Pontuação NPS ao longo dos meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosNPS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="nps" stroke="#5B2C6F" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição Atual</CardTitle>
                <CardDescription>Classificação dos respondentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distribuicaoNPS}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {distribuicaoNPS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedbacks" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Tipo de Feedback</label>
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os tipos</SelectItem>
                      <SelectItem value="aula">Aulas</SelectItem>
                      <SelectItem value="instrutor">Instrutores</SelectItem>
                      <SelectItem value="instalacao">Instalações</SelectItem>
                      <SelectItem value="geral">Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os status</SelectItem>
                      <SelectItem value="novo">Novos</SelectItem>
                      <SelectItem value="lido">Lidos</SelectItem>
                      <SelectItem value="resolvido">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Exportar Feedbacks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Feedbacks */}
          <div className="space-y-4">
            {feedbacksFiltrados.map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {feedback.anonimo ? 'A' : feedback.aluno.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{feedback.anonimo ? 'Anônimo' : feedback.aluno}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(feedback.data).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <Badge variant={getTipoColor(feedback.tipo) as any}>
                          {feedback.tipo}
                        </Badge>
                        <Badge variant={getStatusColor(feedback.status) as any}>
                          {getStatusIcon(feedback.status)}
                          <span className="ml-1">{feedback.status}</span>
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          Referência: {feedback.referencia}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {renderEstrelas(feedback.pontuacao)}
                          <span className="text-sm text-gray-600 ml-2">
                            {feedback.pontuacao}/5 estrelas
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{feedback.comentario}</p>

                      <div className="flex gap-2">
                        {feedback.status === 'novo' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarcarComoLido(feedback.id)}
                          >
                            Marcar como Lido
                          </Button>
                        )}
                        {feedback.status !== 'resolvido' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarcarComoResolvido(feedback.id)}
                          >
                            Marcar como Resolvido
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Criar Pesquisa */}
      <Dialog open={modalPesquisaAberto} onOpenChange={setModalPesquisaAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Nova Pesquisa</DialogTitle>
            <DialogDescription>
              Configure uma pesquisa de satisfação para enviar aos alunos
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCriarPesquisa)} className="space-y-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Pesquisa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Pesquisa de Satisfação - Dezembro 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva o objetivo da pesquisa..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="segmento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento de Alunos</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o público" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="todos">Todos os alunos</SelectItem>
                        <SelectItem value="novos">Alunos recentes (últimos 30 dias)</SelectItem>
                        <SelectItem value="antigos">Alunos há mais de 6 meses</SelectItem>
                        <SelectItem value="inativos">Alunos inativos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="perguntas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perguntas (uma por linha)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Como você avalia nossa academia de 0 a 10?&#10;O que podemos melhorar?&#10;Você recomendaria nossa academia?"
                        rows={6}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalPesquisaAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Criar Pesquisa
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorFeedback;
