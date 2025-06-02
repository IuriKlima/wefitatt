
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, PartyPopper, Plus, Users, MapPin, Clock, DollarSign, Eye, Edit, Trash2, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Evento {
  id: number;
  nome: string;
  descricao: string;
  dataHora: string;
  local: string;
  instrutor: string;
  vagas: number;
  vagasOcupadas: number;
  preco: number;
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
  imagem?: string;
}

interface Inscrito {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataInscricao: string;
  statusPagamento: 'pago' | 'pendente' | 'isento';
  foto?: string;
}

const GestorEventos: React.FC = () => {
  const [eventos] = useState<Evento[]>([
    {
      id: 1,
      nome: 'Workshop de Yoga Avançada',
      descricao: 'Workshop intensivo de técnicas avançadas de yoga com certificado de participação.',
      dataHora: '2024-12-15T09:00:00',
      local: 'Sala Zen - Piso Superior',
      instrutor: 'Ana Silva',
      vagas: 20,
      vagasOcupadas: 15,
      preco: 89.90,
      status: 'agendado'
    },
    {
      id: 2,
      nome: 'Desafio Crossfit de Natal',
      descricao: 'Competição amigável de crossfit com premiação e confraternização.',
      dataHora: '2024-12-20T18:00:00',
      local: 'Área de Crossfit',
      instrutor: 'Carlos Lima',
      vagas: 30,
      vagasOcupadas: 28,
      preco: 0,
      status: 'agendado'
    },
    {
      id: 3,
      nome: 'Aula de Dança Fitness',
      descricao: 'Sessão especial de dança fitness com ritmos latinos.',
      dataHora: '2024-12-10T19:30:00',
      local: 'Estúdio Principal',
      instrutor: 'Marina Costa',
      vagas: 25,
      vagasOcupadas: 25,
      preco: 35.00,
      status: 'concluido'
    }
  ]);

  const [inscritos] = useState<Inscrito[]>([
    {
      id: 1,
      nome: 'João Santos',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      dataInscricao: '2024-12-01',
      statusPagamento: 'pago'
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      email: 'maria@email.com',
      telefone: '(11) 88888-8888',
      dataInscricao: '2024-12-02',
      statusPagamento: 'pendente'
    },
    {
      id: 3,
      nome: 'Pedro Silva',
      email: 'pedro@email.com',
      telefone: '(11) 77777-7777',
      dataInscricao: '2024-12-03',
      statusPagamento: 'pago'
    }
  ]);

  const [modalEventoAberto, setModalEventoAberto] = useState(false);
  const [modalInscritosAberto, setModalInscritosAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

  const form = useForm({
    defaultValues: {
      nome: '',
      descricao: '',
      dataHora: '',
      local: '',
      instrutor: '',
      vagas: '',
      preco: '',
      imagem: ''
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'default';
      case 'em-andamento': return 'secondary';
      case 'concluido': return 'outline';
      case 'cancelado': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'agendado': return 'Agendado';
      case 'em-andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const formatarData = (dataHora: string) => {
    const data = new Date(dataHora);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarPreco = (preco: number) => {
    return preco === 0 ? 'Gratuito' : `R$ ${preco.toFixed(2)}`;
  };

  const handleSalvarEvento = (data: any) => {
    console.log('Salvando evento:', data);
    setModalEventoAberto(false);
    form.reset();
  };

  const handleVerInscritos = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalInscritosAberto(true);
  };

  const getStatusPagamentoColor = (status: string) => {
    switch (status) {
      case 'pago': return 'default';
      case 'pendente': return 'destructive';
      case 'isento': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos Especiais Wefit</h1>
          <p className="text-gray-600 mt-2">Gerencie workshops, competições e eventos especiais da unidade</p>
        </div>
        <Button onClick={() => setModalEventoAberto(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Cards de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <Card key={evento.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <PartyPopper className="h-6 w-6 text-wefit-primary" />
                <Badge variant={getStatusColor(evento.status) as any}>
                  {getStatusLabel(evento.status)}
                </Badge>
              </div>
              <CardTitle className="text-lg">{evento.nome}</CardTitle>
              <CardDescription className="line-clamp-2">{evento.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{formatarData(evento.dataHora)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{evento.local}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{evento.vagasOcupadas}/{evento.vagas} inscritos</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{formatarPreco(evento.preco)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleVerInscritos(evento)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Inscritos
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Criar/Editar Evento */}
      <Dialog open={modalEventoAberto} onOpenChange={setModalEventoAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Evento</DialogTitle>
            <DialogDescription>
              Preencha as informações do evento especial
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarEvento)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Evento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Workshop de Yoga Avançada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva o evento, o que será abordado..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataHora"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data e Hora</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="local"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Sala Zen - Piso Superior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="instrutor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrutor</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ana-silva">Ana Silva</SelectItem>
                          <SelectItem value="carlos-lima">Carlos Lima</SelectItem>
                          <SelectItem value="marina-costa">Marina Costa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vagas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Vagas</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 20" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input placeholder="0 para gratuito" type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalEventoAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Criar Evento
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Inscritos */}
      <Dialog open={modalInscritosAberto} onOpenChange={setModalInscritosAberto}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Inscritos - {eventoSelecionado?.nome}</DialogTitle>
            <DialogDescription>
              Gerencie os participantes inscritos no evento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {inscritos.length} inscritos de {eventoSelecionado?.vagas} vagas
              </div>
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Enviar Lembrete
              </Button>
            </div>

            <div className="space-y-3">
              {inscritos.map((inscrito) => (
                <div key={inscrito.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={inscrito.foto} />
                      <AvatarFallback>{inscrito.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{inscrito.nome}</div>
                      <div className="text-sm text-gray-500">{inscrito.email}</div>
                      <div className="text-sm text-gray-500">{inscrito.telefone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusPagamentoColor(inscrito.statusPagamento) as any}>
                      {inscrito.statusPagamento === 'pago' ? 'Pago' : 
                       inscrito.statusPagamento === 'pendente' ? 'Pendente' : 'Isento'}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      Inscrito em {new Date(inscrito.dataInscricao).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorEventos;
