
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Star, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AlunoAgendar: React.FC = () => {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroInstrutor, setFiltroInstrutor] = useState('todos');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [aulaDetalhes, setAulaDetalhes] = useState<any>(null);

  const tiposAula = ['Musculação', 'Spinning', 'Yoga', 'Pilates', 'Funcional', 'Dança', 'Natação'];
  const instrutores = ['Ana Costa', 'Carlos Silva', 'Roberto Lima', 'Mariana Santos', 'João Oliveira'];
  const niveis = ['Iniciante', 'Intermediário', 'Avançado'];

  const aulas = [
    {
      id: 1,
      nome: 'Spinning Advanced',
      instrutor: 'Carlos Silva',
      horario: '07:00',
      duracao: 45,
      vagas: 2,
      totalVagas: 20,
      nivel: 'Avançado',
      tipo: 'Spinning',
      sala: 'Sala 2',
      descricao: 'Aula intensa de spinning com foco em resistência e queima de gordura.',
      rating: 4.8,
      data: new Date()
    },
    {
      id: 2,
      nome: 'Yoga Flow',
      instrutor: 'Ana Costa',
      horario: '08:30',
      duracao: 60,
      vagas: 5,
      totalVagas: 15,
      nivel: 'Intermediário',
      tipo: 'Yoga',
      sala: 'Sala 1',
      descricao: 'Sequência fluida de posturas de yoga para flexibilidade e relaxamento.',
      rating: 4.9,
      data: new Date()
    },
    {
      id: 3,
      nome: 'Funcional HIIT',
      instrutor: 'Roberto Lima',
      horario: '18:30',
      duracao: 50,
      vagas: 0,
      totalVagas: 12,
      nivel: 'Intermediário',
      tipo: 'Funcional',
      sala: 'Área Externa',
      descricao: 'Treino funcional de alta intensidade com intervalos.',
      rating: 4.7,
      data: new Date()
    },
    {
      id: 4,
      nome: 'Pilates Iniciante',
      instrutor: 'Mariana Santos',
      horario: '19:30',
      duracao: 55,
      vagas: 8,
      totalVagas: 10,
      nivel: 'Iniciante',
      tipo: 'Pilates',
      sala: 'Sala 3',
      descricao: 'Introdução ao método Pilates com foco na consciência corporal.',
      rating: 4.6,
      data: new Date()
    }
  ];

  const meusAgendamentos = [
    {
      id: 1,
      nome: 'Yoga Flow',
      instrutor: 'Ana Costa',
      data: addDays(new Date(), 1),
      horario: '08:30',
      sala: 'Sala 1'
    },
    {
      id: 2,
      nome: 'Spinning Advanced',
      instrutor: 'Carlos Silva',
      data: addDays(new Date(), 3),
      horario: '07:00',
      sala: 'Sala 2'
    }
  ];

  const aulasFiltradas = aulas.filter(aula => {
    if (filtroTipo !== 'todos' && aula.tipo !== filtroTipo) return false;
    if (filtroInstrutor !== 'todos' && aula.instrutor !== filtroInstrutor) return false;
    if (filtroNivel !== 'todos' && aula.nivel !== filtroNivel) return false;
    return isSameDay(aula.data, dataSelecionada);
  });

  const handleAgendar = (aulaId: number) => {
    console.log('Agendando aula:', aulaId);
    // Simular agendamento
  };

  const handleListaEspera = (aulaId: number) => {
    console.log('Entrando na lista de espera:', aulaId);
    // Simular entrada na lista de espera
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendar Aulas</h1>
          <p className="text-gray-600 mt-1">Encontre e agende suas aulas favoritas na Wefit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário e Filtros */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Selecionar Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={dataSelecionada}
                onSelect={(date) => date && setDataSelecionada(date)}
                locale={ptBR}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Aula</label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    {tiposAula.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instrutor</label>
                <Select value={filtroInstrutor} onValueChange={setFiltroInstrutor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os instrutores</SelectItem>
                    {instrutores.map(instrutor => (
                      <SelectItem key={instrutor} value={instrutor}>{instrutor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nível</label>
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os níveis</SelectItem>
                    {niveis.map(nivel => (
                      <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setFiltroTipo('todos');
                  setFiltroInstrutor('todos');
                  setFiltroNivel('todos');
                }}
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Aulas */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Aulas para {format(dataSelecionada, "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aulasFiltradas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma aula encontrada para os filtros selecionados.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aulasFiltradas.map((aula) => (
                    <div key={aula.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{aula.nome}</h3>
                            <Badge className={getNivelColor(aula.nivel)}>
                              {aula.nivel}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {aula.horario} - {aula.duracao} min
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {aula.vagas} vagas disponíveis de {aula.totalVagas}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {aula.sala}
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                              {aula.rating} - {aula.instrutor}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setAulaDetalhes(aula)}>
                                Ver Detalhes
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>{aulaDetalhes?.nome}</DialogTitle>
                              </DialogHeader>
                              {aulaDetalhes && (
                                <div className="space-y-4">
                                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">Imagem da Aula</span>
                                  </div>
                                  <p className="text-gray-700">{aulaDetalhes.descricao}</p>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <strong>Instrutor:</strong>
                                      <p>{aulaDetalhes.instrutor}</p>
                                    </div>
                                    <div>
                                      <strong>Duração:</strong>
                                      <p>{aulaDetalhes.duracao} minutos</p>
                                    </div>
                                    <div>
                                      <strong>Nível:</strong>
                                      <p>{aulaDetalhes.nivel}</p>
                                    </div>
                                    <div>
                                      <strong>Local:</strong>
                                      <p>{aulaDetalhes.sala}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {aula.vagas > 0 ? (
                            <Button size="sm" onClick={() => handleAgendar(aula.id)}>
                              Agendar
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => handleListaEspera(aula.id)}>
                              Lista de Espera
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Meus Agendamentos */}
          <Card>
            <CardHeader>
              <CardTitle>Meus Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              {meusAgendamentos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Você não tem aulas agendadas.</p>
              ) : (
                <div className="space-y-3">
                  {meusAgendamentos.map((agendamento) => (
                    <div key={agendamento.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{agendamento.nome}</h4>
                        <p className="text-sm text-gray-600">
                          {format(agendamento.data, "dd/MM/yyyy")} às {agendamento.horario} - {agendamento.sala}
                        </p>
                        <p className="text-sm text-gray-600">Com {agendamento.instrutor}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Cancelar
                        </Button>
                        <Button variant="outline" size="sm">
                          + Calendário
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlunoAgendar;
