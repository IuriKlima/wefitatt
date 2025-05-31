
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Mail, Phone, Edit, Eye, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Instrutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  especialidades: string[];
  avaliacao: number;
  aulasSemanais: number;
  foto?: string;
}

const GestorInstrutores: React.FC = () => {
  const [instrutores] = useState<Instrutor[]>([
    {
      id: 1,
      nome: 'Carlos Silva',
      email: 'carlos.silva@wefit.com',
      telefone: '(11) 99999-1234',
      especialidades: ['Spinning', 'Cardio', 'HIIT'],
      avaliacao: 4.8,
      aulasSemanais: 15,
    },
    {
      id: 2,
      nome: 'Ana Santos',
      email: 'ana.santos@wefit.com',
      telefone: '(11) 99999-5678',
      especialidades: ['Musculação', 'Funcional', 'TRX'],
      avaliacao: 4.9,
      aulasSemanais: 18,
    },
    {
      id: 3,
      nome: 'Marina Costa',
      email: 'marina.costa@wefit.com',
      telefone: '(11) 99999-9012',
      especialidades: ['Yoga', 'Pilates', 'Relaxamento'],
      avaliacao: 4.7,
      aulasSemanais: 12,
    },
    {
      id: 4,
      nome: 'Roberto Lima',
      email: 'roberto.lima@wefit.com',
      telefone: '(11) 99999-3456',
      especialidades: ['Crossfit', 'Funcional', 'Boxe'],
      avaliacao: 4.6,
      aulasSemanais: 20,
    },
  ]);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalAgendaAberto, setModalAgendaAberto] = useState(false);
  const [instrutorSelecionado, setInstrutorSelecionado] = useState<Instrutor | null>(null);

  const form = useForm({
    defaultValues: {
      especialidades: [] as string[],
      telefone: '',
      email: '',
    },
  });

  const especialidadesDisponiveis = [
    'Spinning', 'Musculação', 'Yoga', 'Pilates', 'Crossfit', 'Funcional',
    'Cardio', 'HIIT', 'TRX', 'Boxe', 'Zumba', 'Natação', 'Relaxamento'
  ];

  const aulasDoInstrutor = [
    { id: 1, nome: 'Spinning', data: '30/05', horario: '07:00', inscritos: 18, capacidade: 20 },
    { id: 2, nome: 'Cardio HIIT', data: '30/05', horario: '18:00', inscritos: 15, capacidade: 18 },
    { id: 3, nome: 'Spinning', data: '31/05', horario: '07:00', inscritos: 20, capacidade: 20 },
    { id: 4, nome: 'Spinning', data: '01/06', horario: '07:00', inscritos: 16, capacidade: 20 },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleEditarInstrutor = (instrutor: Instrutor) => {
    setInstrutorSelecionado(instrutor);
    form.setValue('especialidades', instrutor.especialidades);
    form.setValue('telefone', instrutor.telefone);
    form.setValue('email', instrutor.email);
    setModalEditarAberto(true);
  };

  const handleVerAgenda = (instrutor: Instrutor) => {
    setInstrutorSelecionado(instrutor);
    setModalAgendaAberto(true);
  };

  const handleSalvarEdicao = (data: any) => {
    console.log('Salvando edição do instrutor:', data);
    setModalEditarAberto(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Instrutores da Unidade: Wefit Centro</h1>
        <p className="text-gray-600 mt-2">Gestão da equipe de instrutores da unidade</p>
      </div>

      {/* Grid de Instrutores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instrutores.map((instrutor) => (
          <Card key={instrutor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={instrutor.foto} />
                <AvatarFallback className="text-lg">
                  {instrutor.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <CardTitle className="text-lg">{instrutor.nome}</CardTitle>
              
              <div className="flex items-center justify-center gap-1 mt-2">
                {renderStars(Math.floor(instrutor.avaliacao))}
                <span className="text-sm text-gray-600 ml-1">
                  {instrutor.avaliacao.toFixed(1)}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Especialidades */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Especialidades</h4>
                <div className="flex flex-wrap gap-1">
                  {instrutor.especialidades.map((especialidade) => (
                    <Badge key={especialidade} variant="secondary" className="text-xs">
                      {especialidade}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{instrutor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{instrutor.telefone}</span>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Aulas/semana:</span>
                  <span className="font-medium">{instrutor.aulasSemanais}</span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleVerAgenda(instrutor)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Agenda
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditarInstrutor(instrutor)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{instrutores.length}</div>
              <div className="text-sm text-gray-600">Total de Instrutores</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {instrutores.reduce((acc, i) => acc + i.aulasSemanais, 0)}
              </div>
              <div className="text-sm text-gray-600">Aulas por Semana</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(instrutores.reduce((acc, i) => acc + i.avaliacao, 0) / instrutores.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Array.from(new Set(instrutores.flatMap(i => i.especialidades))).length}
              </div>
              <div className="text-sm text-gray-600">Especialidades Cobertas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Editar Instrutor */}
      <Dialog open={modalEditarAberto} onOpenChange={setModalEditarAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Informações: {instrutorSelecionado?.nome}</DialogTitle>
            <DialogDescription>
              Edite as especialidades e informações de contato do instrutor
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarEdicao)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="instrutor@wefit.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="especialidades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidades</FormLabel>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {especialidadesDisponiveis.map((especialidade) => (
                        <label key={especialidade} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={field.value?.includes(especialidade)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, especialidade]);
                              } else {
                                field.onChange(currentValue.filter(v => v !== especialidade));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{especialidade}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalEditarAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Ver Agenda do Instrutor */}
      <Dialog open={modalAgendaAberto} onOpenChange={setModalAgendaAberto}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agenda: {instrutorSelecionado?.nome}
            </DialogTitle>
            <DialogDescription>
              Aulas programadas para este instrutor
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {aulasDoInstrutor.map((aula) => (
              <div key={aula.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{aula.horario}</div>
                    <div className="text-xs text-gray-500">{aula.data}</div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{aula.nome}</h3>
                    <p className="text-sm text-gray-600">
                      {aula.inscritos}/{aula.capacidade} alunos inscritos
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={aula.inscritos >= aula.capacidade ? 'destructive' : 'default'}>
                    {Math.round((aula.inscritos / aula.capacidade) * 100)}% ocupado
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {aulasDoInstrutor.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma aula programada para este instrutor
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorInstrutores;
