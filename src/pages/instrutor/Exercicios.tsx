
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter, Play, Eye, Edit, Heart, Timer, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const InstrutorExercicios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Dados placeholder dos exercícios
  const exercicios = [
    {
      id: 1,
      nome: 'Burpees',
      categoria: 'Cardio',
      dificuldade: 'Intermediário',
      duracao: '30s',
      calorias: '12-15',
      equipamento: 'Peso corporal',
      musculosTrabalho: ['Corpo todo', 'Core', 'Pernas'],
      descricao: 'Exercício completo que combina agachamento, prancha e salto',
      video: 'placeholder-video.mp4',
      instrucoes: ['Comece em pé', 'Agache e apoie as mãos no chão', 'Estenda as pernas para posição de prancha', 'Retorne à posição de agachamento', 'Pule com os braços para cima']
    },
    {
      id: 2,
      nome: 'Prancha',
      categoria: 'Core',
      dificuldade: 'Iniciante',
      duracao: '60s',
      calorias: '3-5',
      equipamento: 'Peso corporal',
      musculosTrabalho: ['Core', 'Ombros', 'Braços'],
      descricao: 'Exercício isométrico para fortalecimento do core',
      video: 'placeholder-video.mp4',
      instrucoes: ['Deite de bruços', 'Apoie antebraços e pontas dos pés', 'Mantenha o corpo reto', 'Contraia o abdômen', 'Respire normalmente']
    },
    {
      id: 3,
      nome: 'Agachamento com Salto',
      categoria: 'Pernas',
      dificuldade: 'Intermediário',
      duracao: '45s',
      calorias: '8-12',
      equipamento: 'Peso corporal',
      musculosTrabalho: ['Quadríceps', 'Glúteos', 'Panturrilhas'],
      descricao: 'Variação do agachamento tradicional com componente pliométrico',
      video: 'placeholder-video.mp4',
      instrucoes: ['Pés na largura dos ombros', 'Agache até 90 graus', 'Salte explosivamente', 'Aterrisse suavemente', 'Repita o movimento']
    }
  ];

  const categorias = ['Cardio', 'Core', 'Pernas', 'Braços', 'Peito', 'Costas', 'Ombros', 'Funcional'];
  const dificuldades = ['Iniciante', 'Intermediário', 'Avançado'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'iniciante':
        return 'bg-green-100 text-green-800';
      case 'intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'cardio': 'bg-pink-100 text-pink-800',
      'core': 'bg-purple-100 text-purple-800',
      'pernas': 'bg-blue-100 text-blue-800',
      'braços': 'bg-orange-100 text-orange-800',
      'peito': 'bg-green-100 text-green-800',
      'costas': 'bg-indigo-100 text-indigo-800',
      'ombros': 'bg-yellow-100 text-yellow-800',
      'funcional': 'bg-gray-100 text-gray-800'
    };
    return colors[category.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredExercicios = exercicios.filter(exercicio => {
    const matchesSearch = exercicio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercicio.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || exercicio.categoria.toLowerCase() === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || exercicio.dificuldade.toLowerCase() === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Exercícios</h1>
          <p className="text-gray-600 mt-2">Explore e gerencie exercícios para seus treinos</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Exercício
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Exercício</DialogTitle>
              <DialogDescription>
                Crie um novo exercício para sua biblioteca
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome do Exercício</Label>
                <Input id="nome" placeholder="Ex: Flexão de braço" />
              </div>
              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dificuldade">Dificuldade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    {dificuldades.map(dif => (
                      <SelectItem key={dif} value={dif.toLowerCase()}>{dif}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duracao">Duração Recomendada</Label>
                <Input id="duracao" placeholder="Ex: 30s ou 12 repetições" />
              </div>
              <div>
                <Label htmlFor="equipamento">Equipamento Necessário</Label>
                <Input id="equipamento" placeholder="Ex: Halteres, peso corporal" />
              </div>
              <div>
                <Label htmlFor="calorias">Calorias (estimativa/min)</Label>
                <Input id="calorias" placeholder="Ex: 8-12" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" placeholder="Breve descrição do exercício..." />
              </div>
              <div className="col-span-2">
                <Label htmlFor="instrucoes">Instruções de Execução</Label>
                <Textarea id="instrucoes" placeholder="Passo a passo da execução..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Exercício</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-gray-600">Total de Exercícios</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Meus Favoritos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Categorias</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600">Criados por mim</div>
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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar exercícios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categorias.map(cat => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as dificuldades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as dificuldades</SelectItem>
                {dificuldades.map(dif => (
                  <SelectItem key={dif} value={dif.toLowerCase()}>{dif}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Exercícios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercicios.map((exercicio) => (
          <Card key={exercicio.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exercicio.nome}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getCategoryColor(exercicio.categoria)}>
                      {exercicio.categoria}
                    </Badge>
                    <Badge className={getDifficultyColor(exercicio.dificuldade)}>
                      {exercicio.dificuldade}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{exercicio.descricao}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4 text-gray-500" />
                  <span>{exercicio.duracao}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span>{exercicio.calorias} cal/min</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Equipamento:</span>
                  <span>{exercicio.equipamento}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Músculos trabalhados:</p>
                <div className="flex flex-wrap gap-1">
                  {exercicio.musculosTrabalho.map((musculo, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {musculo}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Ver Vídeo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{exercicio.nome}</DialogTitle>
                      <DialogDescription>
                        Instruções detalhadas de execução
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <Play className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Vídeo demonstrativo</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Instruções:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                          {exercicio.instrucoes.map((instrucao, index) => (
                            <li key={index} className="text-sm text-gray-700">{instrucao}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstrutorExercicios;
