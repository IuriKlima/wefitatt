
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Star,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  // Dados placeholder para gráficos
  const alunosEvolution = [
    { mes: 'Jun', alunos: 2450 },
    { mes: 'Jul', alunos: 2680 },
    { mes: 'Ago', alunos: 2890 },
    { mes: 'Set', alunos: 3120 },
    { mes: 'Out', alunos: 3350 },
    { mes: 'Nov', alunos: 3580 },
    { mes: 'Dez', alunos: 3780 }
  ];

  const mrrData = [
    { mes: 'Jun', mrr: 485000 },
    { mes: 'Jul', mrr: 512000 },
    { mes: 'Ago', mrr: 548000 },
    { mes: 'Set', mrr: 578000 },
    { mes: 'Out', mrr: 612000 },
    { mes: 'Nov', mrr: 645000 },
    { mes: 'Dez', mes: 'Dez', mrr: 678000 }
  ];

  const unidadesPerformance = [
    { nome: 'Wefit Centro', alunos: 680, receita: 168000, crescimento: 12.5 },
    { nome: 'Wefit Paulista', alunos: 620, receita: 155000, crescimento: 8.2 },
    { nome: 'Wefit Ipanema', alunos: 580, receita: 145000, crescimento: 15.1 },
    { nome: 'Wefit Vila Madalena', alunos: 420, receita: 105000, crescimento: -2.1 },
    { nome: 'Wefit Moema', alunos: 380, receita: 95000, crescimento: 5.8 }
  ];

  const alertas = [
    { id: 1, tipo: 'critico', titulo: 'Gateway de Pagamento Instável', descricao: 'Integração com PagSeguro apresentando falhas', tempo: '15 min' },
    { id: 2, tipo: 'warning', titulo: 'Backup Pendente', descricao: 'Backup diário ainda não foi executado', tempo: '2h' },
    { id: 3, tipo: 'info', titulo: 'Nova Versão Disponível', descricao: 'App móvel v2.1.5 aguardando aprovação', tempo: '4h' }
  ];

  const getAlertaColor = (tipo: string) => {
    switch (tipo) {
      case 'critico': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Administração Global - Wefit</h1>
        <p className="text-gray-600 mt-2">Visão completa da plataforma e performance das unidades</p>
      </div>

      {/* KPIs Globais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 novos neste mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.784</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +5.8% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR Global</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 678.000</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +5.1% crescimento mensal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Global</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74</div>
            <p className="text-xs text-muted-foreground">
              Média ponderada das unidades
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Avançadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LTV Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.450</div>
            <p className="text-xs text-muted-foreground">Lifetime Value por aluno</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CAC Global</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 125</div>
            <p className="text-xs text-muted-foreground">Custo de Aquisição</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +2.1% vs trimestre anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.947</div>
            <p className="text-xs text-muted-foreground">Todos os perfis</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Alunos Ativos (Últimos 7 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={alunosEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alunos" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita Recorrente Mensal (MRR)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mrrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'MRR']} />
                <Bar dataKey="mrr" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance das Unidades e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparativa de Unidades</CardTitle>
            <CardDescription>Top 5 unidades por performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unidadesPerformance.map((unidade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-wefit-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{unidade.nome}</div>
                      <div className="text-sm text-gray-500">{unidade.alunos} alunos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">R$ {unidade.receita.toLocaleString()}</div>
                    <div className={`text-sm flex items-center ${unidade.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {unidade.crescimento >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(unidade.crescimento)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Globais e Saúde do Sistema</CardTitle>
            <CardDescription>Monitoramento em tempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertas.map((alerta) => (
                <div key={alerta.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    alerta.tipo === 'critico' ? 'text-red-500' : 
                    alerta.tipo === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{alerta.titulo}</div>
                      <Badge variant={getAlertaColor(alerta.tipo) as any} className="text-xs">
                        {alerta.tempo}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{alerta.descricao}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
