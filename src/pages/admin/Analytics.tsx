
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Building2, DollarSign, Calendar, Download } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [periodo, setPeriodo] = useState('mes');

  // Dados mock para os gráficos
  const receitaPorUnidade = [
    { unidade: 'Centro', receita: 45600, meta: 50000 },
    { unidade: 'Paulista', receita: 38200, meta: 40000 },
    { unidade: 'Ipanema', receita: 32400, meta: 35000 },
    { unidade: 'Bela Vista', receita: 15800, meta: 25000 },
  ];

  const evolucaoAlunos = [
    { mes: 'Jan', novos: 45, cancelamentos: 12, ativo: 1150 },
    { mes: 'Fev', novos: 52, cancelamentos: 8, ativo: 1194 },
    { mes: 'Mar', novos: 38, cancelamentos: 15, ativo: 1217 },
    { mes: 'Abr', novos: 67, cancelamentos: 10, ativo: 1274 },
    { mes: 'Mai', novos: 43, cancelamentos: 9, ativo: 1308 },
    { mes: 'Jun', novos: 58, cancelamentos: 11, ativo: 1355 },
  ];

  const distribuicaoIdade = [
    { faixa: '18-25', quantidade: 342, porcentagem: 25.2 },
    { faixa: '26-35', quantidade: 456, porcentagem: 33.6 },
    { faixa: '36-45', quantidade: 389, porcentagem: 28.7 },
    { faixa: '46-55', quantidade: 123, porcentagem: 9.1 },
    { faixa: '55+', quantidade: 45, porcentagem: 3.4 },
  ];

  const kpisRetencao = [
    { metrica: 'Taxa de Retenção (12 meses)', valor: '78.5%', tendencia: '+2.3%' },
    { metrica: 'Tempo Médio de Permanência', valor: '14.2 meses', tendencia: '+1.1' },
    { metrica: 'NPS Médio', valor: '8.4', tendencia: '+0.6' },
    { metrica: 'Taxa de Conversão Leads', valor: '23.8%', tendencia: '+4.2%' },
  ];

  const COLORS = ['#5B2C6F', '#7C3AED', '#A855F7', '#C084FC', '#E879F9'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Avançado</h1>
          <p className="text-gray-600 mt-2">Business Intelligence e indicadores estratégicos</p>
        </div>
        <div className="flex gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes">Este Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 132.000</div>
            <p className="text-xs text-green-600">+8.2% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.355</div>
            <p className="text-xs text-green-600">+47 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação Média</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.2%</div>
            <p className="text-xs text-yellow-600">-2.1% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média/Aluno</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8x</div>
            <p className="text-xs text-green-600">+0.3x por semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita por Unidade vs Meta</CardTitle>
            <CardDescription>Performance financeira de cada unidade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={receitaPorUnidade}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unidade" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Bar dataKey="receita" fill="#5B2C6F" name="Receita Atual" />
                <Bar dataKey="meta" fill="#A855F7" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução de Alunos</CardTitle>
            <CardDescription>Novos cadastros vs cancelamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolucaoAlunos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="novos" stroke="#22C55E" name="Novos Alunos" />
                <Line type="monotone" dataKey="cancelamentos" stroke="#EF4444" name="Cancelamentos" />
                <Line type="monotone" dataKey="ativo" stroke="#5B2C6F" name="Total Ativo" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Análise Demográfica e Retenção */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Faixa Etária</CardTitle>
            <CardDescription>Perfil demográfico dos alunos ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribuicaoIdade}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="quantidade"
                  label={({ faixa, porcentagem }) => `${faixa}: ${porcentagem}%`}
                >
                  {distribuicaoIdade.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>KPIs de Retenção</CardTitle>
            <CardDescription>Indicadores de satisfação e permanência</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpisRetencao.map((kpi, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{kpi.metrica}</p>
                    <p className="text-2xl font-bold text-purple-600">{kpi.valor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">{kpi.tendencia}</p>
                    <p className="text-xs text-gray-500">vs período anterior</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insights e Recomendações
          </CardTitle>
          <CardDescription>Análises automáticas baseadas nos dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800">Oportunidade Identificada</h3>
              <p className="text-sm text-green-700 mt-1">
                Unidade Paulista está 95% da meta. Com foco em retenção, pode superá-la em 15 dias.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800">Atenção Necessária</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Unidade Bela Vista com taxa de ocupação baixa. Considere campanhas promocionais.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800">Tendência Positiva</h3>
              <p className="text-sm text-blue-700 mt-1">
                Faixa etária 26-35 anos representa 33% dos alunos e tem maior retenção.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800">Previsão</h3>
              <p className="text-sm text-purple-700 mt-1">
                Com o crescimento atual, estimativa de 1.450 alunos ativos até dezembro.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
