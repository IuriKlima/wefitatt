
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Calendar, 
  Users, 
  CreditCard, 
  UserPlus, 
  Activity,
  ShoppingCart,
  ClipboardList,
  Clock,
  Gift,
  UserX,
  CalendarX
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertaProativo {
  id: number;
  tipo: 'pagamento' | 'aniversario' | 'ausencia' | 'aula_baixa' | 'pendencia';
  titulo: string;
  descricao: string;
  prioridade: 'alta' | 'media' | 'baixa';
  dados: any;
}

const RecepcionistaDashboard: React.FC = () => {
  const navigate = useNavigate();

  const alertas: AlertaProativo[] = [
    {
      id: 1,
      tipo: 'pagamento',
      titulo: 'Pagamentos Vencendo Hoje',
      descricao: '5 alunos com pagamento vencendo hoje',
      prioridade: 'alta',
      dados: [
        { nome: 'Maria Silva', plano: 'Premium', vencimento: '01/06/2025' },
        { nome: 'João Santos', plano: 'Básico', vencimento: '01/06/2025' },
        { nome: 'Ana Costa', plano: 'Premium', vencimento: '01/06/2025' },
        { nome: 'Pedro Lima', plano: 'Básico', vencimento: '01/06/2025' },
        { nome: 'Carla Oliveira', plano: 'Premium', vencimento: '01/06/2025' }
      ]
    },
    {
      id: 2,
      tipo: 'aniversario',
      titulo: 'Aniversariantes da Semana',
      descricao: '3 alunos fazem aniversário esta semana',
      prioridade: 'media',
      dados: [
        { nome: 'Lucas Ferreira', dataNasc: '03/06/1995' },
        { nome: 'Juliana Rocha', dataNasc: '05/06/1988' },
        { nome: 'Roberto Alves', dataNasc: '07/06/1992' }
      ]
    },
    {
      id: 3,
      tipo: 'ausencia',
      titulo: 'Alunos Ausentes',
      descricao: '4 alunos sem check-in há mais de 15 dias',
      prioridade: 'media',
      dados: [
        { nome: 'Felipe Martins', ultimoCheckin: '15/05/2025' },
        { nome: 'Renata Souza', ultimoCheckin: '10/05/2025' },
        { nome: 'Diego Castro', ultimoCheckin: '08/05/2025' },
        { nome: 'Patricia Reis', ultimoCheckin: '05/05/2025' }
      ]
    },
    {
      id: 4,
      tipo: 'aula_baixa',
      titulo: 'Aulas com Baixa Lotação',
      descricao: '2 aulas hoje com menos de 50% de ocupação',
      prioridade: 'baixa',
      dados: [
        { nome: 'Spinning', horario: '18:00', ocupacao: '3/15' },
        { nome: 'Pilates', horario: '20:00', ocupacao: '4/12' }
      ]
    },
    {
      id: 5,
      tipo: 'pendencia',
      titulo: 'Pendências Urgentes',
      descricao: '2 contratos aguardando assinatura',
      prioridade: 'alta',
      dados: [
        { descricao: 'Contrato de Marcos Pereira precisa de assinatura' },
        { descricao: 'Documentação de Fernanda Lima está incompleta' }
      ]
    }
  ];

  const estatisticas = {
    checkins_hoje: 47,
    novos_cadastros: 3,
    vendas_hoje: 12,
    aulas_agendadas: 23
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'border-red-500 bg-red-50';
      case 'media': return 'border-yellow-500 bg-yellow-50';
      case 'baixa': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'pagamento': return CreditCard;
      case 'aniversario': return Gift;
      case 'ausencia': return UserX;
      case 'aula_baixa': return CalendarX;
      case 'pendencia': return AlertTriangle;
      default: return ClipboardList;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel da Recepção - Wefit</h1>
          <p className="text-gray-600 mt-2">Sua central de comando para atendimento de excelência</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Último update</p>
          <p className="text-lg font-semibold">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-ins Hoje</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estatisticas.checkins_hoje}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Cadastros</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estatisticas.novos_cadastros}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{estatisticas.vendas_hoje}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estatisticas.aulas_agendadas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesso direto às funções mais utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button 
              className="h-20 flex flex-col gap-2" 
              onClick={() => navigate('/recepcionista/checkin')}
            >
              <Activity className="h-6 w-6" />
              <span className="text-xs">Check-in/Out</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/recepcionista/cadastro')}
            >
              <UserPlus className="h-6 w-6" />
              <span className="text-xs">Cadastro Rápido</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/recepcionista/agendamentos')}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Agendar Aula</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/recepcionista/pos')}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xs">POS Vendas</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/recepcionista/ocorrencias')}
            >
              <ClipboardList className="h-6 w-6" />
              <span className="text-xs">Registrar Ocorrência</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alertas Proativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertas Proativos
          </CardTitle>
          <CardDescription>Mantenha-se sempre à frente das necessidades dos alunos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta) => {
              const IconComponent = getTipoIcon(alerta.tipo);
              return (
                <div
                  key={alerta.id}
                  className={`p-4 border-l-4 rounded-lg ${getPrioridadeColor(alerta.prioridade)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className="h-5 w-5 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{alerta.titulo}</h3>
                          <Badge variant="outline">
                            {alerta.prioridade.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alerta.descricao}</p>
                        
                        {/* Dados específicos por tipo de alerta */}
                        <div className="space-y-1">
                          {alerta.dados.slice(0, 3).map((item: any, index: number) => (
                            <div key={index} className="text-xs bg-white p-2 rounded border">
                              {alerta.tipo === 'pagamento' && (
                                <span>{item.nome} - {item.plano} - Vence: {item.vencimento}</span>
                              )}
                              {alerta.tipo === 'aniversario' && (
                                <span>{item.nome} - {item.dataNasc}</span>
                              )}
                              {alerta.tipo === 'ausencia' && (
                                <span>{item.nome} - Último check-in: {item.ultimoCheckin}</span>
                              )}
                              {alerta.tipo === 'aula_baixa' && (
                                <span>{item.nome} - {item.horario} - {item.ocupacao}</span>
                              )}
                              {alerta.tipo === 'pendencia' && (
                                <span>{item.descricao}</span>
                              )}
                            </div>
                          ))}
                          {alerta.dados.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{alerta.dados.length - 3} itens adicionais
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      Ver Todos
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Últimas Atividades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Últimas Atividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-sm">Check-in de Maria Silva às 14:32</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
              <UserPlus className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Novo cadastro: João Oliveira às 14:15</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
              <ShoppingCart className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Venda de R$ 45,00 para Ana Costa às 14:05</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-orange-50 rounded">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span className="text-sm">Agendamento de Spinning para Pedro Lima às 13:50</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecepcionistaDashboard;
