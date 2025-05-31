
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, DollarSign, Download, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminRelatorios: React.FC = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('6meses');
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('todas');

  // Dados placeholder para os gráficos
  const receitaData = [
    { mes: 'Jan', receita: 85000, meta: 80000 },
    { mes: 'Fev', receita: 92000, meta: 85000 },
    { mes: 'Mar', receita: 88000, meta: 85000 },
    { mes: 'Abr', receita: 105000, meta: 90000 },
    { mes: 'Mai', receita: 120500, meta: 95000 },
    { mes: 'Jun', receita: 118000, meta: 95000 },
  ];

  const alunosData = [
    { mes: 'Jan', novos: 150, cancelados: 45, total: 2100 },
    { mes: 'Fev', novos: 230, cancelados: 52, total: 2278 },
    { mes: 'Mar', novos: 180, cancelados: 38, total: 2420 },
    { mes: 'Abr', novos: 290, cancelados: 65, total: 2645 },
    { mes: 'Mai', novos: 350, cancelados: 78, total: 2917 },
    { mes: 'Jun', novos: 420, cancelados: 92, total: 3245 },
  ];

  const unidadesPerformance = [
    { unidade: 'Wefit Centro', receita: 35000, alunos: 450, ocupacao: 90 },
    { unidade: 'Wefit Paulista', receita: 32000, alunos: 380, ocupacao: 76 },
    { unidade: 'Wefit Ipanema', receita: 28000, alunos: 320, ocupacao: 64 },
    { unidade: 'Wefit Vila Madalena', receita: 25000, alunos: 290, ocupacao: 58 },
  ];

  const planosDistribuicao = [
    { name: 'Mensal', value: 1461, color: '#5B2C6F' },
    { name: 'Trimestral', value: 973, color: '#7C3AED' },
    { name: 'Semestral', value: 487, color: '#A855F7' },
    { name: 'Anual', value: 324, color: '#C084FC' },
  ];

  const retencaoData = [
    { periodo: '1-3 meses', taxa: 85 },
    { periodo: '4-6 meses', taxa: 72 },
    { periodo: '7-12 meses', taxa: 65 },
    { periodo: '1-2 anos', taxa: 58 },
    { periodo: '2+ anos', taxa: 45 },
  ];

  const handleExportarRelatorio = (tipo: string) => {
    console.log(`Exportando relatório: ${tipo}`);
    // Aqui seria implementada a lógica de exportação
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios Globais</h1>
        <p className="text-gray-600 mt-2">Relatórios e análises de todas as unidades</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                <SelectItem value="6meses">Últimos 6 meses</SelectItem>
                <SelectItem value="12meses">Último ano</SelectItem>
                <SelectItem value="24meses">Últimos 2 anos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as unidades</SelectItem>
                <SelectItem value="centro">Wefit Centro</SelectItem>
                <SelectItem value="paulista">Wefit Paulista</SelectItem>
                <SelectItem value="ipanema">Wefit Ipanema</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="financeiro" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="alunos">Alunos</TabsTrigger>
          <TabsTrigger value="unidades">Unidades</TabsTrigger>
          <TabsTrigger value="retencao">Retenção</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro">
          <div className="space-y-6">
            {/* Cards de Métricas Financeiras */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 609.500</div>
                  <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 118.000</div>
                  <p className="text-xs text-green-600">+12% vs mês anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 156</div>
                  <p className="text-xs text-muted-foreground">Por aluno/mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+24%</div>
                  <p className="text-xs text-muted-foreground">Crescimento anual</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Receita */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Receita vs Meta</CardTitle>
                <CardDescription>Comparação entre receita realizada e meta estabelecida</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={receitaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
                    <Area 
                      type="monotone" 
                      dataKey="receita" 
                      stackId="1" 
                      stroke="#5B2C6F" 
                      fill="#5B2C6F" 
                      fillOpacity={0.8}
                      name="Receita"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="meta" 
                      stroke="#E5E7EB" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Meta"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alunos">
          <div className="space-y-6">
            {/* Cards de Métricas de Alunos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.245</div>
                  <p className="text-xs text-muted-foreground">Alunos ativos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Novos Alunos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">420</div>
                  <p className="text-xs text-green-600">Este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Cancelamento</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.8%</div>
                  <p className="text-xs text-muted-foreground">Mensal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crescimento Líquido</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+328</div>
                  <p className="text-xs text-green-600">Este mês</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Evolução de Alunos */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução da Base de Alunos</CardTitle>
                  <CardDescription>Novos alunos vs cancelamentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={alunosData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="novos" fill="#5B2C6F" name="Novos" />
                      <Bar dataKey="cancelados" fill="#E5E7EB" name="Cancelados" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Distribuição por Planos */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo de Plano</CardTitle>
                  <CardDescription>Quantidade de alunos por plano</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={planosDistribuicao}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {planosDistribuicao.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="unidades">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Unidade</CardTitle>
                <CardDescription>Comparativo de receita, alunos e taxa de ocupação</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={unidadesPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="unidade" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="receita" fill="#5B2C6F" name="Receita (R$)" />
                    <Bar yAxisId="right" dataKey="alunos" fill="#7C3AED" name="Alunos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {unidadesPerformance.map((unidade, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{unidade.unidade}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Receita:</span>
                      <span className="font-semibold">R$ {unidade.receita.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Alunos:</span>
                      <span className="font-semibold">{unidade.alunos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ocupação:</span>
                      <span className="font-semibold">{unidade.ocupacao}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="retencao">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Retenção por Período</CardTitle>
                <CardDescription>Percentual de alunos que permanecem ativos por tempo de permanência</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={retencaoData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="periodo" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Retenção']} />
                    <Bar dataKey="taxa" fill="#5B2C6F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Retenção Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">68%</div>
                  <p className="text-sm text-gray-600">Taxa média de retenção</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tempo Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">14 meses</div>
                  <p className="text-sm text-gray-600">Permanência média dos alunos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">R$ 2.184</div>
                  <p className="text-sm text-gray-600">Valor médio por aluno</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRelatorios;
