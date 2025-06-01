import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Download, 
  Send,
  Calendar,
  Filter
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Recebimento {
  id: number;
  data: string;
  aluno: string;
  descricao: string;
  valor: number;
  metodo: string;
  status: 'Pago' | 'Pendente';
}

interface Inadimplente {
  id: number;
  aluno: string;
  plano: string;
  valorDevido: number;
  diasAtraso: number;
  ultimoContato: string;
}

interface Despesa {
  id: number;
  data: string;
  descricao: string;
  valor: number;
  categoria: string;
}

const GestorFinanceiro: React.FC = () => {
  const [modalDespesaAberto, setModalDespesaAberto] = useState(false);
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [filtroMetodo, setFiltroMetodo] = useState('todos');

  const [recebimentos] = useState<Recebimento[]>([
    {
      id: 1,
      data: '29/05/2024',
      aluno: 'Ana Silva Santos',
      descricao: 'Plano Mensal Premium',
      valor: 129.90,
      metodo: 'Cartão de Crédito',
      status: 'Pago'
    },
    {
      id: 2,
      data: '28/05/2024',
      aluno: 'Carlos Eduardo Lima',
      descricao: 'Plano Trimestral Básico',
      valor: 239.90,
      metodo: 'PIX',
      status: 'Pago'
    },
    {
      id: 3,
      data: '27/05/2024',
      aluno: 'Mariana Costa',
      descricao: 'Plano Anual VIP',
      valor: 999.90,
      metodo: 'Boleto',
      status: 'Pendente'
    },
  ]);

  const [inadimplentes] = useState<Inadimplente[]>([
    {
      id: 1,
      aluno: 'Roberto Ferreira',
      plano: 'Mensal Básico',
      valorDevido: 89.90,
      diasAtraso: 15,
      ultimoContato: '20/05/2024'
    },
    {
      id: 2,
      aluno: 'Julia Santos',
      plano: 'Mensal Premium',
      valorDevido: 129.90,
      diasAtraso: 8,
      ultimoContato: '22/05/2024'
    },
    {
      id: 3,
      aluno: 'Pedro Oliveira',
      plano: 'Trimestral Básico',
      valorDevido: 239.90,
      diasAtraso: 22,
      ultimoContato: '15/05/2024'
    },
  ]);

  const [despesas] = useState<Despesa[]>([
    {
      id: 1,
      data: '25/05/2024',
      descricao: 'Manutenção Equipamentos',
      valor: 450.00,
      categoria: 'Manutenção'
    },
    {
      id: 2,
      data: '20/05/2024',
      descricao: 'Conta de Energia',
      valor: 1200.00,
      categoria: 'Utilidades'
    },
    {
      id: 3,
      data: '15/05/2024',
      descricao: 'Material de Limpeza',
      valor: 180.00,
      categoria: 'Limpeza'
    },
  ]);

  const faturamentoData = [
    { mes: 'Jan', valor: 25000 },
    { mes: 'Fev', valor: 28000 },
    { mes: 'Mar', valor: 26500 },
    { mes: 'Abr', valor: 31000 },
    { mes: 'Mai', valor: 34500 },
    { mes: 'Jun', valor: 32000 },
  ];

  const form = useForm({
    defaultValues: {
      data: '',
      descricao: '',
      valor: '',
      categoria: '',
    },
  });

  const receitaBrutaMes = 34500;
  const ticketMedio = 127.50;
  const totalInadimplente = inadimplentes.reduce((acc, item) => acc + item.valorDevido, 0);
  const numInadimplentes = inadimplentes.length;

  const handleSalvarDespesa = (data: any) => {
    console.log('Salvando despesa:', data);
    setModalDespesaAberto(false);
    form.reset();
  };

  const enviarLembrete = (inadimplente: Inadimplente) => {
    console.log('Enviando lembrete para:', inadimplente.aluno);
    // Simular envio de lembrete
  };

  const recebimentosFiltrados = recebimentos.filter(recebimento => {
    const matchMetodo = filtroMetodo === 'todos' || recebimento.metodo === filtroMetodo;
    // Aqui seria feita a filtragem por data também
    return matchMetodo;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financeiro da Unidade: Wefit Centro</h1>
        <p className="text-gray-600 mt-2">Gestão financeira e controle de pagamentos da unidade</p>
      </div>

      <Tabs defaultValue="faturamento" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
          <TabsTrigger value="inadimplencia">Inadimplência</TabsTrigger>
          <TabsTrigger value="despesas">Despesas</TabsTrigger>
        </TabsList>

        <TabsContent value="faturamento" className="space-y-6">
          {/* KPIs de Faturamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Bruta (Mês Atual)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {receitaBrutaMes.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio por Aluno</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {ticketMedio.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Mês atual</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Evolução do Faturamento */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Faturamento</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={faturamentoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Faturamento']}
                  />
                  <Line type="monotone" dataKey="valor" stroke="#5B2C6F" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela de Recebimentos Detalhados */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recebimentos Detalhados</CardTitle>
                  <CardDescription>Histórico de pagamentos recebidos</CardDescription>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtros */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Input
                    type="date"
                    placeholder="Data início"
                    value={filtroDataInicio}
                    onChange={(e) => setFiltroDataInicio(e.target.value)}
                  />
                  <span className="text-gray-500">até</span>
                  <Input
                    type="date"
                    placeholder="Data fim"
                    value={filtroDataFim}
                    onChange={(e) => setFiltroDataFim(e.target.value)}
                  />
                </div>
                <Select value={filtroMetodo} onValueChange={setFiltroMetodo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Boleto">Boleto</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Descrição/Plano</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recebimentosFiltrados.map((recebimento) => (
                    <TableRow key={recebimento.id}>
                      <TableCell>{recebimento.data}</TableCell>
                      <TableCell>{recebimento.aluno}</TableCell>
                      <TableCell>{recebimento.descricao}</TableCell>
                      <TableCell>R$ {recebimento.valor.toFixed(2)}</TableCell>
                      <TableCell>{recebimento.metodo}</TableCell>
                      <TableCell>
                        <Badge variant={recebimento.status === 'Pago' ? 'default' : 'secondary'}>
                          {recebimento.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inadimplencia" className="space-y-6">
          {/* KPIs de Inadimplência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inadimplente</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  R$ {totalInadimplente.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Valor total em atraso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nº Alunos Inadimplentes</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{numInadimplentes}</div>
                <p className="text-xs text-muted-foreground">Alunos com pendências</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Alunos com Pendências */}
          <Card>
            <CardHeader>
              <CardTitle>Alunos com Pendências</CardTitle>
              <CardDescription>Lista de alunos inadimplentes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Valor Devido</TableHead>
                    <TableHead>Dias em Atraso</TableHead>
                    <TableHead>Último Contato</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inadimplentes.map((inadimplente) => (
                    <TableRow key={inadimplente.id}>
                      <TableCell className="font-medium">{inadimplente.aluno}</TableCell>
                      <TableCell>{inadimplente.plano}</TableCell>
                      <TableCell>R$ {inadimplente.valorDevido.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={inadimplente.diasAtraso > 15 ? 'destructive' : 'secondary'}>
                          {inadimplente.diasAtraso} dias
                        </Badge>
                      </TableCell>
                      <TableCell>{inadimplente.ultimoContato}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => enviarLembrete(inadimplente)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Lembrete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="despesas" className="space-y-6">
          {/* Tabela de Despesas */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Despesas da Unidade</CardTitle>
                  <CardDescription>Controle de gastos operacionais</CardDescription>
                </div>
                <Button onClick={() => setModalDespesaAberto(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Despesa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Categoria</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {despesas.map((despesa) => (
                    <TableRow key={despesa.id}>
                      <TableCell>{despesa.data}</TableCell>
                      <TableCell>{despesa.descricao}</TableCell>
                      <TableCell>R$ {despesa.valor.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{despesa.categoria}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão de Exportar Relatórios */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Exportar Relatórios</h3>
              <p className="text-gray-600">Gere relatórios completos para análise externa</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Adicionar Despesa */}
      <Dialog open={modalDespesaAberto} onOpenChange={setModalDespesaAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Despesa</DialogTitle>
            <DialogDescription>
              Registre uma nova despesa operacional da unidade
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarDespesa)} className="space-y-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da Despesa</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                      <Input placeholder="Ex: Manutenção de equipamentos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input placeholder="0,00" type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                          <SelectItem value="manutencao">Manutenção</SelectItem>
                          <SelectItem value="utilidades">Utilidades</SelectItem>
                          <SelectItem value="limpeza">Limpeza</SelectItem>
                          <SelectItem value="equipamentos">Equipamentos</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="outras">Outras</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalDespesaAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Despesa
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorFinanceiro;
