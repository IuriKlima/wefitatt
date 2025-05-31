
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, Edit, Eye, CreditCard, Activity, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  plano: string;
  vencimento: string;
  statusPagamento: 'Adimplente' | 'Pendente' | 'Inadimplente';
  ultimoCheckin: string;
  foto?: string;
  matricula: string;
}

const GestorAlunos: React.FC = () => {
  const [alunos] = useState<Aluno[]>([
    {
      id: 1,
      nome: 'Ana Silva Santos',
      email: 'ana.silva@email.com',
      telefone: '(11) 99999-1234',
      plano: 'Mensal Premium',
      vencimento: '15/06/2024',
      statusPagamento: 'Adimplente',
      ultimoCheckin: '29/05/2024 08:30',
      matricula: 'WF001',
    },
    {
      id: 2,
      nome: 'Carlos Eduardo Lima',
      email: 'carlos.lima@email.com',
      telefone: '(11) 99999-5678',
      plano: 'Trimestral Básico',
      vencimento: '10/07/2024',
      statusPagamento: 'Pendente',
      ultimoCheckin: '27/05/2024 19:15',
      matricula: 'WF002',
    },
    {
      id: 3,
      nome: 'Mariana Costa Oliveira',
      email: 'mariana.costa@email.com',
      telefone: '(11) 99999-9012',
      plano: 'Anual VIP',
      vencimento: '20/12/2024',
      statusPagamento: 'Adimplente',
      ultimoCheckin: '29/05/2024 18:45',
      matricula: 'WF003',
    },
    {
      id: 4,
      nome: 'Roberto Ferreira',
      email: 'roberto.ferreira@email.com',
      telefone: '(11) 99999-3456',
      plano: 'Mensal Básico',
      vencimento: '05/06/2024',
      statusPagamento: 'Inadimplente',
      ultimoCheckin: '20/05/2024 07:00',
      matricula: 'WF004',
    },
  ]);

  const [filtroPlano, setFiltroPlano] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);
  const [modalPlanoAberto, setModalPlanoAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  const form = useForm({
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      endereco: '',
      cidade: '',
      cep: '',
      matricula: '',
      plano: '',
      observacoes: '',
    },
  });

  const alunosFiltrados = alunos.filter(aluno => {
    const matchPlano = !filtroPlano || aluno.plano.includes(filtroPlano);
    const matchStatus = !filtroStatus || aluno.statusPagamento === filtroStatus;
    const matchBusca = !busca || 
      aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
      aluno.email.toLowerCase().includes(busca.toLowerCase()) ||
      aluno.matricula.toLowerCase().includes(busca.toLowerCase());
    return matchPlano && matchStatus && matchBusca;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Adimplente': return 'default';
      case 'Pendente': return 'secondary';
      case 'Inadimplente': return 'destructive';
      default: return 'default';
    }
  };

  const handleSalvarAluno = (data: any) => {
    console.log('Salvando aluno:', data);
    setModalAberto(false);
    setModoEdicao(false);
    form.reset();
  };

  const handleVerPerfil = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setModalPerfilAberto(true);
  };

  const handleGerenciarPlano = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setModalPlanoAberto(true);
  };

  const handleEditarAluno = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setModoEdicao(true);
    form.setValue('nome', aluno.nome);
    form.setValue('email', aluno.email);
    form.setValue('telefone', aluno.telefone);
    form.setValue('matricula', aluno.matricula);
    setModalAberto(true);
  };

  const gerarMatricula = () => {
    const proximaMatricula = `WF${String(alunos.length + 1).padStart(3, '0')}`;
    form.setValue('matricula', proximaMatricula);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alunos da Unidade: Wefit Centro</h1>
        <p className="text-gray-600 mt-2">Gestão dos membros matriculados na unidade</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Lista de Alunos</CardTitle>
              <CardDescription>Gerencie os alunos matriculados nesta unidade</CardDescription>
            </div>
            
            <Button onClick={() => { setModoEdicao(false); form.reset(); setModalAberto(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Novo Aluno
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email ou matrícula..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroPlano} onValueChange={setFiltroPlano}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os planos</SelectItem>
                <SelectItem value="Mensal">Mensal</SelectItem>
                <SelectItem value="Trimestral">Trimestral</SelectItem>
                <SelectItem value="Anual">Anual</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Adimplente">Adimplente</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Inadimplente">Inadimplente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Plano Atual</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status Pagamento</TableHead>
                <TableHead>Último Check-in</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunosFiltrados.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={aluno.foto} />
                        <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{aluno.nome}</div>
                        <div className="text-sm text-gray-500">{aluno.email}</div>
                        <div className="text-xs text-gray-400">Mat: {aluno.matricula}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{aluno.plano}</TableCell>
                  <TableCell>{aluno.vencimento}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(aluno.statusPagamento) as any}>
                      {aluno.statusPagamento}
                    </Badge>
                  </TableCell>
                  <TableCell>{aluno.ultimoCheckin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleVerPerfil(aluno)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditarAluno(aluno)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleGerenciarPlano(aluno)}>
                        <CreditCard className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Activity className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Adicionar/Editar Aluno */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modoEdicao ? `Editar Aluno: ${alunoSelecionado?.nome}` : 'Adicionar Novo Aluno'}
            </DialogTitle>
            <DialogDescription>
              {modoEdicao ? 'Edite as informações do aluno' : 'Preencha as informações do novo aluno'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarAluno)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva Santos" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="joao.silva@email.com" type="email" {...field} />
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
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input placeholder="DD/MM/AAAA" type="date" {...field} />
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
                      <FormLabel>Endereço Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua das Flores, 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="01234-567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="matricula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        Número de Matrícula
                        {!modoEdicao && (
                          <Button type="button" variant="ghost" size="sm" onClick={gerarMatricula}>
                            Gerar Automático
                          </Button>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="WF001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plano"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plano Inicial</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o plano" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mensal-basico">Mensal Básico - R$ 89,90</SelectItem>
                          <SelectItem value="mensal-premium">Mensal Premium - R$ 129,90</SelectItem>
                          <SelectItem value="trimestral-basico">Trimestral Básico - R$ 239,90</SelectItem>
                          <SelectItem value="anual-vip">Anual VIP - R$ 999,90</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações Internas</FormLabel>
                    <FormControl>
                      <Input placeholder="Observações sobre o aluno..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {modoEdicao ? 'Atualizar Aluno' : 'Salvar Aluno'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Visualizar Perfil */}
      <Dialog open={modalPerfilAberto} onOpenChange={setModalPerfilAberto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perfil Completo: {alunoSelecionado?.nome}</DialogTitle>
            <DialogDescription>Visualização detalhada das informações do aluno</DialogDescription>
          </DialogHeader>
          {alunoSelecionado && (
            <div className="space-y-6">
              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Nome:</span>
                    <p className="text-sm">{alunoSelecionado.nome}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-sm">{alunoSelecionado.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Telefone:</span>
                    <p className="text-sm">{alunoSelecionado.telefone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Matrícula:</span>
                    <p className="text-sm">{alunoSelecionado.matricula}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico de Pagamentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Método</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15/05/2024</TableCell>
                        <TableCell>R$ 129,90</TableCell>
                        <TableCell><Badge variant="default">Pago</Badge></TableCell>
                        <TableCell>Cartão de Crédito</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15/04/2024</TableCell>
                        <TableCell>R$ 129,90</TableCell>
                        <TableCell><Badge variant="default">Pago</Badge></TableCell>
                        <TableCell>PIX</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Gerenciar Plano */}
      <Dialog open={modalPlanoAberto} onOpenChange={setModalPlanoAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerenciar Plano: {alunoSelecionado?.nome}</DialogTitle>
            <DialogDescription>Opções para o plano atual do aluno</DialogDescription>
          </DialogHeader>
          {alunoSelecionado && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">Plano Atual</h4>
                <p className="text-sm text-gray-600">{alunoSelecionado.plano}</p>
                <p className="text-sm text-gray-600">Vencimento: {alunoSelecionado.vencimento}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Renovar Plano</Button>
                <Button variant="outline">Mudar de Plano</Button>
                <Button variant="outline">Trancar Plano</Button>
                <Button variant="outline">Cancelar Plano</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorAlunos;
