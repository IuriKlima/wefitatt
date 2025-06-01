
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Dumbbell, Target, TrendingUp, Star, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlunoPainel: React.FC = () => {
  const navigate = useNavigate();
  const [notificacoes] = useState([
    { id: 1, tipo: 'aula', titulo: 'Sua aula de Yoga começa em 30 min', tempo: '30 min', lida: false },
    { id: 2, tipo: 'treino', titulo: 'Novo treino disponível: Upper Body Focus', tempo: '2h', lida: false },
    { id: 3, tipo: 'conquista', titulo: 'Parabéns! Você desbloqueou o badge "Consistente"', tempo: '1d', lida: true }
  ]);

  const proximaAula = {
    nome: 'Spinning Advanced',
    horario: '18:30',
    instrutor: 'Carlos Silva',
    sala: 'Sala 2'
  };

  const treinoHoje = {
    nome: 'Upper Body - Força',
    exercicios: 8,
    tempoEstimado: '45 min'
  };

  const progressoSemana = {
    frequencia: 75,
    meta: 'Treinar 4x na semana'
  };

  const recomendacoes = [
    { tipo: 'aula', nome: 'Pilates Iniciante', instrutor: 'Ana Costa', popularidade: 4.8 },
    { tipo: 'aula', nome: 'Funcional HIIT', instrutor: 'Roberto Lima', popularidade: 4.9 },
    { tipo: 'desafio', nome: 'Desafio 30 Dias Cardio', participantes: 124 }
  ];

  const gamificacao = {
    pontos: 2450,
    nivel: 8,
    proximoNivel: 2800,
    proximaBadge: 'Mestre do Treino'
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header com saudação */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Olá, Maria Silva!</h1>
          <p className="text-gray-600 mt-1">Pronta para mais um dia incrível na Wefit?</p>
        </div>
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificacoes.filter(n => !n.lida).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificacoes.filter(n => !n.lida).length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Próxima Aula */}
        <Card className="bg-gradient-to-br from-wefit-primary to-wefit-accent text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-white">
              <Calendar className="h-5 w-5 mr-2" />
              Próxima Aula
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{proximaAula.nome}</h3>
              <p className="text-white/90">Hoje às {proximaAula.horario}</p>
              <p className="text-white/80">Com {proximaAula.instrutor}</p>
              <p className="text-white/80 text-sm">{proximaAula.sala}</p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-3 w-full"
                onClick={() => navigate('/aluno/agendar')}
              >
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Treino de Hoje */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-wefit-primary" />
              Seu Treino de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{treinoHoje.nome}</h3>
              <p className="text-gray-600">{treinoHoje.exercicios} exercícios</p>
              <p className="text-gray-600">{treinoHoje.tempoEstimado}</p>
              <Button 
                className="mt-3 w-full"
                onClick={() => navigate('/aluno/treinos')}
              >
                <Play className="h-4 w-4 mr-2" />
                Iniciar Treino
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progresso da Semana */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-wefit-primary" />
              Seu Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Frequência da semana</span>
                  <span className="font-semibold">{progressoSemana.frequencia}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-wefit-primary h-2 rounded-full" 
                    style={{ width: `${progressoSemana.frequencia}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{progressoSemana.meta}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/aluno/progresso')}
              >
                Ver Progresso Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gamificação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Sua Jornada Wefit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-wefit-primary">{gamificacao.pontos}</div>
              <div className="text-sm text-gray-600">Pontos Totais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wefit-accent">Nível {gamificacao.nivel}</div>
              <div className="text-sm text-gray-600">Nível Atual</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Próximo Nível</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-wefit-accent h-2 rounded-full" 
                  style={{ width: `${(gamificacao.pontos / gamificacao.proximoNivel) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {gamificacao.proximoNivel - gamificacao.pontos} pontos restantes
              </div>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                Próxima: {gamificacao.proximaBadge}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações Inteligentes para Você</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recomendacoes.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{item.nome}</h4>
                  {item.tipo === 'aula' && (
                    <div className="flex items-center text-sm text-yellow-600">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {item.popularidade}
                    </div>
                  )}
                </div>
                {item.tipo === 'aula' ? (
                  <p className="text-sm text-gray-600 mb-3">Com {item.instrutor}</p>
                ) : (
                  <p className="text-sm text-gray-600 mb-3">{item.participantes} participantes</p>
                )}
                <Button variant="outline" size="sm" className="w-full">
                  {item.tipo === 'aula' ? 'Ver Horários' : 'Participar'}
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acesso Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          size="lg" 
          className="h-16"
          onClick={() => navigate('/aluno/agendar')}
        >
          <Calendar className="h-5 w-5 mr-2" />
          Agendar Nova Aula
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16"
          onClick={() => navigate('/aluno/treinos')}
        >
          <Dumbbell className="h-5 w-5 mr-2" />
          Ver Meu Treino de Hoje
        </Button>
      </div>
    </div>
  );
};

export default AlunoPainel;
