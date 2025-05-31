
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InstrutorAlunos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');

  // Dados placeholder dos alunos
  const meusAlunos = [
    {
      id: 1,
      nome: 'Ana Silva',
      email: 'ana.silva@email.com',
      telefone: '(11) 99999-1234',
      plano: 'Premium',
      ultimaAula: '30/05/2024',
      frequencia: 'Alta',
      avaliacaoFisica: '15/05/2024',
      observacoes: 'Boa evolução na resistência'
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      telefone: '(11) 99999-5678',
      plano: 'Básico',
      ultimaAula: '29/05/2024',
      frequencia: 'Média',
      avaliacaoFisica: '10/05/2024',
      observacoes: 'Trabalhar flexibilidade'
    },
    {
      id: 3,
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      telefone: '(11) 99999-9012',
      plano: 'Premium',
      ultimaAula: '31/05/2024',
      frequencia: 'Alta',
      avaliacaoFisica: '20/05/2024',
      observacoes: 'Excelente dedicação'
    }
  ];

  const getFrequenciaColor = (frequencia: string) => {
    switch (frequencia.toLowerCase()) {
      case 'alta':
        return 'bg-green-100 text-green-800';
      case 'média':
        return 'bg-yellow-100 text-yellow-800';
      case 'baixa':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanoColor = (plano: string) => {
    switch (plano.toLowerCase()) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'básico':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlunos = meusAlunos.filter(aluno => {
    const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aluno.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || aluno.plano.toLowerCase() === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meus Alunos</h1>
        <p className="text-gray-600 mt-2">Acompanhe o progresso dos seus alunos</p>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">47</div>
            <div className="text-sm text-gray-600">Total de Alunos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">32</div>
            <div className="text-sm text-gray-600">Frequência Alta</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <div className="text-sm text-gray-600">Frequência Média</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Frequência Baixa</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os planos</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="básico">Básico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Alunos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>
            Alunos que participam das suas aulas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Última Aula</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Última Avaliação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {aluno.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{aluno.nome}</div>
                        <div className="text-sm text-gray-600">{aluno.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanoColor(aluno.plano)}>
                      {aluno.plano}
                    </Badge>
                  </TableCell>
                  <TableCell>{aluno.ultimaAula}</TableCell>
                  <TableCell>
                    <Badge className={getFrequenciaColor(aluno.frequencia)}>
                      {aluno.frequencia}
                    </Badge>
                  </TableCell>
                  <TableCell>{aluno.avaliacaoFisica}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Perfil do Aluno: {aluno.nome}</DialogTitle>
                            <DialogDescription>
                              Informações detalhadas e histórico do aluno
                            </DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="dados" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
                              <TabsTrigger value="frequencia">Frequência</TabsTrigger>
                              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                              <TabsTrigger value="observacoes">Observações</TabsTrigger>
                            </TabsList>
                            <TabsContent value="dados" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Nome Completo</label>
                                  <p className="text-gray-900">{aluno.nome}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-gray-900">{aluno.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Telefone</label>
                                  <p className="text-gray-900">{aluno.telefone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Plano Atual</label>
                                  <Badge className={getPlanoColor(aluno.plano)}>
                                    {aluno.plano}
                                  </Badge>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="frequencia">
                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">85%</div>
                                    <div className="text-sm text-gray-600">Taxa de presença</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">24</div>
                                    <div className="text-sm text-gray-600">Aulas este mês</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">3</div>
                                    <div className="text-sm text-gray-600">Faltas este mês</div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="avaliacoes">
                              <div className="space-y-4">
                                <p className="text-sm text-gray-600">Última avaliação física: {aluno.avaliacaoFisica}</p>
                                <Button>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Agendar Nova Avaliação
                                </Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="observacoes">
                              <div className="space-y-4">
                                <p className="text-gray-900">{aluno.observacoes}</p>
                                <Button variant="outline">
                                  Adicionar Observação
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstrutorAlunos;
