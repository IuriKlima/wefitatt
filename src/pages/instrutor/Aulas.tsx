
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InstrutorAulas: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Dados placeholder das aulas
  const minhasAulas = [
    {
      id: 1,
      nome: 'Spinning Avançado',
      horario: '07:00 - 08:00',
      data: '2024-05-31',
      sala: 'Sala 1',
      capacidade: 20,
      inscritos: 18,
      status: 'confirmada',
      observacoes: 'Trazer toalha e garrafa d\'água'
    },
    {
      id: 2,
      nome: 'Crossfit Iniciante',
      horario: '09:00 - 10:00',
      data: '2024-05-31',
      sala: 'Área Externa',
      capacidade: 15,
      inscritos: 12,
      status: 'confirmada',
      observacoes: 'Foco em movimentos básicos'
    },
    {
      id: 3,
      nome: 'Yoga Flow',
      horario: '18:00 - 19:00',
      data: '2024-05-31',
      sala: 'Sala 2',
      capacidade: 25,
      inscritos: 22,
      status: 'confirmada',
      observacoes: 'Aula para todos os níveis'
    },
    {
      id: 4,
      nome: 'HIIT Intenso',
      horario: '19:30 - 20:30',
      data: '2024-05-31',
      sala: 'Sala 1',
      capacidade: 12,
      inscritos: 10,
      status: 'confirmada',
      observacoes: 'Treino de alta intensidade'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      case 'reagendada':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOcupacaoColor = (inscritos: number, capacidade: number) => {
    const percentual = (inscritos / capacidade) * 100;
    if (percentual >= 90) return 'text-red-600';
    if (percentual >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Aulas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas aulas e horários</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Aula
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Nova Aula</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar uma nova aula
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome da Aula</Label>
                <Input id="nome" placeholder="Ex: Spinning Avançado" />
              </div>
              <div>
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" />
              </div>
              <div>
                <Label htmlFor="inicio">Horário de Início</Label>
                <Input id="inicio" type="time" />
              </div>
              <div>
                <Label htmlFor="fim">Horário de Término</Label>
                <Input id="fim" type="time" />
              </div>
              <div>
                <Label htmlFor="sala">Sala/Local</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a sala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sala1">Sala 1</SelectItem>
                    <SelectItem value="sala2">Sala 2</SelectItem>
                    <SelectItem value="externa">Área Externa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="capacidade">Capacidade Máxima</Label>
                <Input id="capacidade" type="number" placeholder="20" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Instruções especiais, equipamentos necessários..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Agendar Aula</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtro por Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtrar por Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <Button variant="outline">Hoje</Button>
            <Button variant="outline">Próximos 7 dias</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Aulas */}
      <div className="grid gap-4">
        {minhasAulas.map((aula) => (
          <Card key={aula.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{aula.nome}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(aula.data).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {aula.horario}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {aula.sala}
                    </span>
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(aula.status)}>
                  {aula.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className={`font-medium ${getOcupacaoColor(aula.inscritos, aula.capacidade)}`}>
                      {aula.inscritos}/{aula.capacidade} alunos
                    </span>
                  </div>
                  {aula.observacoes && (
                    <span className="text-sm text-gray-600">
                      {aula.observacoes}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    Ver Alunos
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo Semanal */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Semana</CardTitle>
          <CardDescription>Estatísticas das suas aulas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <div className="text-sm text-gray-600">Aulas agendadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">456</div>
              <div className="text-sm text-gray-600">Total de alunos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-600">Taxa de ocupação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <div className="text-sm text-gray-600">Avaliação média</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstrutorAulas;
