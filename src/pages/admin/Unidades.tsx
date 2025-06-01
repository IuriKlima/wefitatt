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
import { Plus, Search, Edit, Eye, Building2 } from 'lucide-react';
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
    { id: 1, nome: 'Wefit Centro', endereco: 'Rua das Flores, 123', cidade: 'São Paulo', uf: 'SP', alunos: 450, status: 'Ativa' },
    { id: 2, nome: 'Wefit Paulista', endereco: 'Av. Paulista, 1000', cidade: 'São Paulo', uf: 'SP', alunos: 380, status: 'Ativa' },
    { id: 3, nome: 'Wefit Ipanema', endereco: 'Rua Visconde, 500', cidade: 'Rio de Janeiro', uf: 'RJ', alunos: 320, status: 'Ativa' },
    { id: 4, nome: 'Wefit Bela Vista', endereco: 'Rua Augusta, 800', cidade: 'São Paulo', uf: 'SP', alunos: 0, status: 'Inativa' },
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Unidades</h1>
        <p className="text-gray-600 mt-2">Administração de todas as unidades da rede</p>
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
                    <Badge variant={unidade.status === 'Ativa' ? 'default' : 'secondary'}>
                      {unidade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleVisualizarDetalhes(unidade)}>
                        <Eye className="h-4 w-4" />
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Detalhes da Unidade: {unidadeSelecionada?.nome}
            </DialogTitle>
          </DialogHeader>
          {unidadeSelecionada && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Informações Gerais</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nome:</span> {unidadeSelecionada.nome}</p>
                    <p><span className="font-medium">Endereço:</span> {unidadeSelecionada.endereco}</p>
                    <p><span className="font-medium">Cidade/UF:</span> {unidadeSelecionada.cidade}/{unidadeSelecionada.uf}</p>
                    <p><span className="font-medium">Status:</span> {unidadeSelecionada.status}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Métricas da Unidade</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Alunos Ativos:</span> {unidadeSelecionada.alunos}</p>
                    <p><span className="font-medium">Capacidade Máxima:</span> 500 alunos</p>
                    <p><span className="font-medium">Taxa de Ocupação:</span> {Math.round((unidadeSelecionada.alunos / 500) * 100)}%</p>
                    <p><span className="font-medium">Receita Mensal:</span> R$ 45.600,00</p>
                  </div>
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
