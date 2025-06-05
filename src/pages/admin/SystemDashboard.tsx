
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  ArrowDown,
  Settings,
  Database,
  Server,
  Shield,
  Bell,
  BarChart3,
  UserCheck,
  CreditCard,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const SystemDashboard: React.FC = () => {
  // Dados de exemplo para o dashboard
  const systemMetrics = {
    totalUsers: 15247,
    activeUnits: 48,
    monthlyRevenue: 2450000,
    systemUptime: 99.8,
    activeSubscriptions: 12890,
    supportTickets: 23,
    apiCalls: 847000,
    storageUsed: 67
  };

  const revenueData = [
    { month: 'Jan', revenue: 1800000, growth: 5.2 },
    { month: 'Fev', revenue: 1950000, growth: 8.3 },
    { month: 'Mar', revenue: 2100000, growth: 7.7 },
    { month: 'Abr', revenue: 2200000, growth: 4.8 },
    { month: 'Mai', revenue: 2350000, growth: 6.8 },
    { month: 'Jun', revenue: 2450000, growth: 4.3 }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 12500, newUsers: 450 },
    { month: 'Fev', users: 13200, newUsers: 700 },
    { month: 'Mar', users: 13800, newUsers: 600 },
    { month: 'Abr', users: 14400, newUsers: 600 },
    { month: 'Mai', users: 14900, newUsers: 500 },
    { month: 'Jun', users: 15247, newUsers: 347 }
  ];

  const planDistribution = [
    { name: 'Personal', value: 35, color: '#8884d8', count: 5336 },
    { name: 'Academia', value: 45, color: '#82ca9d', count: 6863 },
    { name: 'Rede', value: 20, color: '#ffc658', count: 3048 }
  ];

  const topUnits = [
    { name: 'Wefit SP Centro', users: 1250, revenue: 385000, growth: 12.5, status: 'excellent' },
    { name: 'Wefit RJ Ipanema', users: 1180, revenue: 360000, growth: 8.7, status: 'good' },
    { name: 'Wefit SP Vila Madalena', users: 980, revenue: 298000, growth: 15.2, status: 'excellent' },
    { name: 'Wefit MG BH Centro', users: 890, revenue: 267000, growth: 5.3, status: 'good' },
    { name: 'Wefit PR Curitiba', users: 750, revenue: 225000, growth: -2.1, status: 'warning' }
  ];

  const systemAlerts = [
    { id: 1, type: 'critical', title: 'Alta Latência na API', description: 'Tempo de resposta acima de 2s nos últimos 15 min', time: '5 min', priority: 'high' },
    { id: 2, type: 'warning', title: 'Backup Pendente', description: 'Backup diário de 3 unidades não executado', time: '1h', priority: 'medium' },
    { id: 3, type: 'info', title: 'Atualização Disponível', description: 'Nova versão do sistema disponível v2.4.1', time: '2h', priority: 'low' },
    { id: 4, type: 'warning', title: 'Licenças Expirando', description: '5 licenças expiram em 7 dias', time: '4h', priority: 'medium' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Sistema - Wefit Global</h1>
        <p className="text-gray-600 mt-2">Visão completa do sistema e operações globais</p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +8.2% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeUnits}</div>
            <p className="text-xs text-muted-foreground">
              +3 novas este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(systemMetrics.monthlyRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +4.3% crescimento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime do Sistema</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Técnicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinaturas Ativas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeSubscriptions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">84.5% taxa de retenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets de Suporte</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.supportTickets}</div>
            <p className="text-xs text-muted-foreground">
              Tempo médio: 2.3h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chamadas de API</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(systemMetrics.apiCalls / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              Hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso de Armazenamento</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.storageUsed}%</div>
            <Progress value={systemMetrics.storageUsed} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
            <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`R$ ${(Number(value) / 1000000).toFixed(2)}M`, 'Receita']} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>Usuários totais e novos usuários por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#82ca9d" name="Total de Usuários" />
                <Bar dataKey="newUsers" fill="#8884d8" name="Novos Usuários" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição de Planos e Top Unidades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Plano</CardTitle>
            <CardDescription>Percentual de usuários por tipo de plano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {planDistribution.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                      <span className="text-sm font-medium">{plan.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{plan.value}%</div>
                      <div className="text-xs text-gray-500">{plan.count.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Unidades</CardTitle>
            <CardDescription>Unidades com melhor performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUnits.map((unit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{unit.name}</div>
                      <div className="text-sm text-gray-500">{unit.users} usuários</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">R$ {unit.revenue.toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(unit.status)}>
                        {unit.status}
                      </Badge>
                      <span className={`text-sm ${unit.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {unit.growth >= 0 ? '+' : ''}{unit.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas do Sistema e Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertas do Sistema
            </CardTitle>
            <CardDescription>Monitoramento em tempo real do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    alert.type === 'critical' ? 'text-red-500' : 
                    alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{alert.title}</div>
                      <Badge variant={getAlertColor(alert.type) as any} className="text-xs">
                        {alert.time}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{alert.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações de Administração</CardTitle>
            <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Usuários
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building2 className="h-4 w-4 mr-2" />
                Administrar Unidades
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Analytics Completo
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configurações do Sistema
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Logs de Segurança
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Backup e Recuperação
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemDashboard;
