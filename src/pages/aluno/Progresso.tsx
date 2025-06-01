
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar,
  TrendingUp,
  Target,
  Award,
  Activity,
  Heart,
  Zap,
  Trophy,
  Star,
  Plus,
  CheckCircle,
  Clock,
  Smartphone
} from 'lucide-react';
import { format, subDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AlunoProgresso: React.FC = () => {
  const [metaSelecionada, setMetaSelecionada] = useState<any>(null);
  const [novaMetaAberta, setNovaMetaAberta] = useState(false);

  // Dados de exemplo para frequência
  const diasComCheckin = [
    subDays(new Date(), 1),
    subDays(new Date(), 3),
    subDays(new Date(), 5),
    subDays(new Date(), 7),
    subDays(new Date(), 10),
    subDays(new Date(), 12),
    subDays(new Date(), 14)
  ];

  const estatisticasFrequencia = {
    presencaSemanal: 75,
    presencaMensal: 68,
    totalCheckins: 45,
    sequenciaAtual: 3
  };

  // Dados de avaliações físicas
  const avaliacoesFisicas = [
    {
      id: 1,
      data: new Date(2024, 0, 15),
      profissional: 'Dr. Ana Silva',
      peso: 70.5,
      gordura: 18.5,
      massaMagra: 57.5,
      circunferencias: {
        bracoEsquerdo: 32,
        bracoDireito: 32.5,
        peitoral: 95,
        cintura: 78,
        quadril: 98,
        coxaEsquerda: 58,
        coxaDireita: 58.5
      }
    },
    {
      id: 2,
      data: new Date(2023, 11, 1),
      profissional: 'Dr. Ana Silva',
      peso: 72.0,
      gordura: 20.2,
      massaMagra: 57.4,
      circunferencias: {
        bracoEsquerdo: 31,
        bracoDireito: 31.5,
        peitoral: 96,
        cintura: 80,
        quadril: 100,
        coxaEsquerda: 57,
        coxaDireita: 57.5
      }
    }
  ];

  // Metas pessoais
  const metas = [
    {
      id: 1,
      titulo: 'Perder 5kg até Março',
      progresso: 60,
      prazo: new Date(2024, 2, 31),
      status: 'em_andamento',
      valorAtual: '3kg perdidos',
      valorMeta: '5kg'
    },
    {
      id: 2,
      titulo: 'Treinar 4x por semana',
      progresso: 75,
      prazo: new Date(2024, 1, 29),
      status: 'em_andamento',
      valorAtual: '3x esta semana',
      valorMeta: '4x por semana'
    },
    {
      id: 3,
      titulo: 'Aumentar carga do supino em 10kg',
      progresso: 100,
      prazo: new Date(2024, 0, 31),
      status: 'concluida',
      valorAtual: '10kg aumentados',
      valorMeta: '10kg'
    }
  ];

  // Gamificação
  const gamificacao = {
    pontos: 2450,
    nivel: 8,
    proximoNivel: 2800,
    badges: [
      { id: 1, nome: 'Primeira Semana', descricao: 'Complete sua primeira semana', desbloqueado: true },
      { id: 2, nome: 'Consistente', descricao: 'Treine 7 dias seguidos', desbloqueado: true },
      { id: 3, nome: 'Evoluindo', descricao: 'Complete 10 treinos', desbloqueado: true },
      { id: 4, nome: 'Dedicado', descricao: 'Treine por 30 dias', desbloqueado: false },
      { id: 5, nome: 'Mestre do Treino', descricao: 'Complete 100 treinos', desbloqueado: false }
    ],
    ranking: {
      posicaoGeral: 23,
      totalParticipantes: 156,
      posicaoFrequencia: 12
    }
  };

  // Dados de wearables (simulados)
  const dadosWearables = {
    conectado: {
      appleHealth: true,
      googleFit: false,
      strava: true
    },
    dados: {
      passosDiarios: 8543,
      caloriasGastas: 2150,
      horasSono: 7.5,
      distanciaKm: 6.2,
      bpm: 68
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'atrasada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCalendarioFrequencia = () => {
    const hoje = new Date();
    const dias = Array.from({ length: 30 }, (_, i) => subDays(hoje, i)).reverse();
    
    return (
      <div className="grid grid-cols-7 gap-1 text-center">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, index) => (
          <div key={index} className="text-xs font-medium text-gray-500 p-1">
            {dia}
          </div>
        ))}
        {dias.map((dia, index) => {
          const temCheckin = diasComCheckin.some(d => isSameDay(d, dia));
          return (
            <div
              key={index}
              className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                temCheckin 
                  ? 'bg-wefit-primary text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {dia.getDate()}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Progresso</h1>
          <p className="text-gray-600 mt-1">Acompanhe sua evolução na Wefit</p>
        </div>
      </div>

      <Tabs defaultValue="frequencia" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="frequencia">Frequência</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
          <TabsTrigger value="gamificacao">Conquistas</TabsTrigger>
          <TabsTrigger value="wearables">Wearables</TabsTrigger>
        </TabsList>

        <TabsContent value="frequencia" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Esta Semana</p>
                    <p className="text-2xl font-bold text-wefit-primary">{estatisticasFrequencia.presencaSemanal}%</p>
                  </div>
                  <Activity className="h-8 w-8 text-wefit-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Este Mês</p>
                    <p className="text-2xl font-bold text-wefit-accent">{estatisticasFrequencia.presencaMensal}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-wefit-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Check-ins</p>
                    <p className="text-2xl font-bold text-green-600">{estatisticasFrequencia.totalCheckins}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sequência Atual</p>
                    <p className="text-2xl font-bold text-orange-600">{estatisticasFrequencia.sequenciaAtual} dias</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calendário de Frequência - Últimos 30 Dias</CardTitle>
            </CardHeader>
            <CardContent>
              {renderCalendarioFrequencia()}
              <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-wefit-primary rounded"></div>
                  <span>Dia com treino</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Dia sem treino</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avaliacoes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {avaliacoesFisicas.map((avaliacao) => (
              <Card key={avaliacao.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Avaliação de {format(avaliacao.data, 'dd/MM/yyyy', { locale: ptBR })}</span>
                    <Badge variant="outline">{avaliacao.profissional}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-wefit-primary">{avaliacao.peso}kg</p>
                      <p className="text-sm text-gray-600">Peso</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-wefit-accent">{avaliacao.gordura}%</p>
                      <p className="text-sm text-gray-600">% Gordura</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{avaliacao.massaMagra}kg</p>
                      <p className="text-sm text-gray-600">Massa Magra</p>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Ver Circunferências
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Circunferências - {format(avaliacao.data, 'dd/MM/yyyy', { locale: ptBR })}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(avaliacao.circunferencias).map(([parte, valor]) => (
                          <div key={parte} className="flex justify-between">
                            <span className="capitalize">{parte.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                            <span className="font-semibold">{valor}cm</span>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {avaliacoesFisicas.length >= 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Comparação de Evolução</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-xl font-bold">
                      {(avaliacoesFisicas[0].peso - avaliacoesFisicas[1].peso) > 0 ? '+' : ''}
                      {(avaliacoesFisicas[0].peso - avaliacoesFisicas[1].peso).toFixed(1)}kg
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">% Gordura</p>
                    <p className="text-xl font-bold text-green-600">
                      {(avaliacoesFisicas[0].gordura - avaliacoesFisicas[1].gordura).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Massa Magra</p>
                    <p className="text-xl font-bold text-wefit-primary">
                      +{(avaliacoesFisicas[0].massaMagra - avaliacoesFisicas[1].massaMagra).toFixed(1)}kg
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="metas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Minhas Metas Pessoais</h2>
            <Dialog open={novaMetaAberta} onOpenChange={setNovaMetaAberta}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Meta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Meta</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Título da meta" />
                  <Input placeholder="Descrição" />
                  <Input type="date" />
                  <Button className="w-full" onClick={() => setNovaMetaAberta(false)}>
                    Criar Meta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metas.map((meta) => (
              <Card key={meta.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{meta.titulo}</CardTitle>
                    <Badge className={getStatusColor(meta.status)}>
                      {meta.status === 'concluida' ? 'Concluída' : 'Em Andamento'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{meta.progresso}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-wefit-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${meta.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Atual</p>
                        <p className="font-semibold">{meta.valorAtual}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Meta</p>
                        <p className="font-semibold">{meta.valorMeta}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">
                        Prazo: {format(meta.prazo, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gamificacao" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-3xl font-bold text-wefit-primary">{gamificacao.pontos}</p>
                <p className="text-gray-600">Pontos Totais</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-wefit-accent mx-auto mb-4" />
                <p className="text-3xl font-bold text-wefit-accent">Nível {gamificacao.nivel}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-wefit-accent h-2 rounded-full"
                      style={{ width: `${(gamificacao.pontos / gamificacao.proximoNivel) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {gamificacao.proximoNivel - gamificacao.pontos} pontos para o próximo nível
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-green-600">#{gamificacao.ranking.posicaoGeral}</p>
                <p className="text-gray-600">Ranking Geral</p>
                <p className="text-sm text-gray-500">de {gamificacao.ranking.totalParticipantes} participantes</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Suas Conquistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gamificacao.badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className={`p-4 border rounded-lg text-center ${
                      badge.desbloqueado 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <Award 
                      className={`h-8 w-8 mx-auto mb-2 ${
                        badge.desbloqueado ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    />
                    <h3 className="font-semibold">{badge.nome}</h3>
                    <p className="text-sm text-gray-600">{badge.descricao}</p>
                    {badge.desbloqueado && (
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">Desbloqueado!</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wearables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Conectar Dispositivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Apple Health</h3>
                    <p className="text-sm text-gray-600">Sincronizar dados de saúde</p>
                  </div>
                  <Button 
                    variant={dadosWearables.conectado.appleHealth ? "default" : "outline"}
                    size="sm"
                  >
                    {dadosWearables.conectado.appleHealth ? 'Conectado' : 'Conectar'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Google Fit</h3>
                    <p className="text-sm text-gray-600">Dados de atividade física</p>
                  </div>
                  <Button 
                    variant={dadosWearables.conectado.googleFit ? "default" : "outline"}
                    size="sm"
                  >
                    {dadosWearables.conectado.googleFit ? 'Conectado' : 'Conectar'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Strava</h3>
                    <p className="text-sm text-gray-600">Corridas e ciclismo</p>
                  </div>
                  <Button 
                    variant={dadosWearables.conectado.strava ? "default" : "outline"}
                    size="sm"
                  >
                    {dadosWearables.conectado.strava ? 'Conectado' : 'Conectar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{dadosWearables.dados.passosDiarios.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Passos Hoje</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{dadosWearables.dados.caloriasGastas}</p>
                <p className="text-sm text-gray-600">Calorias</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{dadosWearables.dados.horasSono}h</p>
                <p className="text-sm text-gray-600">Sono</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{dadosWearables.dados.distanciaKm}km</p>
                <p className="text-sm text-gray-600">Distância</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{dadosWearables.dados.bpm}</p>
                <p className="text-sm text-gray-600">BPM</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlunoProgresso;
