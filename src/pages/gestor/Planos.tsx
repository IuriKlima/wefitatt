
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Archive, Users, TrendingUp, Calendar, Gift } from 'lucide-react';

interface Plano {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  precoPromocional?: number;
  descricao: string;
  alunosAtivos: number;
  status: 'ativo' | 'arquivado';
  modalidades: string[];
  limiteSemanal?: number;
  visivel: boolean;
}

const GestorPlanos: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ativos');
  const [modalPlanoAberto, setModalPlanoAberto] = useState(false);
  const [modalPromocaoAberto, setModalPromocaoAberto] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<Plano | null>(null);

  const form = useForm({
    defaultValues: {
      nome: '',
      tipo: '',
      preco: '',
      precoPromocional: '',
      descricao: '',
      modalidades: [],
      limiteSemanal: '',
      visivel: true,
      taxaMatricula: '',
      fidelidade: false,
      duracaoFidelidade: '',
      multaCancelamento: '',
    },
  });

  const [planosAtivos] = useState<Plano[]>([
    {
      id: 1,
      nome: 'Wefit Fit Manhã',
      tipo: 'Mensal',
      preco: 89.90,
      precoPromocional: 69.90,
      descricao: 'Acesso completo no período da manhã (06h às 12h)',
      alunosAtivos: 45,
      status: 'ativo',
      modalidades: ['Musculação', 'Spinning', 'Yoga'],
      limiteSemanal: 5,
      visivel: true,
    },
    {
      id: 2,
      nome: 'Plano Black Anual',
      tipo: 'Anual',
      preco: 999.90,
      descricao: 'Acesso completo ilimitado por 12 meses',
      alunosAtivos: 78,
      status: 'ativo',
      modalidades: ['Todas as modalidades'],
      visivel: true,
    },
    {
      id: 3,
      nome: 'Pacote 10 Aulas de Yoga',
      tipo: 'Pacote',
      preco: 300.00,
      descricao: 'Pacote de 10 aulas de Yoga válido por 90 dias',
      alunosAtivos: 23,
      status: 'ativo',
      modalidades: ['Yoga'],
      limiteSemanal: 2,
      visivel: true,
    },
  ]);

  const [planosArquivados] = useState<Plano[]>([
    {
      id: 4,
      nome: 'Plano Verão 2023',
      tipo: 'Trimestral',
      preco: 199.90,
      descricao: 'Plano promocional de verão (descontinuado)',
      alunosAtivos: 12,
      status: 'arquivado',
      modalidades: ['Musculação', 'Funcional'],
      visivel: false,
    },
  ]);

  const modalidadesDisponiveis = [
    'Musculação',
    'Spinning',
    'Yoga',
    'Pilates',
    'CrossFit',
    'Funcional',
    'Dança',
    'Lutas',
  ];

  const handleCriarPlano = (data: any) => {
    console.log('Criando plano:', data);
    setModalPlanoAberto(false);
    form.reset();
  };

  const handleEditarPlano = (plano: Plano) => {
    setPlanoSelecionado(plano);
    form.setValue('nome', plano.nome);
    form.setValue('tipo', plano.tipo);
    form.setValue('preco', plano.preco.toString());
    form.setValue('descricao', plano.descricao);
    setModalPlanoAberto(true);
  };

  const handleCriarPromocao = (plano: Plano) => {
    setPlanoSelecionado(plano);
    setModalPromocaoAberto(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Planos de Assinatura da Academia: Wefit Centro</h1>
        <p className="text-gray-600 mt-2">Gerencie os planos oferecidos pela sua unidade</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="ativos">Planos Ativos</TabsTrigger>
                <TabsTrigger value="arquivados">Planos Arquivados</TabsTrigger>
              </TabsList>
              
              <Button onClick={() => { setPlanoSelecionado(null); form.reset(); setModalPlanoAberto(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Plano
              </Button>
            </div>

            <TabsContent value="ativos" className="space-y-4">
              <div className="grid gap-4">
                {planosAtivos.map((plano) => (
                  <Card key={plano.id} className="relative">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {plano.nome}
                            {plano.precoPromocional && (
                              <Badge variant="destructive" className="text-xs">
                                PROMOÇÃO
                              </Badge>
                            )}
                            {plano.visivel && (
                              <Badge variant="default" className="text-xs">
                                VISÍVEL ONLINE
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{plano.descricao}</CardDescription>
                        </div>
                        <div className="text-right">
                          {plano.precoPromocional ? (
                            <div>
                              <span className="text-sm text-gray-500 line-through">
                                R$ {plano.preco.toFixed(2)}
                              </span>
                              <p className="text-2xl font-bold text-green-600">
                                R$ {plano.precoPromocional.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-2xl font-bold">R$ {plano.preco.toFixed(2)}</p>
                          )}
                          <p className="text-sm text-gray-500">{plano.tipo}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{plano.alunosAtivos} alunos ativos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>
                              {plano.limiteSemanal ? `${plano.limiteSemanal}x/semana` : 'Ilimitado'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Modalidades: </span>
                            <span className="font-medium">{plano.modalidades.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditarPlano(plano)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCriarPromocao(plano)}>
                            <Gift className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arquivados" className="space-y-4">
              <div className="grid gap-4">
                {planosArquivados.map((plano) => (
                  <Card key={plano.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {plano.nome}
                            <Badge variant="secondary" className="text-xs">
                              ARQUIVADO
                            </Badge>
                          </CardTitle>
                          <CardDescription>{plano.descricao}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-600">R$ {plano.preco.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">{plano.tipo}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{plano.alunosAtivos} alunos ainda ativos</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Modalidades: </span>
                            <span className="font-medium">{plano.modalidades.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Reativar
                          </Button>
                          <Button variant="outline" size="sm">
                            Ver Histórico
                          </Button>
                          <Button variant="destructive" size="sm">
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal de Criar/Editar Plano */}
      <Dialog open={modalPlanoAberto} onOpenChange={setModalPlanoAberto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {planoSelecionado ? `Editar Plano: ${planoSelecionado.nome}` : 'Criar Novo Plano'}
            </DialogTitle>
            <DialogDescription>
              {planoSelecionado ? 'Edite as informações do plano' : 'Configure um novo plano de assinatura'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCriarPlano)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Plano</FormLabel>
                      <FormControl>
                        <Input placeholder="Wefit Premium Mensal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Plano</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mensal">Mensal</SelectItem>
                          <SelectItem value="bimestral">Bimestral</SelectItem>
                          <SelectItem value="trimestral">Trimestral</SelectItem>
                          <SelectItem value="semestral">Semestral</SelectItem>
                          <SelectItem value="anual">Anual</SelectItem>
                          <SelectItem value="pacote">Pacote de Aulas</SelectItem>
                          <SelectItem value="day-use">Diário/Day Use</SelectItem>
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
                    <FormLabel>Descrição Detalhada do Plano</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o que o plano inclui, benefícios, público-alvo..."
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="preco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Regular (R$)</FormLabel>
                      <FormControl>
                        <Input placeholder="99,90" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="precoPromocional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Promocional (R$)</FormLabel>
                      <FormControl>
                        <Input placeholder="79,90 (opcional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taxaMatricula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa de Matrícula (R$)</FormLabel>
                      <FormControl>
                        <Input placeholder="50,00 (opcional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormLabel>Modalidades Inclusas</FormLabel>
                <div className="grid grid-cols-4 gap-2">
                  {modalidadesDisponiveis.map((modalidade) => (
                    <div key={modalidade} className="flex items-center space-x-2">
                      <Checkbox id={modalidade} />
                      <Label htmlFor={modalidade} className="text-sm">{modalidade}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="limiteSemanal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limite de Aulas por Semana</FormLabel>
                      <FormControl>
                        <Input placeholder="5 (deixe vazio para ilimitado)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="visivel" />
                    <Label htmlFor="visivel">Visível para compra online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fidelidade" />
                    <Label htmlFor="fidelidade">Requer contrato de fidelidade</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setModalPlanoAberto(false)}>
                  Cancelar
                </Button>
                <Button type="button" variant="outline">
                  Salvar como Rascunho
                </Button>
                <Button type="submit">
                  Salvar e Publicar Plano
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Criar Promoção */}
      <Dialog open={modalPromocaoAberto} onOpenChange={setModalPromocaoAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Promoção: {planoSelecionado?.nome}</DialogTitle>
            <DialogDescription>Configure uma promoção especial para este plano</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tipoPromocao">Tipo de Promoção</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desconto-percentual">Desconto percentual</SelectItem>
                  <SelectItem value="desconto-fixo">Desconto fixo em R$</SelectItem>
                  <SelectItem value="isencao-matricula">Isenção de matrícula</SelectItem>
                  <SelectItem value="primeiros-meses">Desconto nos primeiros meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valorDesconto">Valor do Desconto</Label>
                <Input placeholder="20% ou R$ 30,00" />
              </div>
              <div>
                <Label htmlFor="codigoCupom">Código do Cupom</Label>
                <Input placeholder="PROMO20 (opcional)" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dataInicio">Data de Início</Label>
                <Input type="date" />
              </div>
              <div>
                <Label htmlFor="dataFim">Data de Fim</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setModalPromocaoAberto(false)}>
                Cancelar
              </Button>
              <Button>
                Ativar Promoção
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorPlanos;
