import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, CreditCard, Star, TrendingUp, BarChart3, Plus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GestorDashboard: React.FC = () => {
  // Dados placeholder para os gráficos
  const frequenciaHorarioData = [
    { horario: '06:00', alunos: 25 },
    { horario: '07:00', alunos: 45 },
    { horario: '08:00', alunos: 38 },
    { horario: '09:00', alunos: 22 },
    { horario: '10:00', alunos: 15 },
    { horario: '18:00', alunos: 52 },
    { horario: '19:00', alunos: 48 },
    { horario: '20:00', alunos: 35 },
  ];

  const planosDistribuicaoData = [
    { name: 'Mensal', value: 40, color: '#5B2C6F' },
    { name: 'Trimestral', value: 30, color: '#7C3AED' },
    { name: 'Semestral', value: 20, color: '#A855F7' },
    { name: 'Anual', value: 10, color: '#C084FC' },
  ];

  const aulasLotacaoCritica = [
    { aula: 'Spinning das 18h', ocupacao: '19/20', status: 'critico' },
    { aula: 'Crossfit das 19h', ocupacao: '17/18', status: 'critico' },
    { aula: 'Yoga das 07h', ocupacao: '14/15', status: 'alerta' },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className='pt-5'>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard da Unidade: Wefit Centro</h1>
        <p className="text-gray-600 mt-2">Visão geral das operações e métricas da unidade</p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <p className="text-xs text-muted-foreground">+12 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 com lotação crítica</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.500</div>
            <p className="text-xs text-muted-foreground">23 alunos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">4.5</span>
              <div className="flex">{renderStars(4.5)}</div>
            </div>
            <p className="text-xs text-muted-foreground">89 avaliações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Aulas da semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Frequência por Horário (Hoje)
            </CardTitle>
            <CardDescription>Distribuição de alunos ao longo do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={frequenciaHorarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="horario" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alunos" fill="#5B2C6F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Plano</CardTitle>
            <CardDescription>Percentual de alunos por tipo de plano</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planosDistribuicaoData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {planosDistribuicaoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Aulas com Lotação Crítica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Aulas com Lotação Crítica</CardTitle>
            <CardDescription>Aulas que estão próximas da capacidade máxima</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aulasLotacaoCritica.map((aula, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div>
                    <span className="font-medium text-gray-900">{aula.aula}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-red-600">{aula.ocupacao}</span>
                    <p className="text-xs text-red-500">vagas ocupadas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso direto às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Novo Aluno
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Agendar Nova Aula
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Grade Completa
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Gerenciar Pagamentos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GestorDashboard;
