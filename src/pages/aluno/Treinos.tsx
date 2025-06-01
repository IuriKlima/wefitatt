
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Clock, 
  Calendar, 
  Play, 
  CheckCircle, 
  Target,
  TrendingUp,
  Info,
  Plus,
  Minus
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AlunoTreinos: React.FC = () => {
  const [planoAtivo, setPlanoAtivo] = useState('upper-lower');
  const [treinoSelecionado, setTreinoSelecionado] = useState('upper');
  const [exercicioDetalhes, setExercicioDetalhes] = useState<any>(null);
  const [registros, setRegistros] = useState<any>({});

  const planosTreino = [
    {
      id: 'upper-lower',
      nome: 'Upper/Lower Split',
      instrutor: 'Carlos Silva',
      dataAtribuicao: new Date(2024, 0, 15),
      validade: new Date(2024, 2, 15),
      descricao: 'Divisão entre treino de membros superiores e inferiores',
      treinos: ['upper', 'lower']
    },
    {
      id: 'full-body',
      nome: 'Full Body Beginner',
      instrutor: 'Ana Costa',
      dataAtribuicao: new Date(2023, 11, 1),
      validade: new Date(2024, 0, 31),
      descricao: 'Treino completo para iniciantes',
      treinos: ['full-a', 'full-b']
    }
  ];

  const treinos = {
    upper: {
      nome: 'Upper Body - Força',
      tipo: 'Membros Superiores',
      tempoEstimado: '45-60 min',
      exercicios: [
        {
          id: 1,
          nome: 'Supino Reto',
          series: 3,
          repeticoes: '8-10',
          cargaSugerida: '60kg',
          descanso: '90s',
          observacoes: 'Controle na descida, explosão na subida',
          grupoMuscular: 'Peitoral',
          equipamento: 'Barra'
        },
        {
          id: 2,
          nome: 'Puxada Frontal',
          series: 3,
          repeticoes: '10-12',
          cargaSugerida: '50kg',
          descanso: '60s',
          observacoes: 'Puxar até a altura do peito',
          grupoMuscular: 'Dorsal',
          equipamento: 'Polia'
        },
        {
          id: 3,
          nome: 'Desenvolvimento com Halteres',
          series: 3,
          repeticoes: '10-12',
          cargaSugerida: '12kg cada',
          descanso: '60s',
          observacoes: 'Movimento controlado, não travar cotovelos',
          grupoMuscular: 'Ombros',
          equipamento: 'Halteres'
        },
        {
          id: 4,
          nome: 'Rosca Direta',
          series: 3,
          repeticoes: '12-15',
          cargaSugerida: '8kg cada',
          descanso: '45s',
          observacoes: 'Evitar balanço do corpo',
          grupoMuscular: 'Bíceps',
          equipamento: 'Halteres'
        }
      ]
    },
    lower: {
      nome: 'Lower Body - Força',
      tipo: 'Membros Inferiores',
      tempoEstimado: '50-65 min',
      exercicios: [
        {
          id: 5,
          nome: 'Agachamento Livre',
          series: 4,
          repeticoes: '8-12',
          cargaSugerida: '40kg',
          descanso: '90s',
          observacoes: 'Descer até 90 graus, manter coluna ereta',
          grupoMuscular: 'Quadríceps/Glúteos',
          equipamento: 'Barra'
        },
        {
          id: 6,
          nome: 'Leg Press 45°',
          series: 3,
          repeticoes: '12-15',
          cargaSugerida: '80kg',
          descanso: '60s',
          observacoes: 'Amplitude completa, não travar joelhos',
          grupoMuscular: 'Quadríceps',
          equipamento: 'Leg Press'
        }
      ]
    }
  };

  const historicoTreinos = [
    { data: new Date(2024, 0, 20), treino: 'Upper Body', duracao: 45, exercicios: 4 },
    { data: new Date(2024, 0, 18), treino: 'Lower Body', duracao: 55, exercicios: 6 },
    { data: new Date(2024, 0, 16), treino: 'Upper Body', duracao: 42, exercicios: 4 },
  ];

  const handleRegistrarSerie = (exercicioId: number, serieIndex: number, carga: string, reps: string, percepcao: string) => {
    const key = `${exercicioId}-${serieIndex}`;
    setRegistros(prev => ({
      ...prev,
      [key]: { carga, reps, percepcao }
    }));
  };

  const treinoAtual = treinos[treinoSelecionado as keyof typeof treinos];
  const planoAtual = planosTreino.find(p => p.id === planoAtivo);

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Treinos</h1>
          <p className="text-gray-600 mt-1">Acompanhe seus planos de treino e evolução</p>
        </div>
      </div>

      <Tabs defaultValue="atual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="atual">Treino Atual</TabsTrigger>
          <TabsTrigger value="planos">Meus Planos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="atual" className="space-y-6">
          {planoAtual && (
            <>
              {/* Seletor de Treino */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Dumbbell className="h-5 w-5 mr-2 text-wefit-primary" />
                    {planoAtual.nome}
                  </CardTitle>
                  <p className="text-gray-600">{planoAtual.descricao}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    {planoAtual.treinos.map((treinoId) => (
                      <Button
                        key={treinoId}
                        variant={treinoSelecionado === treinoId ? "default" : "outline"}
                        onClick={() => setTreinoSelecionado(treinoId)}
                      >
                        {treinos[treinoId as keyof typeof treinos]?.nome}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{treinoAtual?.tempoEstimado}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{treinoAtual?.exercicios.length} exercícios</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Com {planoAtual.instrutor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Exercícios */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{treinoAtual?.nome}</span>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Treino
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {treinoAtual?.exercicios.map((exercicio, index) => (
                      <div key={exercicio.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-wefit-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </span>
                              <h3 className="font-semibold text-lg">{exercicio.nome}</h3>
                              <Badge variant="outline">{exercicio.grupoMuscular}</Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span><strong>Séries:</strong> {exercicio.series}</span>
                              <span><strong>Reps:</strong> {exercicio.repeticoes}</span>
                              <span><strong>Carga:</strong> {exercicio.cargaSugerida}</span>
                              <span><strong>Descanso:</strong> {exercicio.descanso}</span>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setExercicioDetalhes(exercicio)}
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>{exercicioDetalhes?.nome}</DialogTitle>
                              </DialogHeader>
                              {exercicioDetalhes && (
                                <div className="space-y-4">
                                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">Vídeo do Exercício</span>
                                  </div>
                                  <div className="space-y-2">
                                    <p><strong>Grupo Muscular:</strong> {exercicioDetalhes.grupoMuscular}</p>
                                    <p><strong>Equipamento:</strong> {exercicioDetalhes.equipamento}</p>
                                    <p><strong>Observações:</strong> {exercicioDetalhes.observacoes}</p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>

                        {/* Registro de Séries */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Registrar Execução:</h4>
                          {Array.from({ length: exercicio.series }, (_, serieIndex) => (
                            <div key={serieIndex} className="grid grid-cols-4 gap-2 items-center text-sm">
                              <span className="font-medium">Série {serieIndex + 1}:</span>
                              <Input 
                                placeholder="Carga"
                                className="h-8"
                                onChange={(e) => {
                                  const registro = registros[`${exercicio.id}-${serieIndex}`] || {};
                                  handleRegistrarSerie(exercicio.id, serieIndex, e.target.value, registro.reps || '', registro.percepcao || '');
                                }}
                              />
                              <Input 
                                placeholder="Reps"
                                className="h-8"
                                onChange={(e) => {
                                  const registro = registros[`${exercicio.id}-${serieIndex}`] || {};
                                  handleRegistrarSerie(exercicio.id, serieIndex, registro.carga || '', e.target.value, registro.percepcao || '');
                                }}
                              />
                              <Select onValueChange={(value) => {
                                const registro = registros[`${exercicio.id}-${serieIndex}`] || {};
                                handleRegistrarSerie(exercicio.id, serieIndex, registro.carga || '', registro.reps || '', value);
                              }}>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="RPE" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="facil">Fácil</SelectItem>
                                  <SelectItem value="medio">Médio</SelectItem>
                                  <SelectItem value="dificil">Difícil</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Finalizar Treino
                    </Button>
                    <Button variant="outline">Salvar Progresso</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="planos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planosTreino.map((plano) => (
              <Card key={plano.id} className={plano.id === planoAtivo ? 'ring-2 ring-wefit-primary' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plano.nome}</CardTitle>
                      <p className="text-gray-600 mt-1">{plano.descricao}</p>
                    </div>
                    {plano.id === planoAtivo && (
                      <Badge className="bg-wefit-primary">Ativo</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Instrutor:</strong> {plano.instrutor}</p>
                    <p><strong>Atribuído em:</strong> {format(plano.dataAtribuicao, 'dd/MM/yyyy', { locale: ptBR })}</p>
                    <p><strong>Válido até:</strong> {format(plano.validade, 'dd/MM/yyyy', { locale: ptBR })}</p>
                    <p><strong>Treinos:</strong> {plano.treinos.length} modalidades</p>
                  </div>
                  {plano.id !== planoAtivo && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setPlanoAtivo(plano.id)}
                    >
                      Ativar Plano
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-wefit-primary" />
                Histórico de Treinos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicoTreinos.map((treino, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{treino.treino}</h4>
                      <p className="text-sm text-gray-600">
                        {format(treino.data, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{treino.duracao} minutos</p>
                      <p>{treino.exercicios} exercícios</p>
                    </div>
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

export default AlunoTreinos;
