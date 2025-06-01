
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, CheckCircle, XCircle, Settings, Filter, Bell } from 'lucide-react';

interface Alerta {
  id: number;
  tipo: 'equipamento' | 'cliente' | 'pagamento' | 'agendamento' | 'sistema';
  prioridade: 'alta' | 'media' | 'baixa';
  titulo: string;
  descricao: string;
  timestamp: Date;
  status: 'ativo' | 'resolvido' | 'ignorado';
  responsavel?: string;
}

const RecepcionistaAlertas: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('ativo');

  const alertas: Alerta[] = [
    {
      id: 1,
      tipo: 'equipamento',
      prioridade: 'alta',
      titulo: 'Esteira 03 - Problema Reportado',
      descricao: 'Cliente relatou ruído estranho e velocidade instável',
      timestamp: new Date(Date.now() - 900000), // 15 min atrás
      status: 'ativo'
    },
    {
      id: 2,
      tipo: 'cliente',
      prioridade: 'alta',
      titulo: 'Cliente Aguardando - Check-in Pendente',
      descricao: 'Maria Silva (ID: 1234) está há 20 min aguardando liberação',
      timestamp: new Date(Date.now() - 1200000), // 20 min atrás
      status: 'ativo'
    },
    {
      id: 3,
      tipo: 'pagamento',
      prioridade: 'media',
      titulo: 'Pagamento em Atraso',
      descricao: 'João Santos - Mensalidade vencida há 5 dias',
      timestamp: new Date(Date.now() - 1800000), // 30 min atrás
      status: 'ativo'
    },
    {
      id: 4,
      tipo: 'agendamento',
      prioridade: 'baixa',
      titulo: 'Aula com Baixa Ocupação',
      descricao: 'Spinning 18h - Apenas 3 de 15 vagas preenchidas',
      timestamp: new Date(Date.now() - 2400000), // 40 min atrás
      status: 'ativo'
    },
    {
      id: 5,
      tipo: 'sistema',
      prioridade: 'media',
      titulo: 'Backup Automático',
      descricao: 'Backup diário concluído com sucesso',
      timestamp: new Date(Date.now() - 3600000), // 1h atrás
      status: 'resolvido'
    },
    {
      id: 6,
      tipo: 'equipamento',
      prioridade: 'alta',
      titulo: 'Ar Condicionado - Sala 2',
      descricao: 'Temperatura alta detectada (28°C)',
      timestamp: new Date(Date.now() - 4500000), // 1h15 atrás
      status: 'resolvido',
      responsavel: 'Técnico João'
    }
  ];

  const alertasFiltrados = alertas.filter(alerta => {
    const matchTipo = filtroTipo === 'todos' || alerta.tipo === filtroTipo;
    const matchPrioridade = filtroPrioridade === 'todos' || alerta.prioridade === filtroPrioridade;
    const matchStatus = filtroStatus === 'todos' || alerta.status === filtroStatus;
    return matchTipo && matchPrioridade && matchStatus;
  });

  const contadores = {
    ativo: alertas.filter(a => a.status === 'ativo').length,
    resolvido: alertas.filter(a => a.status === 'resolvido').length,
    alta: alertas.filter(a => a.prioridade === 'alta' && a.status === 'ativo').length
  };

  const resolverAlerta = (id: number) => {
    console.log('Resolvendo alerta:', id);
  };

  const ignorarAlerta = (id: number) => {
    console.log('Ignorando alerta:', id);
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'equipamento': return '🔧';
      case 'cliente': return '👤';
      case 'pagamento': return '💳';
      case 'agendamento': return '📅';
      case 'sistema': return '⚙️';
      default: return '📋';
    }
  };

  const formatarTempo = (date: Date) => {
    const agora = new Date();
    const diff = agora.getTime() - date.getTime();
    const minutos = Math.floor(diff / 60000);
    
    if (minutos < 60) return `${minutos}m atrás`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas}h atrás`;
    const dias = Math.floor(horas / 24);
    return `${dias}d atrás`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Central de Alertas</h1>
          <p className="text-gray-600 mt-2">Monitoramento em tempo real da unidade</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Alertas
        </Button>
      </div>

      {/* Resumo de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{contadores.ativo}</div>
            <p className="text-xs text-gray-600">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prioridade Alta</CardTitle>
            <Bell className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{contadores.alta}</div>
            <p className="text-xs text-gray-600">Urgentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidos Hoje</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{contadores.resolvido}</div>
            <p className="text-xs text-gray-600">Finalizados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tipo</label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="equipamento">Equipamento</SelectItem>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="pagamento">Pagamento</SelectItem>
                  <SelectItem value="agendamento">Agendamento</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Prioridade</label>
              <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recentes</CardTitle>
          <CardDescription>
            {alertasFiltrados.length} alerta(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertasFiltrados.map((alerta) => (
              <div
                key={alerta.id}
                className={`p-4 border rounded-lg ${
                  alerta.status === 'ativo' ? 'border-l-4 border-l-red-500' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">{getTipoIcon(alerta.tipo)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{alerta.titulo}</h3>
                        <Badge className={getPrioridadeColor(alerta.prioridade)}>
                          {alerta.prioridade.toUpperCase()}
                        </Badge>
                        {alerta.status === 'resolvido' && (
                          <Badge variant="outline" className="bg-green-50">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolvido
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{alerta.descricao}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatarTempo(alerta.timestamp)}
                        </div>
                        {alerta.responsavel && (
                          <span>Responsável: {alerta.responsavel}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {alerta.status === 'ativo' && (
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => ignorarAlerta(alerta.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Ignorar
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => resolverAlerta(alerta.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolver
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Notificação</CardTitle>
          <CardDescription>Configure como você quer receber os alertas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações Push</h4>
                <p className="text-sm text-gray-600">Receber alertas em tempo real no navegador</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sons de Alerta</h4>
                <p className="text-sm text-gray-600">Reproduzir som para alertas de prioridade alta</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Alertas por Email</h4>
                <p className="text-sm text-gray-600">Enviar resumo diário por email</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecepcionistaAlertas;
