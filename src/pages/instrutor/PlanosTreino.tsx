
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Copy, 
  Archive, 
  Users, 
  Calendar, 
  Clock, 
  Target,
  Dumbbell,
  PlayCircle,
  Save,
  X
} from 'lucide-react';

const InstrutorPlanosTreino: React.FC = () => {
  const [activeTab, setActiveTab] = useState('planos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlano, setSelectedPlano] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreatePrograma, setShowCreatePrograma] = useState(false);

  const planosAvulsos = [
    {
      id: 1,
      nome: 'Treino Upper Body Iniciante',
      tipo: 'Força',
      nivel: 'Iniciante',
      duracao: '45 min',
      exercicios: 8,
      objetivo: 'Fortalecimento',
      dataCriacao: '2024-01-15',
      vezesUsado: 12
    },
    {
      id: 2,
      nome: 'HIIT Queima Gordura',
      tipo: 'Cardio',
      nivel: 'Intermediário',
      duracao: '30 min',
      exercicios: 6,
      objetivo: 'Emagrecimento',
      dataCriacao: '2024-01-10',
      vezesUsado: 25
    },
    {
      id: 3,
      nome: 'Treino Lower Body Avançado',
      tipo: 'Força',
      nivel: 'Avançado',
      duracao: '60 min',
      exercicios: 10,
      objetivo: 'Hipertrofia',
      dataCriacao: '2024-01-08',
      vezesUsado: 8
    }
  ];

  const programasEstruturados = [
    {
      id: 1,
      nome: 'Programa Iniciante 4 Semanas',
      tipo: 'Programa Completo',
      duracao: '4 semanas',
      fases: 4,
      objetivo: 'Condicionamento Geral',
      alunosAtribuidos: 5,
      dataCriacao: '2024-01-01'
    },
    {
      id: 2,
      nome: 'Hipertrofia Push/Pull/Legs',
      tipo: 'Programa Especializado',
      duracao: '8 semanas',
      fases: 2,
      objetivo: 'Hipertrofia',
      alunosAtribuidos: 12,
      dataCriacao: '2023-12-15'
    }
  ];

  const exerciciosDisponiveis = [
    { id: 1, nome: 'Supino Reto', grupo: 'Peito', equipamento: 'Barra' },
    { id: 2, nome: 'Agachamento', grupo: 'Pernas', equipamento: 'Corporal' },
    { id: 3, nome: 'Rosca Direta', grupo: 'Bíceps', equipamento: 'Halter' },
    { id: 4, nome: 'Prancha', grupo: 'Core', equipamento: 'Corporal' },
    { id: 5, nome: 'Pull-up', grupo: 'Costas', equipamento: 'Barra Fixa' }
  ];

  const [novoPlano, setNovoPlano] = useState({
    nome: '',
    objetivo: '',
    nivel: '',
    duracao: '',
    exercicios: [] as any[]
  });

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante': return 'bg-green-500';
      case 'Intermediário': return 'bg-yellow-500';
      case 'Avançado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const adicionarExercicio = (exercicio: any) => {
    const novoExercicio = {
      ...exercicio,
      series: 3,
      repeticoes: 12,
      carga: '',
      descanso: '60s',
      observacoes: ''
    };
    setNovoPlano(prev => ({
      ...prev,
      exercicios: [...prev.exercicios, novoExercicio]
    }));
  };

  const removerExercicio = (index: number) => {
    setNovoPlano(prev => ({
      ...prev,
      exercicios: prev.exercicios.filter((_, i) => i !== index)
    }));
  };

  const atualizarExercicio = (index: number, campo: string, valor: any) => {
    setNovoPlano(prev => ({
      ...prev,
      exercicios: prev.exercicios.map((ex, i) => 
        i === index ? { ...ex, [campo]: valor } : ex
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Planos e Programas de Treino</h1>
          <p className="text-gray-600 mt-2">Crie e gerencie seus planos de treino personalizados</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Plano Avulso
          </Button>
          <Button variant="outline" onClick={() => setShowCreatePrograma(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Novo Programa
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="planos">Planos Avulsos</TabsTrigger>
          <TabsTrigger value="programas">Programas Estruturados</TabsTrigger>
        </TabsList>

        <TabsContent value="planos" className="space-y-4">
          {/* Filtros e Busca */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar plano de treino..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="forca">Força</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="funcional">Funcional</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>

          {/* Grid de Planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planosAvulsos.map((plano) => (
              <Card key={plano.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{plano.nome}</CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{plano.tipo}</Badge>
                    <div className={`w-2 h-2 rounded-full ${getNivelColor(plano.nivel)}`}></div>
                    <span className="text-xs text-gray-600">{plano.nivel}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {plano.duracao}
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="h-3 w-3" />
                        {plano.exercicios} exercícios
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Objetivo:</div>
                      <div className="text-sm text-gray-600">{plano.objetivo}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Usado {plano.vezesUsado} vezes • Criado em {new Date(plano.dataCriacao).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        Atribuir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programasEstruturados.map((programa) => (
              <Card key={programa.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{programa.nome}</CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{programa.tipo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {programa.duracao}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {programa.fases} fases
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Objetivo:</div>
                      <div className="text-sm text-gray-600">{programa.objetivo}</div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">{programa.alunosAtribuidos}</span> alunos seguindo este programa
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Ver Estrutura
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        Gerenciar Alunos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Criação de Plano */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Criar Novo Plano de Treino</CardTitle>
                <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nome do Treino</label>
                    <Input
                      value={novoPlano.nome}
                      onChange={(e) => setNovoPlano(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Treino Upper Body"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Objetivo Principal</label>
                    <Select onValueChange={(value) => setNovoPlano(prev => ({ ...prev, objetivo: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                        <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                        <SelectItem value="forca">Força</SelectItem>
                        <SelectItem value="condicionamento">Condicionamento</SelectItem>
                        <SelectItem value="reabilitacao">Reabilitação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nível</label>
                    <Select onValueChange={(value) => setNovoPlano(prev => ({ ...prev, nivel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duração Estimada</label>
                    <Input
                      value={novoPlano.duracao}
                      onChange={(e) => setNovoPlano(prev => ({ ...prev, duracao: e.target.value }))}
                      placeholder="Ex: 45 min"
                    />
                  </div>

                  {/* Biblioteca de Exercícios */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Adicionar Exercícios</label>
                    <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                      {exerciciosDisponiveis.map((exercicio) => (
                        <div key={exercicio.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <div>
                            <div className="font-medium text-sm">{exercicio.nome}</div>
                            <div className="text-xs text-gray-600">{exercicio.grupo} • {exercicio.equipamento}</div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => adicionarExercicio(exercicio)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lista de Exercícios do Treino */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Exercícios do Treino ({novoPlano.exercicios.length})</label>
                    <div className="border rounded-lg max-h-96 overflow-y-auto">
                      {novoPlano.exercicios.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Nenhum exercício adicionado</p>
                          <p className="text-sm">Adicione exercícios da biblioteca ao lado</p>
                        </div>
                      ) : (
                        <div className="p-3 space-y-3">
                          {novoPlano.exercicios.map((exercicio, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <div className="font-medium">{exercicio.nome}</div>
                                  <div className="text-sm text-gray-600">{exercicio.grupo}</div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removerExercicio(index)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <label className="text-xs text-gray-600">Séries</label>
                                  <Input
                                    type="number"
                                    value={exercicio.series}
                                    onChange={(e) => atualizarExercicio(index, 'series', parseInt(e.target.value))}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600">Repetições</label>
                                  <Input
                                    value={exercicio.repeticoes}
                                    onChange={(e) => atualizarExercicio(index, 'repeticoes', e.target.value)}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600">Carga</label>
                                  <Input
                                    value={exercicio.carga}
                                    onChange={(e) => atualizarExercicio(index, 'carga', e.target.value)}
                                    placeholder="Ex: 20kg"
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600">Descanso</label>
                                  <Input
                                    value={exercicio.descanso}
                                    onChange={(e) => atualizarExercicio(index, 'descanso', e.target.value)}
                                    className="h-8"
                                  />
                                </div>
                              </div>
                              <div className="mt-2">
                                <label className="text-xs text-gray-600">Observações</label>
                                <Textarea
                                  value={exercicio.observacoes}
                                  onChange={(e) => atualizarExercicio(index, 'observacoes', e.target.value)}
                                  placeholder="Dicas de execução..."
                                  className="h-16 text-sm"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      disabled={!novoPlano.nome || !novoPlano.objetivo || novoPlano.exercicios.length === 0}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Plano
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstrutorPlanosTreino;
