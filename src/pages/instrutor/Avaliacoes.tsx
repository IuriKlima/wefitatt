
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Calendar, TrendingUp, Activity, Weight, Ruler, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InstrutorAvaliacoes: React.FC = () => {
  const [selectedAluno, setSelectedAluno] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNovaAvaliacao, setShowNovaAvaliacao] = useState(false);

  const alunos = [
    {
      id: 1,
      nome: 'Maria Silva',
      foto: '/placeholder.svg',
      ultimaAvaliacao: '2024-01-10',
      proximaAvaliacao: '2024-02-10',
      totalAvaliacoes: 3
    },
    {
      id: 2,
      nome: 'João Santos',
      foto: '/placeholder.svg',
      ultimaAvaliacao: '2024-01-08',
      proximaAvaliacao: '2024-02-08',
      totalAvaliacoes: 2
    },
    {
      id: 3,
      nome: 'Ana Costa',
      foto: '/placeholder.svg',
      ultimaAvaliacao: '2024-01-05',
      proximaAvaliacao: '2024-02-05',
      totalAvaliacoes: 4
    }
  ];

  const historicoAvaliacoes = [
    {
      data: '2024-01-10',
      peso: 68.5,
      gordura: 22.5,
      massa: 52.7,
      imc: 24.1
    },
    {
      data: '2023-12-10',
      peso: 70.2,
      gordura: 24.1,
      massa: 51.8,
      imc: 24.7
    },
    {
      data: '2023-11-10',
      peso: 72.0,
      gordura: 25.8,
      massa: 51.2,
      imc: 25.3
    }
  ];

  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Avaliações Físicas</h1>
          <p className="text-gray-600 mt-2">Registre e acompanhe o progresso dos seus alunos</p>
        </div>
        <Button onClick={() => setShowNovaAvaliacao(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      {!selectedAluno ? (
        // Lista de Alunos
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar aluno para avaliação..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alunosFiltrados.map((aluno) => (
              <Card key={aluno.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAluno(aluno)}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={aluno.foto} />
                      <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{aluno.nome}</CardTitle>
                      <CardDescription>{aluno.totalAvaliacoes} avaliações registradas</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Última Avaliação</div>
                        <div>{new Date(aluno.ultimaAvaliacao).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Próxima Agendada</div>
                        <div className="text-blue-600">{new Date(aluno.proximaAvaliacao).toLocaleDateString('pt-BR')}</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Ver Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        // Histórico do Aluno Selecionado
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedAluno(null)}>
              ← Voltar
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedAluno.foto} />
                <AvatarFallback>{selectedAluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{selectedAluno.nome}</h2>
                <p className="text-gray-600">Histórico de Avaliações Físicas</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="evolucao" className="w-full">
            <TabsList>
              <TabsTrigger value="evolucao">Evolução</TabsTrigger>
              <TabsTrigger value="historico">Histórico Completo</TabsTrigger>
              <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
            </TabsList>

            <TabsContent value="evolucao" className="space-y-6">
              {/* Gráficos de Evolução */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Weight className="h-5 w-5 mr-2" />
                      Evolução do Peso
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={historicoAvaliacoes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="peso" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      % Gordura Corporal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={historicoAvaliacoes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="gordura" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Métricas Atuais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Peso Atual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68.5 kg</div>
                    <p className="text-xs text-green-600">-1.7 kg</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">% Gordura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">22.5%</div>
                    <p className="text-xs text-green-600">-1.6%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Massa Magra</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">52.7 kg</div>
                    <p className="text-xs text-green-600">+0.9 kg</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">IMC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.1</div>
                    <p className="text-xs text-gray-600">Normal</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="space-y-4">
              <div className="space-y-4">
                {historicoAvaliacoes.map((avaliacao, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Avaliação - {new Date(avaliacao.data).toLocaleDateString('pt-BR')}</span>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">Peso</div>
                          <div>{avaliacao.peso} kg</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">% Gordura</div>
                          <div>{avaliacao.gordura}%</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Massa Magra</div>
                          <div>{avaliacao.massa} kg</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">IMC</div>
                          <div>{avaliacao.imc}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comparativo" className="space-y-4">
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Comparativo entre avaliações</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Modal de Nova Avaliação */}
      {showNovaAvaliacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Registrar Nova Avaliação Física</CardTitle>
                  <CardDescription>Preencha os dados da avaliação do aluno</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setShowNovaAvaliacao(false)}>
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="anamnese" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
                  <TabsTrigger value="antropometria">Antropometria</TabsTrigger>
                  <TabsTrigger value="circunferencias">Circunferências</TabsTrigger>
                  <TabsTrigger value="testes">Testes Físicos</TabsTrigger>
                  <TabsTrigger value="observacoes">Observações</TabsTrigger>
                </TabsList>

                <TabsContent value="anamnese" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Selecionar Aluno</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>Escolha um aluno...</option>
                        {alunos.map(aluno => (
                          <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Data da Avaliação</label>
                      <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Objetivo Principal</label>
                    <textarea className="w-full p-2 border rounded-lg h-24" placeholder="Descreva o objetivo do aluno..."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Histórico de Lesões</label>
                    <textarea className="w-full p-2 border rounded-lg h-24" placeholder="Descreva histórico de lesões ou limitações..."></textarea>
                  </div>
                </TabsContent>

                <TabsContent value="antropometria" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Peso (kg)</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Altura (cm)</label>
                      <input type="number" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">% Gordura</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Massa Magra (kg)</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="circunferencias" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pescoço (cm)</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tórax (cm)</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cintura (cm)</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quadril (cm)</label>
                      <input type="number" step="0.1" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="testes" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Flexões (quantidade)</label>
                      <input type="number" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Prancha (segundos)</label>
                      <input type="number" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pressão Arterial</label>
                      <input type="text" placeholder="120/80" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">FC Repouso (bpm)</label>
                      <input type="number" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="observacoes" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Observações e Recomendações</label>
                    <textarea className="w-full p-2 border rounded-lg h-32" placeholder="Adicione suas observações e recomendações para o aluno..."></textarea>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNovaAvaliacao(false)}>
                      Cancelar
                    </Button>
                    <Button>
                      Salvar Avaliação
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstrutorAvaliacoes;
