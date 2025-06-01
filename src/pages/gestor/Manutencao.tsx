
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, Plus, Search, AlertTriangle, CheckCircle, Clock, Calendar as CalendarIcon, Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  marca: string;
  modelo: string;
  localizacao: string;
  dataCompra: string;
  ultimaManutencao: string;
  proximaManutencao: string;
  status: 'operacional' | 'manutencao' | 'defeituoso';
  numeroSerie: string;
  fornecedor: string;
}

interface ManutencaoRegistro {
  id: number;
  equipamentoId: number;
  equipamentoNome: string;
  tipo: 'preventiva' | 'corretiva' | 'emergencial';
  data: string;
  tecnico: string;
  descricao: string;
  custo: number;
  status: 'agendada' | 'em-andamento' | 'concluida' | 'cancelada';
}

const GestorManutencao: React.FC = () => {
  const [equipamentos] = useState<Equipamento[]>([
    {
      id: 1,
      nome: 'Esteira Ergométrica 01',
      tipo: 'Cardio',
      marca: 'TechnoGym',
      modelo: 'Run Race 1200',
      localizacao: 'Área Cardio - Posição A1',
      dataCompra: '2023-01-15',
      ultimaManutencao: '2024-11-15',
      proximaManutencao: '2025-02-15',
      status: 'operacional',
      numeroSerie: 'TG123456',
      fornecedor: 'Fitness Equipment'
    },
    {
      id: 2,
      nome: 'Leg Press 45°',
      tipo: 'Musculação',
      marca: 'Life Fitness',
      modelo: 'Signature Series',
      localizacao: 'Área Musculação - Setor B',
      dataCompra: '2023-03-20',
      ultimaManutencao: '2024-10-20',
      proximaManutencao: '2024-12-05',
      status: 'manutencao',
      numeroSerie: 'LF789012',
      fornecedor: 'Gym Solutions'
    },
    {
      id: 3,
      nome: 'Bike Ergométrica 03',
      tipo: 'Cardio',
      marca: 'Cybex',
      modelo: 'IC4',
      localizacao: 'Área Cardio - Posição C3',
      dataCompra: '2023-05-10',
      ultimaManutencao: '2024-08-10',
      proximaManutencao: '2024-12-02',
      status: 'defeituoso',
      numeroSerie: 'CY345678',
      fornecedor: 'Cardio Tech'
    }
  ]);

  const [manutencoes] = useState<ManutencaoRegistro[]>([
    {
      id: 1,
      equipamentoId: 2,
      equipamentoNome: 'Leg Press 45°',
      tipo: 'preventiva',
      data: '2024-12-05',
      tecnico: 'João Silva - Gym Solutions',
      descricao: 'Lubrificação geral, verificação de cabos e ajuste de sistema',
      custo: 250.00,
      status: 'agendada'
    },
    {
      id: 2,
      equipamentoId: 3,
      equipamentoNome: 'Bike Ergométrica 03',
      tipo: 'corretiva',
      data: '2024-12-02',
      tecnico: 'Carlos Santos - Cardio Tech',
      descricao: 'Substituição do display principal e calibração do sistema',
      custo: 450.00,
      status: 'em-andamento'
    },
    {
      id: 3,
      equipamentoId: 1,
      equipamentoNome: 'Esteira Ergométrica 01',
      tipo: 'preventiva',
      data: '2024-11-15',
      tecnico: 'Ana Costa - TechnoGym',
      descricao: 'Manutenção preventiva trimestral - lubrificação e limpeza',
      custo: 180.00,
      status: 'concluida'
    }
  ]);

  const [busca, setBusca] = useState('');
  const [modalEquipamentoAberto, setModalEquipamentoAberto] = useState(false);
  const [modalManutencaoAberto, setModalManutencaoAberto] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const formEquipamento = useForm({
    defaultValues: {
      nome: '',
      tipo: '',
      marca: '',
      modelo: '',
      localizacao: '',
      dataCompra: '',
      numeroSerie: '',
      fornecedor: ''
    }
  });

  const formManutencao = useForm({
    defaultValues: {
      equipamento: '',
      tipo: '',
      data: '',
      tecnico: '',
      descricao: '',
      custo: ''
    }
  });

  const equipamentosFiltrados = equipamentos.filter(equipamento =>
    equipamento.nome.toLowerCase().includes(busca.toLowerCase()) ||
    equipamento.tipo.toLowerCase().includes(busca.toLowerCase()) ||
    equipamento.localizacao.toLowerCase().includes(busca.toLowerCase())
  );

  const manutencoesPendentes = manutencoes.filter(m => m.status === 'agendada' || m.status === 'em-andamento');
  const equipamentosComProblema = equipamentos.filter(e => e.status !== 'operacional');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operacional': return 'default';
      case 'manutencao': return 'secondary';
      case 'defeituoso': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operacional': return 'Operacional';
      case 'manutencao': return 'Em Manutenção';
      case 'defeituoso': return 'Defeituoso';
      default: return 'Desconhecido';
    }
  };

  const getManutencaoStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'secondary';
      case 'em-andamento': return 'default';
      case 'concluida': return 'outline';
      case 'cancelada': return 'destructive';
      default: return 'default';
    }
  };

  const getManutencaoStatusText = (status: string) => {
    switch (status) {
      case 'agendada': return 'Agendada';
      case 'em-andamento': return 'Em Andamento';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      default: return 'Desconhecido';
    }
  };

  const handleSalvarEquipamento = (data: any) => {
    console.log('Salvando equipamento:', data);
    setModalEquipamentoAberto(false);
    formEquipamento.reset();
    setEquipamentoSelecionado(null);
  };

  const handleSalvarManutencao = (data: any) => {
    console.log('Agendando manutenção:', data);
    setModalManutencaoAberto(false);
    formManutencao.reset();
  };

  const handleEditarEquipamento = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    formEquipamento.setValue('nome', equipamento.nome);
    formEquipamento.setValue('tipo', equipamento.tipo);
    formEquipamento.setValue('marca', equipamento.marca);
    formEquipamento.setValue('modelo', equipamento.modelo);
    formEquipamento.setValue('localizacao', equipamento.localizacao);
    formEquipamento.setValue('dataCompra', equipamento.dataCompra);
    formEquipamento.setValue('numeroSerie', equipamento.numeroSerie);
    formEquipamento.setValue('fornecedor', equipamento.fornecedor);
    setModalEquipamentoAberto(true);
  };

  const equipamentosComManutencaoProxima = equipamentos.filter(equipamento => {
    const proximaManutencao = new Date(equipamento.proximaManutencao);
    const hoje = new Date();
    const diasRestantes = Math.ceil((proximaManutencao.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    return diasRestantes <= 7 && diasRestantes >= 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manutenção de Equipamentos</h1>
          <p className="text-gray-600 mt-2">Gerencie equipamentos e agendamentos de manutenção</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setModalManutencaoAberto(true)}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Agendar Manutenção
          </Button>
          <Button onClick={() => { setEquipamentoSelecionado(null); formEquipamento.reset(); setModalEquipamentoAberto(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Equipamento
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Total de Equipamentos
            </CardTitle>
            <div className="text-2xl font-bold">{equipamentos.length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Operacionais
            </CardTitle>
            <div className="text-2xl font-bold text-green-600">
              {equipamentos.filter(e => e.status === 'operacional').length}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              Manutenções Pendentes
            </CardTitle>
            <div className="text-2xl font-bold text-yellow-600">{manutencoesPendentes.length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Com Problemas
            </CardTitle>
            <div className="text-2xl font-bold text-red-600">{equipamentosComProblema.length}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Alertas de Manutenção Próxima */}
      {equipamentosComManutencaoProxima.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              Manutenções Próximas (Próximos 7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {equipamentosComManutencaoProxima.map((equipamento) => (
                <div key={equipamento.id} className="flex justify-between items-center p-3 bg-white rounded border">
                  <div>
                    <span className="font-medium">{equipamento.nome}</span>
                    <span className="text-sm text-gray-500 ml-2">({equipamento.localizacao})</span>
                  </div>
                  <div className="text-sm">
                    Manutenção: {new Date(equipamento.proximaManutencao).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="equipamentos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
          <TabsTrigger value="manutencoes">Manutenções</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="equipamentos">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Lista de Equipamentos</CardTitle>
                  <CardDescription>Gerencie os equipamentos da unidade</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar equipamentos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Última Manutenção</TableHead>
                    <TableHead>Próxima Manutenção</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipamentosFiltrados.map((equipamento) => (
                    <TableRow key={equipamento.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{equipamento.nome}</div>
                          <div className="text-sm text-gray-500">{equipamento.marca} {equipamento.modelo}</div>
                        </div>
                      </TableCell>
                      <TableCell>{equipamento.tipo}</TableCell>
                      <TableCell>{equipamento.localizacao}</TableCell>
                      <TableCell>{new Date(equipamento.ultimaManutencao).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{new Date(equipamento.proximaManutencao).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(equipamento.status) as any}>
                          {getStatusText(equipamento.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditarEquipamento(equipamento)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Wrench className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manutencoes">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Manutenções</CardTitle>
              <CardDescription>Registro de manutenções agendadas e realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Custo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manutencoes.map((manutencao) => (
                    <TableRow key={manutencao.id}>
                      <TableCell>{new Date(manutencao.data).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{manutencao.equipamentoNome}</TableCell>
                      <TableCell className="capitalize">{manutencao.tipo}</TableCell>
                      <TableCell>{manutencao.tecnico}</TableCell>
                      <TableCell>R$ {manutencao.custo.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getManutencaoStatusColor(manutencao.status) as any}>
                          {getManutencaoStatusText(manutencao.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Calendário de Manutenções</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Manutenções Agendadas - {selectedDate?.toLocaleDateString('pt-BR')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {manutencoes
                    .filter(m => {
                      if (!selectedDate) return false;
                      const manutencaoData = new Date(m.data);
                      return manutencaoData.toDateString() === selectedDate.toDateString();
                    })
                    .map((manutencao) => (
                      <div key={manutencao.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{manutencao.equipamentoNome}</h4>
                            <p className="text-sm text-gray-600 capitalize">Manutenção {manutencao.tipo}</p>
                            <p className="text-sm text-gray-600">{manutencao.tecnico}</p>
                            <p className="text-sm mt-2">{manutencao.descricao}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={getManutencaoStatusColor(manutencao.status) as any}>
                              {getManutencaoStatusText(manutencao.status)}
                            </Badge>
                            <p className="text-sm mt-1">R$ {manutencao.custo.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {manutencoes.filter(m => {
                    if (!selectedDate) return false;
                    const manutencaoData = new Date(m.data);
                    return manutencaoData.toDateString() === selectedDate.toDateString();
                  }).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhuma manutenção agendada para esta data
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Adicionar/Editar Equipamento */}
      <Dialog open={modalEquipamentoAberto} onOpenChange={setModalEquipamentoAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {equipamentoSelecionado ? 'Editar Equipamento' : 'Adicionar Novo Equipamento'}
            </DialogTitle>
            <DialogDescription>
              {equipamentoSelecionado ? 'Edite as informações do equipamento' : 'Preencha as informações do novo equipamento'}
            </DialogDescription>
          </DialogHeader>
          <Form {...formEquipamento}>
            <form onSubmit={formEquipamento.handleSubmit(handleSalvarEquipamento)} className="space-y-4">
              <FormField
                control={formEquipamento.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Equipamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Esteira Ergométrica 01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formEquipamento.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="musculacao">Musculação</SelectItem>
                          <SelectItem value="funcional">Funcional</SelectItem>
                          <SelectItem value="acessorio">Acessório</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formEquipamento.control}
                  name="localizacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Área Cardio - Posição A1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formEquipamento.control}
                  name="marca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: TechnoGym" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formEquipamento.control}
                  name="modelo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Run Race 1200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formEquipamento.control}
                  name="numeroSerie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Série</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: TG123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formEquipamento.control}
                  name="dataCompra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Compra</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={formEquipamento.control}
                name="fornecedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Fitness Equipment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalEquipamentoAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {equipamentoSelecionado ? 'Atualizar Equipamento' : 'Salvar Equipamento'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Agendar Manutenção */}
      <Dialog open={modalManutencaoAberto} onOpenChange={setModalManutencaoAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Agendar Nova Manutenção</DialogTitle>
            <DialogDescription>
              Registre uma nova manutenção para equipamento
            </DialogDescription>
          </DialogHeader>
          <Form {...formManutencao}>
            <form onSubmit={formManutencao.handleSubmit(handleSalvarManutencao)} className="space-y-4">
              <FormField
                control={formManutencao.control}
                name="equipamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipamento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o equipamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {equipamentos.map((equipamento) => (
                          <SelectItem key={equipamento.id} value={equipamento.id.toString()}>
                            {equipamento.nome} - {equipamento.localizacao}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formManutencao.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Manutenção</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="preventiva">Preventiva</SelectItem>
                          <SelectItem value="corretiva">Corretiva</SelectItem>
                          <SelectItem value="emergencial">Emergencial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formManutencao.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Manutenção</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formManutencao.control}
                  name="tecnico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Técnico Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João Silva - Empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formManutencao.control}
                  name="custo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custo Estimado</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={formManutencao.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição dos Serviços</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva os serviços que serão realizados..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalManutencaoAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Agendar Manutenção
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorManutencao;
