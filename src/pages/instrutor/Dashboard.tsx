
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageCircle, 
  Target, 
  Plus, 
  BookOpen, 
  Activity,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const InstrutorDashboard: React.FC = () => {
  const nomeInstrutor = "Carlos Silva";
  
  const proximasAulas = [
    {
      id: 1,
      nome: 'Yoga Matinal',
      horario: '07:00 - 08:00',
      inscritos: 18,
      capacidade: 20,
      sala: 'Sala 1'
    },
    {
      id: 2,
      nome: 'CrossFit Intenso',
      horario: '18:30 - 19:30',
      inscritos: 15,
      capacidade: 15,
      sala: 'Box CrossFit'
    },
    {
      id: 3,
      nome: 'Pilates Intermediário',
      horario: '20:00 - 21:00',
      inscritos: 8,
      capacidade: 12,
      sala: 'Sala 2'
    }
  ];

  const alunosAtencao = [
    {
      id: 1,
      nome: 'Maria Santos',
      foto: '/placeholder.svg',
      motivo: 'Baixa frequência - apenas 1 treino na semana',
      tipo: 'frequency',
      urgencia: 'alta'
    },
    {
      id: 2,
      nome: 'João Costa',
      foto: '/placeholder.svg',
      motivo: '3 mensagens não lidas no chat',
      tipo: 'message',
      urgencia: 'media'
    },
    {
      id: 3,
      nome: 'Ana Lima',
      foto: '/placeholder.svg',
      motivo: 'Meta de peso próxima (95% concluída)',
      tipo: 'goal',
      urgencia: 'baixa'
    }
  ];

  const estatisticasRapidas = {
    aulasSemana: 12,
    alunosAtivos: 35,
    avaliacoesPendentes: 3,
    mensagensNaoLidas: 5
  };

  const atividadesRecentes = [
    { id: 1, tipo: 'novo_aluno', descricao: 'Pedro Oliveira foi atribuído para acompanhamento', tempo: '2h atrás' },
    { id: 2, tipo: 'progresso', descricao: 'Maria Silva atingiu sua meta de frequência semanal', tempo: '5h atrás' },
    { id: 3, tipo: 'feedback', descricao: 'Recebeu avaliação 5 estrelas na aula de Yoga', tempo: '1 dia atrás' }
  ];

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'border-red-200 bg-red-50';
      case 'media': return 'border-yellow-200 bg-yellow-50';
      case 'baixa': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'frequency': return <Activity className="h-4 w-4 text-red-500" />;
      case 'message': return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'goal': return <Target className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header de Boas-vindas */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Olá, Instrutor {nomeInstrutor}!</h1>
          <p className="text-gray-600 mt-2">Aqui está sua visão geral do dia e atividades importantes</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Hoje</div>
          <div className="text-2xl font-bold text-blue-600">{new Date().toLocaleDateString('pt-BR')}</div>
        </div>
      </div>

      {/* Cards de Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticasRapidas.aulasSemana}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticasRapidas.alunosAtivos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticasRapidas.avaliacoesPendentes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticasRapidas.mensagensNaoLidas}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Minha Agenda Hoje */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Minha Agenda Hoje
            </CardTitle>
            <CardDescription>Próximas aulas e sessões agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximasAulas.map((aula) => (
                <div key={aula.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium">{aula.nome}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {aula.horario}
                      <span>•</span>
                      <span>{aula.sala}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm">
                      <div className="font-medium">{aula.inscritos}/{aula.capacidade}</div>
                      <div className="text-gray-500">inscritos</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button className="w-full" variant="outline">
                Ver Agenda Completa
              </Button>
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
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Plano de Treino
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Biblioteca de Exercícios
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ver Mensagens
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Alunos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alunos que Requerem Atenção */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Alunos que Requerem Atenção
            </CardTitle>
            <CardDescription>Situações que precisam do seu acompanhamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alunosAtencao.map((aluno) => (
                <div key={aluno.id} className={`p-3 border rounded-lg ${getUrgenciaColor(aluno.urgencia)}`}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={aluno.foto} />
                      <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{aluno.nome}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        {getTipoIcon(aluno.tipo)}
                        {aluno.motivo}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Atualizações sobre seus alunos e aulas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atividadesRecentes.map((atividade) => (
                <div key={atividade.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm">{atividade.descricao}</div>
                    <div className="text-xs text-gray-500">{atividade.tempo}</div>
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

export default InstrutorDashboard;
