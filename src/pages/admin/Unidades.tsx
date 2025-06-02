import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Eye, Building2, Users, Target, DollarSign, Progress, LayoutDashboard } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Unidade {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  alunos: number;
  status: 'Ativa' | 'Inativa';
  cnpj?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  horarioFuncionamento?: string;
  capacidadeMaxima?: number;
}

const AdminUnidades: React.FC = () => {
  const [unidades] = useState<Unidade[]>([
    { 
      id: 1, 
      nome: 'Wefit Centro', 
      endereco: 'Rua das Flores, 123', 
      cidade: 'São Paulo', 
      uf: 'SP', 
      alunos: 680, 
      status: 'Ativa',
      cnpj: '12.345.678/0001-90',
      cep: '01310-100',
      telefone: '(11) 99999-9999',
      email: 'centro@wefit.com',
      horarioFuncionamento: '06:00 às 22:00',
      capacidadeMaxima: 800
    },
    { 
      id: 2, 
      nome: 'Wefit Paulista', 
      endereco: 'Av. Paulista, 1000', 
      cidade: 'São Paulo', 
      uf: 'SP', 
      alunos: 620, 
      status: 'Ativa',
      cnpj: '12.345.678/0001-91',
      cep: '01310-200',
      telefone: '(11) 98888-8888',
      email: 'paulista@wefit.com',
      horarioFuncionamento: '06:00 às 22:00',
      capacidadeMaxima: 750
    },
    { 
      id: 3, 
      nome: 'Wefit Ipanema', 
      endereco: 'Rua Visconde, 500', 
      cidade: 'Rio de Janeiro', 
      uf: 'RJ', 
      alunos: 580, 
      status: 'Ativa',
      cnpj: '12.345.678/0001-92',
      cep: '22411-030',
      telefone: '(21) 97777-7777',
      email: 'ipanema@wefit.com',
      horarioFuncionamento: '06:00 às 22:00',
      capacidadeMaxima: 700
    },
    { 
      id: 4, 
      nome: 'Wefit Bela Vista', 
      endereco: 'Rua Augusta, 800', 
      cidade: 'São Paulo', 
      uf: 'SP', 
      alunos: 0, 
      status: 'Inativa',
      cnpj: '12.345.678/0001-93',
      cep: '01305-000',
      telefone: '(11) 96666-6666',
      email: 'belavista@wefit.com',
      horarioFuncionamento: '06:00 às 22:00',
      capacidadeMaxima: 600
    },
  ]);

  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroUF, setFiltroUF] = useState<string>('todos');
  const [busca, setBusca] = useState<string>('');
  const [modalAberto, setModalAberto] = useState(false);
  const [detalhesAberto, setDetalhesAberto] = useState(false);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<Unidade | null>(null);

  const form = useForm({
    defaultValues: {
      nome: '',
      cnpj: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      cep: '',
      telefone: '',
      email: '',
      horarioFuncionamento: '',
      capacidadeMaxima: '',
    },
  });

  const unidadesFiltradas = unidades.filter(unidade => {
    const matchStatus = filtroStatus === 'todos' || unidade.status === filtroStatus;
    const matchUF = filtroUF === 'todos' || unidade.uf === filtroUF;
    const matchBusca = !busca || unidade.nome.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchUF && matchBusca;
  });

  const handleSalvarUnidade = (data: any) => {
    console.log('Salvando unidade:', data);
    setModalAberto(false);
    form.reset();
  };

  const handleVisualizarDetalhes = (unidade: Unidade) => {
    setUnidadeSelecionada(unidade);
    setDetalhesAberto(true);
  };

  const handleVisualizarDashboard = (unidadeId: number) => {
    console.log('Visualizando dashboard da unidade:', unidadeId);
    // Simular navegação para dashboard específico da unidade
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Unidades</h1>
          <p className="text-gray-600 mt-2">Administração de todas as unidades da rede Wefit</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Building2 className="h-4 w-4 mr-2" />
            Metas por Região
          </Button>
        </div>
      </div>

      {/* KPIs das Unidades */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Unidades</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unidades.length}</div>
            <p className="text-xs text-muted-foreground">
              {unidades.filter(u => u.status === 'Ativa').length} ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unidades.reduce((acc, u) => acc + u.alunos, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Média: {Math.round(unidades.reduce((acc, u) => acc + u.alunos, 0) / unidades.filter(u => u.status === 'Ativa').length)} por unidade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unidades.reduce((acc, u) => acc + (u.capacidadeMaxima || 0), 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Taxa de ocupação: {Math.round((unidades.reduce((acc, u) => acc + u.alunos, 0) / unidades.reduce((acc, u) => acc + (u.capacidadeMaxima || 0), 0)) * 100)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Estimada</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.1M</div>
            <p className="text-xs text-muted-foreground">
              +12.5% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Unidades Cadastradas</CardTitle>
              <CardDescription>Gerencie todas as unidades da rede Wefit</CardDescription>
            </div>
            
            <Dialog open={modalAberto} onOpenChange={setModalAberto}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Nova Unidade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Unidade</DialogTitle>
                  <DialogDescription>
                    Preencha as informações da nova unidade da rede Wefit
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSalvarUnidade)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Unidade</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Wefit Centro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CNPJ</FormLabel>
                            <FormControl>
                              <Input placeholder="00.000.000/0000-00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="endereco"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input placeholder="Rua/Avenida" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="numero"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bairro"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input placeholder="Centro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="São Paulo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="uf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado (UF)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SP">SP</SelectItem>
                                <SelectItem value="RJ">RJ</SelectItem>
                                <SelectItem value="MG">MG</SelectItem>
                                <SelectItem value="PR">PR</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input placeholder="00000-000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone Principal</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email de Contato</FormLabel>
                            <FormControl>
                              <Input placeholder="contato@wefit.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="horarioFuncionamento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário de Funcionamento</FormLabel>
                            <FormControl>
                              <Input placeholder="06:00 às 22:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="capacidadeMaxima"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacidade Máxima de Alunos</FormLabel>
                            <FormControl>
                              <Input placeholder="500" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setModalAberto(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">Salvar Unidade</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome da unidade..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Ativa">Ativa</SelectItem>
                <SelectItem value="Inativa">Inativa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroUF} onValueChange={setFiltroUF}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="UF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="SP">SP</SelectItem>
                <SelectItem value="RJ">RJ</SelectItem>
                <SelectItem value="MG">MG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Unidade</TableHead>
                <TableHead>Endereço (Cidade/UF)</TableHead>
                <TableHead>Nº Alunos</TableHead>
                <TableHead>Taxa de Ocupação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unidadesFiltradas.map((unidade) => (
                <TableRow key={unidade.id}>
                  <TableCell className="font-medium">{unidade.nome}</TableCell>
                  <TableCell>{unidade.endereco}, {unidade.cidade}/{unidade.uf}</TableCell>
                  <TableCell>{unidade.alunos}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={unidade.capacidadeMaxima ? (unidade.alunos / unidade.capacidadeMaxima) * 100 : 0} 
                        className="w-16 h-2" 
                      />
                      <span className="text-xs">
                        {unidade.capacidadeMaxima ? Math.round((unidade.alunos / unidade.capacidadeMaxima) * 100) : 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={unidade.status === 'Ativa' ? 'default' : 'secondary'}>
                      {unidade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleVisualizarDetalhes(unidade)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleVisualizarDashboard(unidade.id)}>
                        <LayoutDashboard className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch defaultChecked={unidade.status === 'Ativa'} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Dialog open={detalhesAberto} onOpenChange={setDetalhesAberto}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Detalhes da Unidade: {unidadeSelecionada?.nome}
            </DialogTitle>
          </DialogHeader>
          {unidadeSelecionada && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Informações Gerais</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nome:</span> {unidadeSelecionada.nome}</p>
                    <p><span className="font-medium">CNPJ:</span> {unidadeSelecionada.cnpj}</p>
                    <p><span className="font-medium">Endereço:</span> {unidadeSelecionada.endereco}</p>
                    <p><span className="font-medium">Cidade/UF:</span> {unidadeSelecionada.cidade}/{unidadeSelecionada.uf}</p>
                    <p><span className="font-medium">CEP:</span> {unidadeSelecionada.cep}</p>
                    <p><span className="font-medium">Telefone:</span> {unidadeSelecionada.telefone}</p>
                    <p><span className="font-medium">Email:</span> {unidadeSelecionada.email}</p>
                    <p><span className="font-medium">Horário:</span> {unidadeSelecionada.horarioFuncionamento}</p>
                    <p><span className="font-medium">Status:</span> {unidadeSelecionada.status}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Métricas da Unidade</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Alunos Ativos</span>
                        <span>{unidadeSelecionada.alunos} / {unidadeSelecionada.capacidadeMaxima}</span>
                      </div>
                      <Progress 
                        value={unidadeSelecionada.capacidadeMaxima ? (unidadeSelecionada.alunos / unidadeSelecionada.capacidadeMaxima) * 100 : 0} 
                        className="h-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Taxa de Ocupação:</span>
                        <div className="text-lg font-bold text-wefit-primary">
                          {unidadeSelecionada.capacidadeMaxima ? Math.round((unidadeSelecionada.alunos / unidadeSelecionada.capacidadeMaxima) * 100) : 0}%
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Receita Mensal:</span>
                        <div className="text-lg font-bold text-green-600">R$ 168.000</div>
                      </div>
                      <div>
                        <span className="font-medium">NPS:</span>
                        <div className="text-lg font-bold text-blue-600">78</div>
                      </div>
                      <div>
                        <span className="font-medium">Crescimento MoM:</span>
                        <div className="text-lg font-bold text-green-600">+12.5%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Ações Rápidas</h3>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleVisualizarDashboard(unidadeSelecionada.id)}>
                    Ver Dashboard Completo
                  </Button>
                  <Button size="sm" variant="outline">
                    Configurar Metas
                  </Button>
                  <Button size="sm" variant="outline">
                    Relatórios da Unidade
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUnidades;
