import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, UserCheck, DollarSign, TrendingUp, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const AdminDashboard: React.FC = () => {
  // Dados placeholder para os gráficos
  const crescimentoData = [
    { mes: 'Jan', novosAlunos: 150 },
    { mes: 'Fev', novosAlunos: 230 },
    { mes: 'Mar', novosAlunos: 180 },
    { mes: 'Abr', novosAlunos: 290 },
    { mes: 'Mai', novosAlunos: 350 },
    { mes: 'Jun', novosAlunos: 420 },
  ];

  const planosData = [
    { name: 'Mensal', value: 45, color: '#5B2C6F' },
    { name: 'Trimestral', value: 30, color: '#7C3AED' },
    { name: 'Semestral', value: 15, color: '#E5E7EB' },
    { name: 'Anual', value: 10, color: '#9CA3AF' },
  ];

  const atividadesRecentes = [
    { id: 1, acao: 'Nova unidade "Wefit Paulista" cadastrada', data: '29/05/2024' },
    { id: 2, acao: 'Pico de 50 novos alunos registrados', data: '28/05/2024' },
    { id: 3, acao: 'Sistema atualizado para v2.1.0', data: '27/05/2024' },
    { id: 4, acao: 'Backup automático realizado com sucesso', data: '26/05/2024' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Administrador</h1>
        <p className="text-gray-600 mt-2">Visão geral de todas as unidades e métricas do sistema</p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Unidades em operação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.345</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários do Sistema</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Admin/Gestor/Instrutor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 120.500</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Crescimento de Novos Alunos
            </CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={crescimentoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="novosAlunos" fill="#5B2C6F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribuição por Tipo de Plano
            </CardTitle>
            <CardDescription>Percentual de alunos por plano</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={planosData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {planosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes no Sistema</CardTitle>
          <CardDescription>Últimas ações administrativas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atividadesRecentes.map((atividade) => (
              <div key={atividade.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-900">{atividade.acao}</span>
                <span className="text-xs text-gray-500">{atividade.data}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
