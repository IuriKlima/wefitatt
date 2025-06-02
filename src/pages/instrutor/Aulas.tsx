
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';

const InstrutorAulas: React.FC = () => {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [selectedAula, setSelectedAula] = useState<any>(null);

  const proximasAulas = [
    {
      id: 1,
      nome: 'Yoga Matinal',
      horario: '07:00 - 08:00',
      data: '2024-01-15',
      sala: 'Sala 1',
      capacidade: 20,
      inscritos: 18,
      status: 'agendada',
      tipo: 'Yoga'
    },
    {
      id: 2,
      nome: 'CrossFit Intenso',
      horario: '18:30 - 19:30',
      data: '2024-01-15',
      sala: 'Box CrossFit',
      capacidade: 15,
      inscritos: 15,
      status: 'lotada',
      tipo: 'CrossFit'
    },
    {
      id: 3,
      nome: 'Pilates Intermediário',
      horario: '09:00 - 10:00',
      data: '2024-01-16',
      sala: 'Sala 2',
      capacidade: 12,
      inscritos: 8,
      status: 'agendada',
      tipo: 'Pilates'
    }
  ];

  const alunosPresentes = [
    { id: 1, nome: 'Maria Silva', presente: true },
    { id: 2, nome: 'João Santos', presente: true },
    { id: 3, nome: 'Ana Costa', presente: false },
    { id: 4, nome: 'Pedro Lima', presente: true },
    { id: 5, nome: 'Carla Mendes', presente: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'default';
      case 'lotada': return 'destructive';
      case 'cancelada': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Aulas Agendadas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas aulas e acompanhe a participação dos alunos</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={view === 'week' ? 'default' : 'outline'}
            onClick={() => setView('week')}
          >
            Semana
          </Button>
          <Button 
            variant={view === 'month' ? 'default' : 'outline'}
            onClick={() => setView('month')}
          >
            Mês
          </Button>
        </div>
      </div>

      {/* Próximas Aulas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Próximas Aulas (Hoje e Amanhã)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proximasAulas.map((aula) => (
              <Card key={aula.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAula(aula)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{aula.nome}</CardTitle>
                    <Badge variant={getStatusColor(aula.status) as any}>
                      {aula.status === 'agendada' ? 'Agendada' : aula.status === 'lotada' ? 'Lotada' : 'Cancelada'}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-blue-600 font-medium">{aula.tipo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {new Date(aula.data).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      {aula.horario}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {aula.sala}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      {aula.inscritos}/{aula.capacidade} inscritos
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-100 rounded-lg p-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(aula.inscritos / aula.capacidade) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 text-center">
                      {Math.round((aula.inscritos / aula.capacidade) * 100)}% ocupação
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes da Aula */}
      {selectedAula && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedAula.nome}</CardTitle>
                  <CardDescription>{selectedAula.tipo} • {selectedAula.sala}</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedAula(null)}>
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Informações da Aula */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-700">Data e Horário</div>
                    <div>{new Date(selectedAula.data).toLocaleDateString('pt-BR')} • {selectedAula.horario}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Ocupação</div>
                    <div>{selectedAula.inscritos}/{selectedAula.capacidade} alunos</div>
                  </div>
                </div>

                {/* Lista de Presença */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Registrar Presença</h3>
                  <div className="space-y-2">
                    {alunosPresentes.map((aluno) => (
                      <div key={aluno.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="font-medium">{aluno.nome}</div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={aluno.presente ? "default" : "outline"}
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={!aluno.presente ? "destructive" : "outline"}
                            className="h-8 w-8 p-0"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback Pós-Aula */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notas da Aula</h3>
                  <textarea 
                    className="w-full p-3 border rounded-lg resize-none h-24"
                    placeholder="Adicione suas observações sobre a aula (participação, dificuldades, sucessos, etc.)"
                  />
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button className="flex-1">Salvar Lista de Presença</Button>
                  <Button variant="outline" className="flex-1">Remarcar Aula</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendário de Aulas (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Calendário de Aulas - {view === 'week' ? 'Visão Semanal' : 'Visão Mensal'}</CardTitle>
          <CardDescription>Visualize todas as suas aulas agendadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4" />
              <p>Calendário interativo de aulas</p>
              <p className="text-sm">(Arrastar e soltar para reagendar)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstrutorAulas;
