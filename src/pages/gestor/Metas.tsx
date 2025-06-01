
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Trophy, TrendingUp, Users, DollarSign, Star, Award } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Meta {
  id: number;
  nome: string;
  valor: number;
  valorAtual: number;
  periodo: string;
  status: 'em-andamento' | 'concluida' | 'atrasada';
  tipo: string;
}

interface MembroEquipe {
  id: number;
  nome: string;
  cargo: string;
  pontos: number;
  posicao: number;
  badges: string[];
  foto?: string;
}

const GestorMetas: React.FC = () => {
  const [metas] = useState<Meta[]>([
    {
      id: 1,
      nome: 'Novas Matrículas',
      valor: 50,
      valorAtual: 32,
      periodo: 'Dezembro 2024',
      status: 'em-andamento',
      tipo: 'matriculas'
    },
    {
      id: 2,
      nome: 'Taxa de Retenção',
      valor: 85,
      valorAtual: 78,
      periodo: 'Dezembro 2024',
      status: 'atrasada',
      tipo: 'percentual'
    },
    {
      id: 3,
      nome: 'Ticket Médio',
      valor: 150,
      valorAtual: 168,
      periodo: 'Dezembro 2024',
      status: 'concluida',
      tipo: 'valor'
    },
    {
      id: 4,
      nome: 'NPS da Unidade',
      valor: 70,
      valorAtual: 72,
      periodo: 'Dezembro 2024',
      status: 'concluida',
      tipo: 'nps'
    }
  ]);

  const [ranking] = useState<MembroEquipe[]>([
    {
      id: 1,
      nome: 'Ana Silva',
      cargo: 'Instrutora Senior',
      pontos: 2450,
      posicao: 1,
      badges: ['Melhor Avaliada', 'Inovadora'],
      foto: undefined
    },
    {
      id: 2,
      nome: 'Carlos Lima',
      cargo: 'Instrutor',
      pontos: 2150,
      posicao: 2,
      badges: ['Motivador', 'Pontual'],
      foto: undefined
    },
    {
      id: 3,
      nome: 'Marina Costa',
      cargo: 'Recepcionista',
      pontos: 1980,
      posicao: 3,
      badges: ['Atendimento 5 Estrelas'],
      foto: undefined
    },
    {
      id: 4,
      nome: 'Roberto Santos',
      cargo: 'Instrutor',
      pontos: 1750,
      posicao: 4,
      badges: ['Técnico'],
      foto: undefined
    }
  ]);

  const [modalAberto, setModalAberto] = useState(false);

  const form = useForm({
    defaultValues: {
      nome: '',
      tipo: '',
      valor: '',
      periodo: '',
      descricao: ''
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'default';
      case 'em-andamento': return 'secondary';
      case 'atrasada': return 'destructive';
      default: return 'default';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-green-500';
      case 'em-andamento': return 'bg-blue-500';
      case 'atrasada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const calcularProgresso = (meta: Meta) => {
    return Math.min((meta.valorAtual / meta.valor) * 100, 100);
  };

  const formatarValor = (valor: number, tipo: string) => {
    switch (tipo) {
      case 'valor': return `R$ ${valor.toFixed(2)}`;
      case 'percentual': return `${valor}%`;
      case 'nps': return `${valor} pts`;
      default: return valor.toString();
    }
  };

  const handleSalvarMeta = (data: any) => {
    console.log('Salvando meta:', data);
    setModalAberto(false);
    form.reset();
  };

  const getPosicaoIcon = (posicao: number) => {
    switch (posicao) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-600">#{posicao}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metas e Performance da Equipe</h1>
          <p className="text-gray-600 mt-2">Acompanhe o desempenho da unidade e da equipe</p>
        </div>
        <Button onClick={() => setModalAberto(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {/* Cards de Metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metas.map((meta) => (
          <Card key={meta.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <Target className="h-5 w-5 text-wefit-primary" />
                <Badge variant={getStatusColor(meta.status) as any}>
                  {meta.status === 'concluida' ? 'Concluída' : 
                   meta.status === 'em-andamento' ? 'Em Andamento' : 'Atrasada'}
                </Badge>
              </div>
              <CardTitle className="text-lg">{meta.nome}</CardTitle>
              <CardDescription>{meta.periodo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span className="font-semibold">{formatarValor(meta.valorAtual, meta.tipo)} / {formatarValor(meta.valor, meta.tipo)}</span>
                </div>
                <Progress 
                  value={calcularProgresso(meta)} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500">
                  {calcularProgresso(meta).toFixed(1)}% da meta
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranking da Equipe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Ranking da Equipe - Dezembro
            </CardTitle>
            <CardDescription>Pontuação baseada em feedback dos alunos e performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ranking.map((membro) => (
                <div key={membro.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getPosicaoIcon(membro.posicao)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={membro.foto} />
                      <AvatarFallback>{membro.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{membro.nome}</div>
                      <div className="text-sm text-gray-500">{membro.cargo}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-wefit-primary">{membro.pontos} pts</div>
                    <div className="flex gap-1 mt-1">
                      {membro.badges.slice(0, 2).map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conquistas da Equipe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Conquistas da Equipe
            </CardTitle>
            <CardDescription>Badges e reconhecimentos desbloqueados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-medium">Meta Mensal</div>
                <div className="text-sm text-gray-500">3 metas concluídas</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="font-medium">Trabalho em Equipe</div>
                <div className="text-sm text-gray-500">NPS > 70</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="font-medium">Crescimento</div>
                <div className="text-sm text-gray-500">+20% matrículas</div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-gray-50">
                <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium text-gray-500">Receita Plus</div>
                <div className="text-sm text-gray-400">Em progresso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Criar Meta */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Meta</DialogTitle>
            <DialogDescription>
              Defina uma nova meta para a unidade
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarMeta)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Meta</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Novas Matrículas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Meta</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="matriculas">Número (Matrículas)</SelectItem>
                          <SelectItem value="percentual">Percentual (%)</SelectItem>
                          <SelectItem value="valor">Valor (R$)</SelectItem>
                          <SelectItem value="nps">NPS (Pontos)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor da Meta</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 50" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="periodo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="janeiro-2025">Janeiro 2025</SelectItem>
                        <SelectItem value="fevereiro-2025">Fevereiro 2025</SelectItem>
                        <SelectItem value="q1-2025">Q1 2025</SelectItem>
                        <SelectItem value="semestre-1-2025">1º Semestre 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Detalhes sobre a meta..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Criar Meta
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorMetas;
