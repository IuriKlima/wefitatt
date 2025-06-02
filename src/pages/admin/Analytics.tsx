
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Filter,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminAnalytics: React.FC = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('ultimos-6-meses');
  const [regiaoSelecionada, setRegiaoSelecionada] = useState('todas');

  // Dados placeholder para análises
  const cohortData = [
    { mes: 'Jan', mes0: 100, mes1: 85, mes2: 75, mes3: 68, mes4: 62, mes5: 58, mes6: 55 },
    { mes: 'Fev', mes0: 100, mes1: 88, mes2: 78, mes3: 71, mes4: 65, mes5: 61 },
    { mes: 'Mar', mes0: 100, mes1: 90, mes2: 82, mes3: 75, mes4: 70 },
    { mes: 'Abr', mes0: 100, mes1: 87, mes2: 79, mes3: 73 },
    { mes: 'Mai', mes0: 100, mes1: 92, mes2: 84 },
    { mes: 'Jun', mes0: 100, mes1: 89 }
  ];

  const funnelData = [
    { stage: 'Leads Gerados', valor: 12500, taxa: 100 },
    { stage: 'Visitantes na Unidade', valor: 4200, taxa: 33.6 },
    { stage: 'Conversas de Vendas', valor: 2800, taxa: 22.4 },
    { stage: 'Propostas Enviadas', valor: 1800, taxa: 14.4 },
    { stage: 'Matrículas Efetivadas', valor: 980, taxa: 7.8 }
  ];

  const churnAnalysis = [
    { motivo: 'Preço Alto', porcentagem: 28, count: 156 },
    { motivo: 'Mudança de Cidade', porcentagem: 22, count: 122 },
    { motivo: 'Falta de Tempo', porcentagem: 18, count: 100 },
    { motivo: 'Insatisfação com Serviço', porcentagem: 15, count: 83 },
    { motivo: 'Problemas de Saúde', porcentagem: 10, count: 56 },
    { motivo: 'Outros', porcentagem: 7, count: 39 }
  ];

  const healthMetrics = [
    { periodo: 'Jan', mrr: 580000, churn_receita: 2.1, cac: 118, ltv_cac: 20.8 },
    { periodo: 'Fev', mrr: 612000, churn_receita: 1.8, cac: 122, ltv_cac: 20.1 },
    { periodo: 'Mar', mrr: 645000, churn_receita: 2.3, cac: 125, ltv_cac: 19.6 },
    { periodo: 'Abr', mrr: 668000, churn_receita: 1.9, cac: 121, ltv_cac: 20.2 },
    { periodo: 'Mai', mrr: 692000, churn_receita: 1.7, cac: 119, ltv_cac: 20.6 },
    { periodo: 'Jun', mrr: 718000, churn_receita: 1.5, cac: 115, ltv_cac: 21.3 }
  ];

  const unidadeComparison = [
    { unidade: 'Wefit Centro', alunos: 680, receita: 168000, retencao: 89.2, nps: 78, crescimento: 12.5, ticket_medio: 247 },
    { unidade: 'Wefit Paulista', alunos: 620, receita: 155000, retencao: 87.8, nps: 76, crescimento: 8.2, ticket_medio: 250 },
    { unidade: 'Wefit Ipanema', alunos: 580, receita: 145000, retencao: 91.1, nps: 82, crescimento: 15.1, ticket_medio: 250 },
    { unidade: 'Wefit Vila Madalena', alunos: 420, receita: 105000, retencao: 82.3, nps: 68, crescimento: -2.1, ticket_medio: 250 },
    { unidade: 'Wefit Moema', alunos: 380, receita: 95000, retencao: 85.7, nps: 71, crescimento: 5.8, ticket_medio: 250 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wefit Intelligence - Análises Avançadas</h1>
          <p className="text-gray-600 mt-2">Dashboard interativo com análises profundas da plataforma</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatórios
        </Button>
      </div>

      {/* Filtros Globais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultimo-mes">Último Mês</SelectItem>
                  <SelectItem value="ultimo-trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ultimos-6-meses">Últimos 6 Meses</SelectItem>
                  <SelectItem value="ultimo-ano">Último Ano</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Região</label>
              <Select value={regiaoSelecionada} onValueChange={setRegiaoSelecionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Regiões</SelectItem>
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Unidade</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="propria">Própria</SelectItem>
                  <SelectItem value="franquia">Franquia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Canal de Aquisição</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="organico">Orgânico</SelectItem>
                  <SelectItem value="pago">Mídia Paga</SelectItem>
                  <SelectItem value="indicacao">Indicação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Consolidada de Unidades */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Consolidada de Unidades</CardTitle>
          <CardDescription>Comparativo detalhado entre todas as unidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Unidade</th>
                  <th className="text-center p-2">Alunos</th>
                  <th className="text-center p-2">Receita (R$)</th>
                  <th className="text-center p-2">Retenção (%)</th>
                  <th className="text-center p-2">NPS</th>
                  <th className="text-center p-2">Crescimento (%)</th>
                  <th className="text-center p-2">Ticket Médio</th>
                </tr>
              </thead>
              <tbody>
                {unidadeComparison.map((unidade, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{unidade.unidade}</td>
                    <td className="p-2 text-center">{unidade.alunos}</td>
                    <td className="p-2 text-center">R$ {unidade.receita.toLocaleString()}</td>
                    <td className="p-2 text-center">{unidade.retencao}%</td>
                    <td className="p-2 text-center">
                      <Badge variant={unidade.nps >= 70 ? 'default' : unidade.nps >= 50 ? 'secondary' : 'destructive'}>
                        {unidade.nps}
                      </Badge>
                    </td>
                    <td className="p-2 text-center">
                      <span className={`flex items-center justify-center ${unidade.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {unidade.crescimento >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {Math.abs(unidade.crescimento)}%
                      </span>
                    </td>
                    <td className="p-2 text-center">R$ {unidade.ticket_medio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Análise de Coortes e Funil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análise de Coortes - Retenção de Alunos</CardTitle>
            <CardDescription>Retenção por mês de entrada (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="mes0" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
                <Area type="monotone" dataKey="mes1" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                <Area type="monotone" dataKey="mes3" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.1} />
                <Area type="monotone" dataKey="mes6" stackId="1" stroke="#ff7300" fill="#ff7300" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funil de Conversão Global</CardTitle>
            <CardDescription>Do lead até a matrícula efetivada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-gray-600">{stage.taxa}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-wefit-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${stage.taxa}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{stage.valor.toLocaleString()} pessoas</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise de Churn e Saúde Financeira */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análise de Churn - Motivos de Cancelamento</CardTitle>
            <CardDescription>Principais razões para cancelamento</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={churnAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ motivo, porcentagem }) => `${motivo}: ${porcentagem}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="porcentagem"
                >
                  {churnAnalysis.map((entry, index) => (
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
            <CardTitle>Saúde Financeira da Plataforma</CardTitle>
            <CardDescription>MRR, Churn de Receita e LTV/CAC</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#8884d8" strokeWidth={2} name="MRR (R$)" />
                <Line yAxisId="right" type="monotone" dataKey="ltv_cac" stroke="#82ca9d" strokeWidth={2} name="LTV/CAC Ratio" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
