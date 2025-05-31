
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Calendar, TrendingUp, FileText, Edit, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InstrutorAvaliacoes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Dados placeholder das avaliações
  const avaliacoes = [
    {
      id: 1,
      aluno: 'Ana Silva',
      dataAvaliacao: '20/05/2024',
      proximaAvaliacao: '20/08/2024',
      tipo: 'Completa',
      status: 'Concluída',
      peso: { atual: 65, anterior: 67 },
      altura: 165,
      imc: { atual: 23.9, anterior: 24.6 },
      gorduraCorporal: { atual: 22, anterior: 25 },
      massaMuscular: { atual: 48, anterior: 46 },
      observacoes: 'Boa evolução, foco em manter a dieta'
    },
    {
      id: 2,
      aluno: 'Carlos Santos',
      dataAvaliacao: '15/05/2024',
      proximaAvaliacao: '15/08/2024',
      tipo: 'Básica',
      status: 'Concluída',
      peso: { atual: 78, anterior: 80 },
      altura: 175,
      imc: { atual: 25.5, anterior: 26.1 },
      gorduraCorporal: { atual: 18, anterior: 20 },
      massaMuscular: { atual: 62, anterior: 60 },
      observacoes: 'Excelente progresso no ganho de massa muscular'
    },
    {
      id: 3,
      aluno: 'Maria Oliveira',
      dataAvaliacao: '10/05/2024',
      proximaAvaliacao: '10/08/2024',
      tipo: 'Completa',
      status: 'Pendente',
      peso: { atual: 58, anterior: 55 },
      altura: 160,
      imc: { atual: 22.7, anterior: 21.5 },
      gorduraCorporal: { atual: 20, anterior: 18 },
      massaMuscular: { atual: 44, anterior: 42 },
      observacoes: 'Ganho saudável de peso e massa muscular'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluída':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'agendada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'completa':
        return 'bg-purple-100 text-purple-800';
      case 'básica':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calcularVariacao = (atual: number, anterior: number) => {
    const variacao = atual - anterior;
    const percentual = ((variacao / anterior) * 100).toFixed(1);
    return {
      valor: variacao.toFixed(1),
      percentual,
      cor: variacao >= 0 ? 'text-green-600' : 'text-red-600',
      sinal: variacao >= 0 ? '+' : ''
    };
  };

  const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
    const matchesSearch = avaliacao.aluno.toLowerCase().includes(searchTerm.toLowerCase());
    // Adicionar filtro por período quando necessário
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Avaliações Físicas</h1>
          <p className="text-gray-600 mt-2">Acompanhe o progresso dos seus alunos</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Avaliação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Nova Avaliação Física</DialogTitle>
              <DialogDescription>
                Registre uma nova avaliação física para o aluno
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="dados" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">Dados Básicos</TabsTrigger>
                <TabsTrigger value="medidas">Medidas</TabsTrigger>
                <TabsTrigger value="observacoes">Observações</TabsTrigger>
              </TabsList>
              <TabsContent value="dados" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aluno">Aluno</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o aluno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ana">Ana Silva</SelectItem>
                        <SelectItem value="carlos">Carlos Santos</SelectItem>
                        <SelectItem value="maria">Maria Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="data">Data da Avaliação</Label>
                    <Input id="data" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo de Avaliação</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basica">Básica</SelectItem>
                        <SelectItem value="completa">Completa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="proxima">Próxima Avaliação</Label>
                    <Input id="proxima" type="date" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="medidas" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input id="peso" type="number" step="0.1" placeholder="65.5" />
                  </div>
                  <div>
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input id="altura" type="number" placeholder="165" />
                  </div>
                  <div>
                    <Label htmlFor="gordura">% Gordura Corporal</Label>
                    <Input id="gordura" type="number" step="0.1" placeholder="22.5" />
                  </div>
                  <div>
                    <Label htmlFor="massa">Massa Muscular (kg)</Label>
                    <Input id="massa" type="number" step="0.1" placeholder="48.2" />
                  </div>
                  <div>
                    <Label htmlFor="agua">% Água Corporal</Label>
                    <Input id="agua" type="number" step="0.1" placeholder="55.0" />
                  </div>
                  <div>
                    <Label htmlFor="metabolismo">Met. Basal (kcal)</Label>
                    <Input id="metabolismo" type="number" placeholder="1350" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="observacoes" className="space-y-4">
                <div>
                  <Label htmlFor="observacoes">Observações e Recomendações</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Registre observações sobre a evolução do aluno, recomendações nutricionais, ajustes no treino..."
                    rows={6}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Avaliação</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">47</div>
            <div className="text-sm text-gray-600">Avaliações Realizadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Este Mês</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-gray-600">Agendadas</div>
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
                  placeholder="Buscar por aluno..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="quarter">Últimos 3 meses</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Avaliação
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Avaliações</CardTitle>
          <CardDescription>
            Acompanhe o progresso de todos os seus alunos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Data Avaliação</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Evolução Peso</TableHead>
                <TableHead>Próxima Avaliação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAvaliacoes.map((avaliacao) => {
                const evolucaoPeso = calcularVariacao(avaliacao.peso.atual, avaliacao.peso.anterior);
                return (
                  <TableRow key={avaliacao.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {avaliacao.aluno.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{avaliacao.aluno}</span>
                      </div>
                    </TableCell>
                    <TableCell>{avaliacao.dataAvaliacao}</TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(avaliacao.tipo)}>
                        {avaliacao.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(avaliacao.status)}>
                        {avaliacao.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{avaliacao.peso.atual}kg</span>
                        <span className={`text-sm ${evolucaoPeso.cor}`}>
                          ({evolucaoPeso.sinal}{evolucaoPeso.valor}kg)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{avaliacao.proximaAvaliacao}</TableCell>
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
                              <DialogTitle>Detalhes da Avaliação - {avaliacao.aluno}</DialogTitle>
                              <DialogDescription>
                                Avaliação realizada em {avaliacao.dataAvaliacao}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Medidas Atuais</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Peso</Label>
                                    <p className="text-2xl font-bold">{avaliacao.peso.atual} kg</p>
                                  </div>
                                  <div>
                                    <Label>IMC</Label>
                                    <p className="text-2xl font-bold">{avaliacao.imc.atual}</p>
                                  </div>
                                  <div>
                                    <Label>% Gordura</Label>
                                    <p className="text-2xl font-bold">{avaliacao.gorduraCorporal.atual}%</p>
                                  </div>
                                  <div>
                                    <Label>Massa Muscular</Label>
                                    <p className="text-2xl font-bold">{avaliacao.massaMuscular.atual} kg</p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Evolução</h3>
                                <div className="space-y-3">
                                  {[
                                    { label: 'Peso', atual: avaliacao.peso.atual, anterior: avaliacao.peso.anterior, unidade: 'kg' },
                                    { label: 'IMC', atual: avaliacao.imc.atual, anterior: avaliacao.imc.anterior, unidade: '' },
                                    { label: '% Gordura', atual: avaliacao.gorduraCorporal.atual, anterior: avaliacao.gorduraCorporal.anterior, unidade: '%' },
                                    { label: 'Massa Muscular', atual: avaliacao.massaMuscular.atual, anterior: avaliacao.massaMuscular.anterior, unidade: 'kg' }
                                  ].map((item, index) => {
                                    const variacao = calcularVariacao(item.atual, item.anterior);
                                    return (
                                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="font-medium">{item.label}</span>
                                        <span className={variacao.cor}>
                                          {variacao.sinal}{variacao.valor} {item.unidade} ({variacao.sinal}{variacao.percentual}%)
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="mt-6">
                              <Label>Observações</Label>
                              <p className="text-gray-700 bg-gray-50 p-3 rounded mt-2">
                                {avaliacao.observacoes}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstrutorAvaliacoes;
