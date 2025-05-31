
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Users, Plus, Edit, X, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Aula {
  id: number;
  nome: string;
  instrutor: string;
  data: string;
  horario: string;
  duracao: number;
  capacidade: number;
  inscritos: number;
  ambiente: string;
  descricao?: string;
  tipo: string;
}

const GestorGradeAulas: React.FC = () => {
  const [visaoCalendario, setVisaoCalendario] = useState<'semanal' | 'mensal'>('semanal');
  const [modalAulaAberto, setModalAulaAberto] = useState(false);
  const [modalInscritosAberto, setModalInscritosAberto] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  const [aulas] = useState<Aula[]>([
    {
      id: 1,
      nome: 'Spinning',
      instrutor: 'Carlos Silva',
      data: '2024-05-30',
      horario: '07:00',
      duracao: 45,
      capacidade: 20,
      inscritos: 18,
      ambiente: 'Sala 1',
      tipo: 'Cardio',
      descricao: 'Aula de spinning para todos os níveis'
    },
    {
      id: 2,
      nome: 'Musculação Funcional',
      instrutor: 'Ana Santos',
      data: '2024-05-30',
      horario: '08:00',
      duracao: 60,
      capacidade: 15,
      inscritos: 12,
      ambiente: 'Academia',
      tipo: 'Força',
      descricao: 'Treino funcional com foco em força'
    },
    {
      id: 3,
      nome: 'Yoga',
      instrutor: 'Marina Costa',
      data: '2024-05-30',
      horario: '18:00',
      duracao: 60,
      capacidade: 25,
      inscritos: 20,
      ambiente: 'Sala 2',
      tipo: 'Relaxamento',
      descricao: 'Yoga para relaxamento e flexibilidade'
    },
    {
      id: 4,
      nome: 'Crossfit',
      instrutor: 'Roberto Lima',
      data: '2024-05-30',
      horario: '19:00',
      duracao: 50,
      capacidade: 18,
      inscritos: 17,
      ambiente: 'Box Crossfit',
      tipo: 'HIIT',
      descricao: 'Treino de alta intensidade'
    },
  ]);

  const form = useForm({
    defaultValues: {
      nome: '',
      instrutor: '',
      data: '',
      horario: '',
      duracao: 60,
      capacidade: 20,
      ambiente: '',
      descricao: '',
      recorrente: false,
      diasSemana: [] as string[],
      dataTermino: '',
    },
  });

  const diasSemana = [
    { id: 'segunda', label: 'Segunda-feira' },
    { id: 'terca', label: 'Terça-feira' },
    { id: 'quarta', label: 'Quarta-feira' },
    { id: 'quinta', label: 'Quinta-feira' },
    { id: 'sexta', label: 'Sexta-feira' },
    { id: 'sabado', label: 'Sábado' },
    { id: 'domingo', label: 'Domingo' },
  ];

  const horarios = Array.from({ length: 15 }, (_, i) => {
    const hora = 6 + i;
    return `${hora.toString().padStart(2, '0')}:00`;
  });

  const getStatusColor = (inscritos: number, capacidade: number) => {
    const percentual = (inscritos / capacidade) * 100;
    if (percentual >= 90) return 'destructive';
    if (percentual >= 70) return 'secondary';
    return 'default';
  };

  const handleSalvarAula = (data: any) => {
    console.log('Salvando aula:', data);
    setModalAulaAberto(false);
    setModoEdicao(false);
    form.reset();
  };

  const handleEditarAula = (aula: Aula) => {
    setAulaSelecionada(aula);
    setModoEdicao(true);
    form.setValue('nome', aula.nome);
    form.setValue('instrutor', aula.instrutor);
    form.setValue('data', aula.data);
    form.setValue('horario', aula.horario);
    form.setValue('duracao', aula.duracao);
    form.setValue('capacidade', aula.capacidade);
    form.setValue('ambiente', aula.ambiente);
    form.setValue('descricao', aula.descricao || '');
    setModalAulaAberto(true);
  };

  const handleVerInscritos = (aula: Aula) => {
    setAulaSelecionada(aula);
    setModalInscritosAberto(true);
  };

  const alunosInscritos = [
    { id: 1, nome: 'Ana Silva Santos', plano: 'Premium' },
    { id: 2, nome: 'Carlos Eduardo Lima', plano: 'Básico' },
    { id: 3, nome: 'Mariana Costa Oliveira', plano: 'VIP' },
    { id: 4, nome: 'Roberto Ferreira', plano: 'Básico' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grade de Aulas: Wefit Centro</h1>
          <p className="text-gray-600 mt-2">Programação e gestão das aulas da unidade</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={visaoCalendario} onValueChange={(value: 'semanal' | 'mensal') => setVisaoCalendario(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => { setModoEdicao(false); form.reset(); setModalAulaAberto(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Aula
          </Button>
        </div>
      </div>

      {/* Grade de Horários */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Programação {visaoCalendario === 'semanal' ? 'Semanal' : 'Mensal'}
          </CardTitle>
          <CardDescription>
            {visaoCalendario === 'semanal' ? 'Visão da semana atual' : 'Visão do mês atual'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            {/* Header com horários */}
            <div className="font-medium text-center p-2">Horário</div>
            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(dia => (
              <div key={dia} className="font-medium text-center p-2">{dia}</div>
            ))}
            
            {/* Linhas de horários */}
            {horarios.map(horario => (
              <React.Fragment key={horario}>
                <div className="text-sm text-gray-600 p-2 text-center">{horario}</div>
                {Array.from({ length: 7 }, (_, diaIndex) => {
                  const aulaDoHorario = aulas.find(a => 
                    a.horario === horario && 
                    new Date(a.data).getDay() === (diaIndex + 1) % 7
                  );
                  
                  return (
                    <div key={diaIndex} className="min-h-[80px] border border-gray-200 rounded p-1">
                      {aulaDoHorario ? (
                        <div 
                          className="bg-purple-100 border border-purple-300 rounded p-2 cursor-pointer hover:bg-purple-200 transition-colors h-full"
                          onClick={() => handleEditarAula(aulaDoHorario)}
                        >
                          <div className="text-xs font-medium text-purple-800">{aulaDoHorario.nome}</div>
                          <div className="text-xs text-purple-600">{aulaDoHorario.instrutor}</div>
                          <div className="text-xs text-purple-600 mt-1">
                            {aulaDoHorario.inscritos}/{aulaDoHorario.capacidade}
                          </div>
                          <Badge 
                            variant={getStatusColor(aulaDoHorario.inscritos, aulaDoHorario.capacidade) as any}
                            className="text-xs mt-1"
                          >
                            {Math.round((aulaDoHorario.inscritos / aulaDoHorario.capacidade) * 100)}%
                          </Badge>
                        </div>
                      ) : (
                        <div 
                          className="h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                          onClick={() => {
                            setModoEdicao(false);
                            form.reset();
                            form.setValue('horario', horario);
                            setModalAulaAberto(true);
                          }}
                        >
                          <Plus className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Aulas do Dia */}
      <Card>
        <CardHeader>
          <CardTitle>Aulas de Hoje</CardTitle>
          <CardDescription>Programação detalhada para hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aulas.map((aula) => (
              <div key={aula.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{aula.horario}</div>
                    <div className="text-xs text-gray-500">{aula.duracao}min</div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{aula.nome}</h3>
                    <p className="text-sm text-gray-600">Instrutor: {aula.instrutor}</p>
                    <p className="text-sm text-gray-600">{aula.ambiente}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4" />
                      {aula.inscritos}/{aula.capacidade}
                    </div>
                    <Badge variant={getStatusColor(aula.inscritos, aula.capacidade) as any}>
                      {Math.round((aula.inscritos / aula.capacidade) * 100)}%
                    </Badge>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleVerInscritos(aula)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditarAula(aula)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Adicionar/Editar Aula */}
      <Dialog open={modalAulaAberto} onOpenChange={setModalAulaAberto}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modoEdicao ? `Editar Aula: ${aulaSelecionada?.nome}` : 'Adicionar Nova Aula'}
            </DialogTitle>
            <DialogDescription>
              {modoEdicao ? 'Edite as informações da aula' : 'Configure uma nova aula na grade'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarAula)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Aula</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de aula" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="spinning">Spinning</SelectItem>
                          <SelectItem value="musculacao">Musculação Funcional</SelectItem>
                          <SelectItem value="yoga">Yoga</SelectItem>
                          <SelectItem value="pilates">Pilates</SelectItem>
                          <SelectItem value="crossfit">Crossfit</SelectItem>
                          <SelectItem value="zumba">Zumba</SelectItem>
                          <SelectItem value="boxe">Boxe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instrutor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrutor Responsável</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o instrutor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="carlos-silva">Carlos Silva</SelectItem>
                          <SelectItem value="ana-santos">Ana Santos</SelectItem>
                          <SelectItem value="marina-costa">Marina Costa</SelectItem>
                          <SelectItem value="roberto-lima">Roberto Lima</SelectItem>
                          <SelectItem value="julia-ferreira">Julia Ferreira</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário de Início</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horarios.map(horario => (
                            <SelectItem key={horario} value={horario}>{horario}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração (minutos)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="capacidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacidade Máxima</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ambiente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ambiente/Sala</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o ambiente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sala-1">Sala 1</SelectItem>
                          <SelectItem value="sala-2">Sala 2</SelectItem>
                          <SelectItem value="academia">Academia Principal</SelectItem>
                          <SelectItem value="box-crossfit">Box Crossfit</SelectItem>
                          <SelectItem value="piscina">Piscina</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da Aula (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição detalhada da aula..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Configurações de Recorrência */}
              <div className="space-y-4 border-t pt-4">
                <FormField
                  control={form.control}
                  name="recorrente"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Repetir esta aula semanalmente
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch('recorrente') && (
                  <>
                    <div>
                      <FormLabel>Dias da Semana</FormLabel>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {diasSemana.map((dia) => (
                          <FormField
                            key={dia.id}
                            control={form.control}
                            name="diasSemana"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(dia.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, dia.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== dia.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {dia.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="dataTermino"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Término da Recorrência</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalAulaAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {modoEdicao ? 'Atualizar Aula' : 'Salvar Aula'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Lista de Inscritos */}
      <Dialog open={modalInscritosAberto} onOpenChange={setModalInscritosAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alunos Inscritos: {aulaSelecionada?.nome}</DialogTitle>
            <DialogDescription>
              Lista de alunos inscritos nesta aula
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {aulaSelecionada?.inscritos}/{aulaSelecionada?.capacidade} vagas ocupadas
              </span>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Aluno
              </Button>
            </div>
            
            <div className="space-y-2">
              {alunosInscritos.map((aluno) => (
                <div key={aluno.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{aluno.nome}</span>
                    <Badge variant="outline" className="ml-2">{aluno.plano}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorGradeAulas;
