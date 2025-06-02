
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, MessageSquare, Send, Users, Calendar, Eye, Edit, Trash2, Plus, Filter, BarChart3 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Campanha {
  id: number;
  nome: string;
  tipo: 'promocao' | 'informativo' | 'evento' | 'cobranca';
  audiencia: string;
  totalEnviados: number;
  canais: string[];
  dataEnvio: string;
  status: 'rascunho' | 'agendada' | 'enviada' | 'cancelada';
  metricas: {
    enviados: number;
    entregues: number;
    aberturas: number;
    cliques: number;
  };
}

interface Template {
  id: number;
  nome: string;
  categoria: string;
  conteudo: string;
  variaveis: string[];
}

const GestorComunicacao: React.FC = () => {
  const [campanhas] = useState<Campanha[]>([
    {
      id: 1,
      nome: 'Black Friday Wefit 2024',
      tipo: 'promocao',
      audiencia: 'Todos os alunos ativos',
      totalEnviados: 350,
      canais: ['email', 'app'],
      dataEnvio: '2024-11-25',
      status: 'enviada',
      metricas: {
        enviados: 350,
        entregues: 342,
        aberturas: 256,
        cliques: 89
      }
    },
    {
      id: 2,
      nome: 'Lembrete Vencimento Dezembro',
      tipo: 'cobranca',
      audiencia: 'Alunos com vencimento próximo',
      totalEnviados: 45,
      canais: ['sms', 'whatsapp'],
      dataEnvio: '2024-12-01',
      status: 'enviada',
      metricas: {
        enviados: 45,
        entregues: 44,
        aberturas: 41,
        cliques: 12
      }
    },
    {
      id: 3,
      nome: 'Workshop Yoga de Fim de Ano',
      tipo: 'evento',
      audiencia: 'Alunos interessados em Yoga',
      totalEnviados: 0,
      canais: ['email', 'app'],
      dataEnvio: '2024-12-15',
      status: 'agendada',
      metricas: {
        enviados: 0,
        entregues: 0,
        aberturas: 0,
        cliques: 0
      }
    }
  ]);

  const [templates] = useState<Template[]>([
    {
      id: 1,
      nome: 'Boas-vindas Novo Aluno',
      categoria: 'onboarding',
      conteudo: 'Olá {{nome}}, seja bem-vindo(a) à Wefit {{unidade}}! Estamos muito felizes em tê-lo(a) conosco.',
      variaveis: ['nome', 'unidade']
    },
    {
      id: 2,
      nome: 'Lembrete de Vencimento',
      categoria: 'cobranca',
      conteudo: 'Olá {{nome}}, sua mensalidade do plano {{plano}} vence em {{dias}} dias. Valor: {{valor}}.',
      variaveis: ['nome', 'plano', 'dias', 'valor']
    },
    {
      id: 3,
      nome: 'Convite para Evento',
      categoria: 'evento',
      conteudo: 'Não perca! {{evento}} acontece em {{data}} na {{unidade}}. Inscreva-se já!',
      variaveis: ['evento', 'data', 'unidade']
    }
  ]);

  const [segmentos] = useState([
    { value: 'todos', label: 'Todos os alunos ativos', count: 350 },
    { value: 'novos', label: 'Alunos novos (últimos 30 dias)', count: 28 },
    { value: 'antigos', label: 'Alunos há mais de 1 ano', count: 120 },
    { value: 'vencimento-proximo', label: 'Vencimento nos próximos 7 dias', count: 45 },
    { value: 'inadimplentes', label: 'Alunos inadimplentes', count: 12 },
    { value: 'yoga', label: 'Interessados em Yoga', count: 85 },
    { value: 'crossfit', label: 'Interessados em Crossfit', count: 92 },
    { value: 'aniversariantes', label: 'Aniversariantes do mês', count: 18 }
  ]);

  const [metricsData] = useState([
    { canal: 'E-mail', enviados: 890, entregues: 856, aberturas: 534, cliques: 178 },
    { canal: 'SMS', enviados: 234, entregues: 232, aberturas: 210, cliques: 45 },
    { canal: 'App Push', enviados: 567, entregues: 542, aberturas: 398, cliques: 112 },
    { canal: 'WhatsApp', enviados: 123, entregues: 121, aberturas: 115, cliques: 34 }
  ]);

  const [modalCampanhaAberto, setModalCampanhaAberto] = useState(false);
  const [modalTemplateAberto, setModalTemplateAberto] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1);

  const form = useForm({
    defaultValues: {
      nome: '',
      tipo: '',
      audiencia: '',
      canais: [],
      assunto: '',
      conteudo: '',
      agendamento: ''
    }
  });

  const templateForm = useForm({
    defaultValues: {
      nome: '',
      categoria: '',
      conteudo: ''
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviada': return 'default';
      case 'agendada': return 'secondary';
      case 'rascunho': return 'outline';
      case 'cancelada': return 'destructive';
      default: return 'default';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'promocao': return 'default';
      case 'informativo': return 'secondary';
      case 'evento': return 'outline';
      case 'cobranca': return 'destructive';
      default: return 'default';
    }
  };

  const calcularTaxaAbertura = (campanha: Campanha) => {
    if (campanha.metricas.entregues === 0) return 0;
    return ((campanha.metricas.aberturas / campanha.metricas.entregues) * 100).toFixed(1);
  };

  const calcularTaxaClique = (campanha: Campanha) => {
    if (campanha.metricas.aberturas === 0) return 0;
    return ((campanha.metricas.cliques / campanha.metricas.aberturas) * 100).toFixed(1);
  };

  const handleCriarCampanha = (data: any) => {
    console.log('Criando campanha:', data);
    setModalCampanhaAberto(false);
    setEtapaAtual(1);
    form.reset();
  };

  const handleCriarTemplate = (data: any) => {
    console.log('Criando template:', data);
    setModalTemplateAberto(false);
    templateForm.reset();
  };

  const proximaEtapa = () => {
    if (etapaAtual < 4) setEtapaAtual(etapaAtual + 1);
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Engajamento Wefit - Comunicação</h1>
          <p className="text-gray-600 mt-2">Gerencie campanhas e comunicações com os alunos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setModalTemplateAberto(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Template
          </Button>
          <Button onClick={() => setModalCampanhaAberto(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campanhas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="campanhas" className="space-y-6">
          {/* Lista de Campanhas */}
          <div className="space-y-4">
            {campanhas.map((campanha) => (
              <Card key={campanha.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{campanha.nome}</h3>
                          <p className="text-sm text-gray-600">{campanha.audiencia}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={getTipoColor(campanha.tipo) as any}>
                            {campanha.tipo}
                          </Badge>
                          <Badge variant={getStatusColor(campanha.status) as any}>
                            {campanha.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold text-lg">{campanha.metricas.enviados}</div>
                          <div className="text-sm text-gray-600">Enviados</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="font-bold text-lg text-blue-600">{campanha.metricas.entregues}</div>
                          <div className="text-sm text-gray-600">Entregues</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="font-bold text-lg text-green-600">
                            {calcularTaxaAbertura(campanha)}%
                          </div>
                          <div className="text-sm text-gray-600">Taxa Abertura</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="font-bold text-lg text-purple-600">
                            {calcularTaxaClique(campanha)}%
                          </div>
                          <div className="text-sm text-gray-600">Taxa Clique</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Canais:</span>
                          {campanha.canais.map((canal) => (
                            <Badge key={canal} variant="outline">
                              {canal === 'email' && <Mail className="h-3 w-3 mr-1" />}
                              {canal === 'sms' && <MessageSquare className="h-3 w-3 mr-1" />}
                              {canal === 'app' && <Send className="h-3 w-3 mr-1" />}
                              {canal === 'whatsapp' && <MessageSquare className="h-3 w-3 mr-1" />}
                              {canal}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {campanha.status === 'agendada' && (
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* Lista de Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.nome}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline">{template.categoria}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {template.conteudo}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Variáveis:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.variaveis.map((variavel) => (
                          <Badge key={variavel} variant="secondary" className="text-xs">
                            {`{{${variavel}}}`}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" className="flex-1">
                        Usar Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metricas" className="space-y-6">
          {/* Métricas por Canal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance por Canal de Comunicação
              </CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="canal" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enviados" fill="#5B2C6F" name="Enviados" />
                  <Bar dataKey="entregues" fill="#7C3AED" name="Entregues" />
                  <Bar dataKey="aberturas" fill="#A855F7" name="Aberturas" />
                  <Bar dataKey="cliques" fill="#C084FC" name="Cliques" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* KPIs Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center">
                  1,814
                </CardTitle>
                <CardDescription className="text-center">Total Enviados</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-blue-600">
                  96.2%
                </CardTitle>
                <CardDescription className="text-center">Taxa Entrega</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-green-600">
                  42.8%
                </CardTitle>
                <CardDescription className="text-center">Taxa Abertura</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-center text-purple-600">
                  8.7%
                </CardTitle>
                <CardDescription className="text-center">Taxa Clique</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Nova Campanha */}
      <Dialog open={modalCampanhaAberto} onOpenChange={setModalCampanhaAberto}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Nova Campanha de Comunicação</DialogTitle>
            <DialogDescription>
              Etapa {etapaAtual} de 4: {
                etapaAtual === 1 ? 'Definir Audiência' :
                etapaAtual === 2 ? 'Escolher Canais' :
                etapaAtual === 3 ? 'Criar Mensagem' : 'Agendar Envio'
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCriarCampanha)} className="space-y-6">
              {etapaAtual === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Campanha</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Promoção Verão 2025" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Campanha</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="promocao">Promoção</SelectItem>
                            <SelectItem value="informativo">Informativo</SelectItem>
                            <SelectItem value="evento">Evento</SelectItem>
                            <SelectItem value="cobranca">Cobrança</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="audiencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segmento de Audiência</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o público" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {segmentos.map((segmento) => (
                              <SelectItem key={segmento.value} value={segmento.value}>
                                {segmento.label} ({segmento.count} alunos)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {etapaAtual === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Canais de Comunicação</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {[
                        { id: 'email', label: 'E-mail', icon: Mail },
                        { id: 'sms', label: 'SMS', icon: MessageSquare },
                        { id: 'app', label: 'Notificação App', icon: Send },
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare }
                      ].map((canal) => (
                        <div key={canal.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox id={canal.id} />
                          <canal.icon className="h-4 w-4" />
                          <label htmlFor={canal.id} className="text-sm">{canal.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {etapaAtual === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o assunto da mensagem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="conteudo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conteúdo da Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite o conteúdo da mensagem..."
                            rows={8}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {etapaAtual === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="agendamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agendamento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Quando enviar?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="agora">Enviar Agora</SelectItem>
                            <SelectItem value="programar">Programar Envio</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch('agendamento') === 'programar' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Data</label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Hora</label>
                        <Input type="time" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={etapaAnterior}
                  disabled={etapaAtual === 1}
                >
                  Anterior
                </Button>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setModalCampanhaAberto(false)}
                  >
                    Cancelar
                  </Button>
                  {etapaAtual < 4 ? (
                    <Button type="button" onClick={proximaEtapa}>
                      Próximo
                    </Button>
                  ) : (
                    <Button type="submit">
                      Criar Campanha
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Novo Template */}
      <Dialog open={modalTemplateAberto} onOpenChange={setModalTemplateAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Template</DialogTitle>
            <DialogDescription>
              Crie um template reutilizável para suas campanhas
            </DialogDescription>
          </DialogHeader>
          <Form {...templateForm}>
            <form onSubmit={templateForm.handleSubmit(handleCriarTemplate)} className="space-y-4">
              <FormField
                control={templateForm.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Template</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Boas-vindas Novo Aluno" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={templateForm.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="promocao">Promoção</SelectItem>
                        <SelectItem value="evento">Evento</SelectItem>
                        <SelectItem value="cobranca">Cobrança</SelectItem>
                        <SelectItem value="geral">Geral</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={templateForm.control}
                name="conteudo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo do Template</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Use {{variavel}} para campos dinâmicos"
                        rows={6}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalTemplateAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Criar Template
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorComunicacao;
