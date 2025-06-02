
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, User, Calendar, MessageCircle, TrendingUp, Users, Target, Award } from 'lucide-react';

const InstrutorAlunos: React.FC = () => {
  const [selectedAluno, setSelectedAluno] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const alunosIndividuais = [
    {
      id: 1,
      nome: 'Maria Silva',
      email: 'maria.silva@email.com',
      foto: '/placeholder.svg',
      planoAtual: 'Programa Emagrecimento 8 semanas',
      ultimoTreino: '2024-01-14',
      proximaAvaliacao: '2024-01-20',
      frequenciaSemanal: 4,
      metaPrincipal: 'Perder 5kg em 2 meses',
      progresso: 75
    },
    {
      id: 2,
      nome: 'João Santos',
      email: 'joao.santos@email.com',
      foto: '/placeholder.svg',
      planoAtual: 'Programa Hipertrofia Iniciante',
      ultimoTreino: '2024-01-13',
      proximaAvaliacao: '2024-01-25',
      frequenciaSemanal: 3,
      metaPrincipal: 'Ganhar 3kg de massa muscular',
      progresso: 45
    },
    {
      id: 3,
      nome: 'Ana Costa',
      email: 'ana.costa@email.com',
      foto: '/placeholder.svg',
      planoAtual: 'Programa Condicionamento',
      ultimoTreino: '2024-01-12',
      proximaAvaliacao: '2024-02-01',
      frequenciaSemanal: 5,
      metaPrincipal: 'Melhorar resistência cardiovascular',
      progresso: 60
    }
  ];

  const gruposDesafios = [
    {
      id: 1,
      nome: 'Desafio Janeiro Ativo',
      participantes: 15,
      periodo: '01/01/2024 - 31/01/2024',
      tipo: 'Desafio',
      objetivo: '20 treinos no mês',
      progressoGeral: 68
    },
    {
      id: 2,
      nome: 'Grupo Emagrecimento',
      participantes: 8,
      periodo: 'Ongoing',
      tipo: 'Grupo',
      objetivo: 'Perda de peso saudável',
      progressoGeral: 82
    }
  ];

  const alunosAtencao = [
    { nome: 'Carlos Mendes', motivo: 'Baixa frequência (1 treino na semana)', tipo: 'frequency' },
    { nome: 'Lucia Ferreira', motivo: '2 mensagens não lidas', tipo: 'message' },
    { nome: 'Roberto Lima', motivo: 'Meta próxima de ser atingida (95%)', tipo: 'goal' }
  ];

  const filteredAlunos = alunosIndividuais.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Alunos e Grupos</h1>
          <p className="text-gray-600 mt-2">Acompanhe o progresso e engajamento dos seus alunos</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Criar Novo Grupo
        </Button>
      </div>

      {/* Alertas - Alunos que Requerem Atenção */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-500" />
            Alunos que Requerem Atenção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alunosAtencao.map((aluno, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    aluno.tipo === 'frequency' ? 'bg-red-500' : 
                    aluno.tipo === 'message' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{aluno.nome}</div>
                    <div className="text-sm text-gray-600">{aluno.motivo}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Ver Perfil</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="individuais" className="w-full">
        <TabsList>
          <TabsTrigger value="individuais">Alunos Individuais</TabsTrigger>
          <TabsTrigger value="grupos">Grupos e Desafios</TabsTrigger>
        </TabsList>

        {/* Alunos Individuais */}
        <TabsContent value="individuais" className="space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar aluno..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lista de Alunos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlunos.map((aluno) => (
              <Card key={aluno.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAluno(aluno)}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={aluno.foto} />
                      <AvatarFallback>{aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{aluno.nome}</CardTitle>
                      <CardDescription className="text-sm">{aluno.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Plano Atual</div>
                      <div className="text-sm text-blue-600">{aluno.planoAtual}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Último Treino</div>
                        <div>{new Date(aluno.ultimoTreino).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Frequência</div>
                        <div>{aluno.frequenciaSemanal}x/semana</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Progresso da Meta</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${aluno.progresso}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{aluno.progresso}% concluído</div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <User className="h-3 w-3 mr-1" />
                        Perfil
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Grupos e Desafios */}
        <TabsContent value="grupos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gruposDesafios.map((grupo) => (
              <Card key={grupo.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{grupo.nome}</CardTitle>
                      <CardDescription>{grupo.objetivo}</CardDescription>
                    </div>
                    <Badge variant={grupo.tipo === 'Desafio' ? 'default' : 'secondary'}>
                      {grupo.tipo}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Participantes</div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          {grupo.participantes}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Período</div>
                        <div>{grupo.periodo}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Progresso Geral</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${grupo.progressoGeral}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{grupo.progressoGeral}% do objetivo alcançado</div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">Ver Detalhes</Button>
                      <Button size="sm" variant="outline" className="flex-1">Mensagem Grupo</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Perfil Completo do Aluno */}
      {selectedAluno && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedAluno.foto} />
                    <AvatarFallback>{selectedAluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{selectedAluno.nome}</CardTitle>
                    <CardDescription>{selectedAluno.email}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedAluno(null)}>
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="visao-geral" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
                  <TabsTrigger value="treinos">Planos de Treino</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                  <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                  <TabsTrigger value="metas">Metas e Hábitos</TabsTrigger>
                </TabsList>

                <TabsContent value="visao-geral" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Frequência Semanal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedAluno.frequenciaSemanal}x</div>
                        <p className="text-xs text-muted-foreground">por semana</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Progresso da Meta</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedAluno.progresso}%</div>
                        <p className="text-xs text-muted-foreground">concluído</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Próxima Avaliação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-bold">{new Date(selectedAluno.proximaAvaliacao).toLocaleDateString('pt-BR')}</div>
                        <p className="text-xs text-muted-foreground">em 6 dias</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="treinos" className="space-y-4">
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Planos de treino do aluno</p>
                  </div>
                </TabsContent>

                <TabsContent value="historico" className="space-y-4">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Histórico de treinos realizados</p>
                  </div>
                </TabsContent>

                <TabsContent value="avaliacoes" className="space-y-4">
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Avaliações físicas</p>
                  </div>
                </TabsContent>

                <TabsContent value="metas" className="space-y-4">
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Metas e hábitos do aluno</p>
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

export default InstrutorAlunos;
