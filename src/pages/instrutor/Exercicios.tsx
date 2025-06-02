
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Play, Heart, Zap, Users, Dumbbell, Filter, BookOpen } from 'lucide-react';

const InstrutorExercicios: React.FC = () => {
  const [selectedExercicio, setSelectedExercicio] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroGrupo, setFiltroGrupo] = useState('todos');

  const exerciciosGlobal = [
    {
      id: 1,
      nome: 'Supino Reto com Barra',
      grupoMuscular: 'Peito',
      equipamento: 'Barra e Banco',
      nivel: 'Intermediário',
      tipo: 'Força',
      thumbnail: '/placeholder.svg',
      descricao: 'Exercício clássico para desenvolvimento do peitoral maior',
      instrucoes: 'Deite-se no banco, pegue a barra com pegada pronada...',
      biblioteca: 'global'
    },
    {
      id: 2,
      nome: 'Agachamento Livre',
      grupoMuscular: 'Pernas',
      equipamento: 'Corporal',
      nivel: 'Iniciante',
      tipo: 'Força',
      thumbnail: '/placeholder.svg',
      descricao: 'Movimento fundamental para fortalecimento das pernas',
      instrucoes: 'Mantenha os pés paralelos, desça até formar 90 graus...',
      biblioteca: 'global'
    },
    {
      id: 3,
      nome: 'Corrida na Esteira',
      grupoMuscular: 'Cardio',
      equipamento: 'Esteira',
      nivel: 'Iniciante',
      tipo: 'Cardio',
      thumbnail: '/placeholder.svg',
      descricao: 'Exercício cardiovascular básico',
      instrucoes: 'Ajuste a velocidade e inclinação conforme condicionamento...',
      biblioteca: 'global'
    }
  ];

  const exerciciosPessoais = [
    {
      id: 4,
      nome: 'Variação Burpee Wefit',
      grupoMuscular: 'Corpo todo',
      equipamento: 'Corporal',
      nivel: 'Avançado',
      tipo: 'Funcional',
      thumbnail: '/placeholder.svg',
      descricao: 'Variação personalizada do burpee tradicional',
      instrucoes: 'Inicie em pé, desça em prancha, salto e rotação...',
      biblioteca: 'pessoal'
    },
    {
      id: 5,
      nome: 'Circuito TRX Personalizado',
      grupoMuscular: 'Corpo todo',
      equipamento: 'TRX',
      nivel: 'Intermediário',
      tipo: 'Funcional',
      thumbnail: '/placeholder.svg',
      descricao: 'Sequência de exercícios no TRX criada por mim',
      instrucoes: 'Execute cada movimento por 45 segundos...',
      biblioteca: 'pessoal'
    }
  ];

  const gruposMusculares = ['todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Core', 'Cardio', 'Corpo todo'];

  const exerciciosFiltrados = [...exerciciosGlobal, ...exerciciosPessoais].filter(exercicio => {
    const matchSearch = exercicio.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGrupo = filtroGrupo === 'todos' || exercicio.grupoMuscular === filtroGrupo;
    return matchSearch && matchGrupo;
  });

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante': return 'bg-green-500';
      case 'Intermediário': return 'bg-yellow-500';
      case 'Avançado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Exercícios Wefit</h1>
          <p className="text-gray-600 mt-2">Explore e gerencie exercícios para seus treinos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Exercício
        </Button>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList>
          <TabsTrigger value="todos">Todos os Exercícios</TabsTrigger>
          <TabsTrigger value="global">Biblioteca Global</TabsTrigger>
          <TabsTrigger value="pessoal">Minha Biblioteca</TabsTrigger>
          <TabsTrigger value="unidade">Biblioteca da Unidade</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          {/* Filtros e Busca */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar exercício..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filtroGrupo}
                onChange={(e) => setFiltroGrupo(e.target.value)}
              >
                {gruposMusculares.map(grupo => (
                  <option key={grupo} value={grupo}>
                    {grupo === 'todos' ? 'Todos os grupos' : grupo}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>

          {/* Grid de Exercícios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {exerciciosFiltrados.map((exercicio) => (
              <Card key={exercicio.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedExercicio(exercicio)}>
                <CardHeader className="pb-2">
                  <div className="relative">
                    <img 
                      src={exercicio.thumbnail} 
                      alt={exercicio.nome}
                      className="w-full h-32 object-cover rounded-lg bg-gray-200"
                    />
                    <div className="absolute top-2 right-2">
                      <Button size="sm" className="h-8 w-8 p-0 bg-black bg-opacity-50 hover:bg-opacity-70">
                        <Play className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-white">
                        {exercicio.biblioteca === 'global' ? (
                          <Users className="h-3 w-3 mr-1" />
                        ) : (
                          <BookOpen className="h-3 w-3 mr-1" />
                        )}
                        {exercicio.biblioteca === 'global' ? 'Global' : 'Pessoal'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <CardTitle className="text-lg leading-tight">{exercicio.nome}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {exercicio.grupoMuscular}
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${getNivelColor(exercicio.nivel)}`}></div>
                      <span className="text-xs text-gray-600">{exercicio.nivel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      {exercicio.tipo === 'Cardio' ? (
                        <Heart className="h-3 w-3" />
                      ) : exercicio.tipo === 'Funcional' ? (
                        <Zap className="h-3 w-3" />
                      ) : (
                        <Dumbbell className="h-3 w-3" />
                      )}
                      <span>{exercicio.equipamento}</span>
                    </div>
                    <CardDescription className="text-xs line-clamp-2">
                      {exercicio.descricao}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="global">
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Exercícios da biblioteca global da academia</p>
          </div>
        </TabsContent>

        <TabsContent value="pessoal">
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Seus exercícios personalizados</p>
          </div>
        </TabsContent>

        <TabsContent value="unidade">
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Exercícios compartilhados pela sua unidade</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalhes do Exercício */}
      {selectedExercicio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedExercicio.nome}</CardTitle>
                  <CardDescription>{selectedExercicio.grupoMuscular} • {selectedExercicio.equipamento}</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedExercicio(null)}>
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Imagem/Vídeo */}
                <div className="relative">
                  <img 
                    src={selectedExercicio.thumbnail} 
                    alt={selectedExercicio.nome}
                    className="w-full h-64 object-cover rounded-lg bg-gray-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-black bg-opacity-50 hover:bg-opacity-70">
                      <Play className="h-6 w-6 mr-2 text-white" />
                      Assistir Demonstração
                    </Button>
                  </div>
                </div>

                {/* Informações */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-700">Nível de Dificuldade</div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getNivelColor(selectedExercicio.nivel)}`}></div>
                      {selectedExercicio.nivel}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Tipo de Exercício</div>
                    <div>{selectedExercicio.tipo}</div>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                  <p className="text-gray-700">{selectedExercicio.descricao}</p>
                </div>

                {/* Instruções */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instruções de Execução</h3>
                  <p className="text-gray-700">{selectedExercicio.instrucoes}</p>
                </div>

                {/* Músculos Trabalhados */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Músculos Trabalhados</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{selectedExercicio.grupoMuscular}</Badge>
                    <Badge variant="outline">Músculos secundários</Badge>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button className="flex-1">Adicionar ao Treino</Button>
                  <Button variant="outline" className="flex-1">Favoritar</Button>
                  {selectedExercicio.biblioteca === 'pessoal' && (
                    <Button variant="outline">Editar</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstrutorExercicios;
