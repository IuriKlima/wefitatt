
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, Star, Flame, Medal, Award, Users, Calendar } from 'lucide-react';

interface Badge {
  id: number;
  nome: string;
  descricao: string;
  icone: string;
  conquistada: boolean;
  dataConquista?: Date;
  raridade: 'comum' | 'rara' | 'epica' | 'lendaria';
}

interface Desafio {
  id: number;
  nome: string;
  descricao: string;
  objetivo: string;
  progresso: number;
  meta: number;
  pontos: number;
  prazo: Date;
  categoria: 'treino' | 'frequencia' | 'social';
  participantes: number;
}

const AlunoGamificacao: React.FC = () => {
  const [abaSelecionada, setAbaSelecionada] = useState('painel');

  // Dados do perfil de gamificação
  const perfilGamificacao = {
    pontos: 2850,
    nivel: 12,
    pontosProximoNivel: 3200,
    sequencia: 8, // dias consecutivos
    posicaoRanking: 3,
    totalParticipantes: 156
  };

  const badges: Badge[] = [
    {
      id: 1,
      nome: 'Primeiro Treino',
      descricao: 'Complete seu primeiro treino',
      icone: '🏃‍♂️',
      conquistada: true,
      dataConquista: new Date('2024-01-15'),
      raridade: 'comum'
    },
    {
      id: 2,
      nome: 'Sequência de Fogo',
      descricao: 'Treine 7 dias consecutivos',
      icone: '🔥',
      conquistada: true,
      dataConquista: new Date('2024-02-10'),
      raridade: 'rara'
    },
    {
      id: 3,
      nome: 'Máquina de Cardio',
      descricao: 'Complete 50 treinos de cardio',
      icone: '❤️',
      conquistada: true,
      dataConquista: new Date('2024-03-05'),
      raridade: 'epica'
    },
    {
      id: 4,
      nome: 'Força Máxima',
      descricao: 'Atinja sua meta de peso em 3 exercícios',
      icone: '💪',
      conquistada: false,
      raridade: 'rara'
    },
    {
      id: 5,
      nome: 'Maratonista',
      descricao: 'Complete 100 treinos',
      icone: '🏆',
      conquistada: false,
      raridade: 'lendaria'
    },
    {
      id: 6,
      nome: 'Social Butterfly',
      descricao: 'Treine com 10 amigos diferentes',
      icone: '🦋',
      conquistada: false,
      raridade: 'epica'
    }
  ];

  const desafios: Desafio[] = [
    {
      id: 1,
      nome: 'Desafio de Junho',
      descricao: 'Complete 20 treinos neste mês',
      objetivo: '20 treinos',
      progresso: 14,
      meta: 20,
      pontos: 500,
      prazo: new Date('2024-06-30'),
      categoria: 'treino',
      participantes: 89
    },
    {
      id: 2,
      nome: 'Queima Total',
      descricao: 'Queime 5000 calorias em uma semana',
      objetivo: '5000 calorias',
      progresso: 3200,
      meta: 5000,
      pontos: 300,
      prazo: new Date('2024-06-07'),
      categoria: 'treino',
      participantes: 34
    },
    {
      id: 3,
      nome: 'Frequência Máxima',
      descricao: 'Não falte nenhum dia da semana',
      objetivo: '7 dias consecutivos',
      progresso: 5,
      meta: 7,
      pontos: 200,
      prazo: new Date('2024-06-09'),
      categoria: 'frequencia',
      participantes: 67
    }
  ];

  const ranking = [
    { posicao: 1, nome: 'Carlos Silva', pontos: 3420, avatar: '👨‍💼' },
    { posicao: 2, nome: 'Ana Costa', pontos: 3180, avatar: '👩‍🦰' },
    { posicao: 3, nome: 'Você', pontos: 2850, avatar: '😊' },
    { posicao: 4, nome: 'Pedro Santos', pontos: 2760, avatar: '👨‍🔬' },
    { posicao: 5, nome: 'Maria Lima', pontos: 2640, avatar: '👩‍💻' }
  ];

  const getRaridadeColor = (raridade: string) => {
    switch (raridade) {
      case 'comum': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rara': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epica': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'lendaria': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'treino': return <Target className="h-4 w-4" />;
      case 'frequencia': return <Calendar className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  const calcularProgressoNivel = () => {
    const pontosNivelAtual = (perfilGamificacao.nivel - 1) * 250;
    const pontosNecessarios = perfilGamificacao.pontosProximoNivel - pontosNivelAtual;
    const progressoAtual = perfilGamificacao.pontos - pontosNivelAtual;
    return (progressoAtual / pontosNecessarios) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gamificação</h1>
        <p className="text-gray-600 mt-2">Acompanhe seu progresso e conquiste recompensas</p>
      </div>

      <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="painel">Painel</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="desafios">Desafios</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="painel" className="space-y-6">
          {/* Status Geral */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pontos Totais</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{perfilGamificacao.pontos}</div>
                <p className="text-xs text-gray-600">+120 esta semana</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nível Atual</CardTitle>
                <Medal className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{perfilGamificacao.nivel}</div>
                <p className="text-xs text-gray-600">Próximo: {perfilGamificacao.pontosProximoNivel} pts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sequência</CardTitle>
                <Flame className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{perfilGamificacao.sequencia}</div>
                <p className="text-xs text-gray-600">dias consecutivos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posição</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">#{perfilGamificacao.posicaoRanking}</div>
                <p className="text-xs text-gray-600">de {perfilGamificacao.totalParticipantes} alunos</p>
              </CardContent>
            </Card>
          </div>

          {/* Progresso do Nível */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso para o Próximo Nível</CardTitle>
              <CardDescription>
                Nível {perfilGamificacao.nivel} → Nível {perfilGamificacao.nivel + 1}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{perfilGamificacao.pontos} pontos</span>
                  <span>{perfilGamificacao.pontosProximoNivel} pontos</span>
                </div>
                <Progress value={calcularProgressoNivel()} className="h-3" />
                <p className="text-sm text-gray-600 text-center">
                  Faltam {perfilGamificacao.pontosProximoNivel - perfilGamificacao.pontos} pontos para o próximo nível
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Badges Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Badges Conquistadas Recentemente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {badges.filter(b => b.conquistada).slice(-3).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{badge.icone}</div>
                    <div>
                      <h3 className="font-medium">{badge.nome}</h3>
                      <p className="text-sm text-gray-600">{badge.descricao}</p>
                      {badge.dataConquista && (
                        <p className="text-xs text-purple-600">
                          {badge.dataConquista.toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coleção de Badges</CardTitle>
              <CardDescription>
                {badges.filter(b => b.conquistada).length} de {badges.length} badges conquistadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 border rounded-lg ${
                      badge.conquistada 
                        ? 'border-purple-200 bg-purple-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{badge.icone}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{badge.nome}</h3>
                          <Badge className={getRaridadeColor(badge.raridade)}>
                            {badge.raridade}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{badge.descricao}</p>
                        {badge.conquistada && badge.dataConquista ? (
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-purple-600">
                              Conquistada em {badge.dataConquista.toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Não conquistada</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desafios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Desafios Ativos</CardTitle>
              <CardDescription>Participe dos desafios e ganhe pontos extras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {desafios.map((desafio) => (
                  <div key={desafio.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoriaIcon(desafio.categoria)}
                        <h3 className="font-semibold">{desafio.nome}</h3>
                        <Badge variant="outline">
                          +{desafio.pontos} pontos
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {desafio.participantes} participantes
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{desafio.descricao}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso: {desafio.progresso} de {desafio.meta}</span>
                        <span>Prazo: {desafio.prazo.toLocaleDateString('pt-BR')}</span>
                      </div>
                      <Progress 
                        value={(desafio.progresso / desafio.meta) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ranking da Unidade</CardTitle>
              <CardDescription>Top alunos com mais pontos este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ranking.map((posicao, index) => (
                  <div
                    key={posicao.posicao}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      posicao.nome === 'Você' 
                        ? 'bg-purple-50 border border-purple-200' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      posicao.posicao === 1 ? 'bg-yellow-400 text-yellow-900' :
                      posicao.posicao === 2 ? 'bg-gray-300 text-gray-700' :
                      posicao.posicao === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {posicao.posicao === 1 ? '🥇' :
                       posicao.posicao === 2 ? '🥈' :
                       posicao.posicao === 3 ? '🥉' :
                       posicao.posicao}
                    </div>
                    
                    <div className="text-2xl">{posicao.avatar}</div>
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        posicao.nome === 'Você' ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        {posicao.nome}
                      </h3>
                      <p className="text-sm text-gray-600">{posicao.pontos} pontos</p>
                    </div>
                    
                    {posicao.nome === 'Você' && (
                      <Badge className="bg-purple-100 text-purple-800">
                        Você
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlunoGamificacao;
