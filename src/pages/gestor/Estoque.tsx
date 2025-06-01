
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Plus, Search, AlertTriangle, TrendingUp, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Produto {
  id: number;
  nome: string;
  sku: string;
  categoria: string;
  fornecedor: string;
  estoque: number;
  pontoReposicao: number;
  precoVenda: number;
  foto?: string;
  status: 'normal' | 'baixo' | 'critico';
}

interface MovimentoEstoque {
  id: number;
  produtoId: number;
  produtoNome: string;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: string;
  motivo: string;
}

const GestorEstoque: React.FC = () => {
  const [produtos] = useState<Produto[]>([
    {
      id: 1,
      nome: 'Água Mineral 500ml',
      sku: 'WF001',
      categoria: 'Bebidas',
      fornecedor: 'Distribuidora ABC',
      estoque: 45,
      pontoReposicao: 20,
      precoVenda: 3.50,
      status: 'normal'
    },
    {
      id: 2,
      nome: 'Camiseta Wefit Preta M',
      sku: 'WF002',
      categoria: 'Vestuário',
      fornecedor: 'Confecções XYZ',
      estoque: 8,
      pontoReposicao: 10,
      precoVenda: 39.90,
      status: 'baixo'
    },
    {
      id: 3,
      nome: 'Shake Proteico Chocolate',
      sku: 'WF003',
      categoria: 'Suplementos',
      fornecedor: 'Nutri Suplementos',
      estoque: 2,
      pontoReposicao: 5,
      precoVenda: 89.90,
      status: 'critico'
    },
    {
      id: 4,
      nome: 'Toalha Wefit',
      sku: 'WF004',
      categoria: 'Acessórios',
      fornecedor: 'Têxtil Plus',
      estoque: 25,
      pontoReposicao: 15,
      precoVenda: 24.90,
      status: 'normal'
    }
  ]);

  const [movimentos] = useState<MovimentoEstoque[]>([
    {
      id: 1,
      produtoId: 1,
      produtoNome: 'Água Mineral 500ml',
      tipo: 'entrada',
      quantidade: 50,
      data: '2024-12-01',
      motivo: 'Compra - Pedido #123'
    },
    {
      id: 2,
      produtoId: 3,
      produtoNome: 'Shake Proteico Chocolate',
      tipo: 'saida',
      quantidade: 3,
      data: '2024-12-01',
      motivo: 'Venda POS'
    },
    {
      id: 3,
      produtoId: 2,
      produtoNome: 'Camiseta Wefit Preta M',
      tipo: 'saida',
      quantidade: 2,
      data: '2024-11-30',
      motivo: 'Venda POS'
    }
  ]);

  const [busca, setBusca] = useState('');
  const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
  const [modalMovimentoAberto, setModalMovimentoAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const formProduto = useForm({
    defaultValues: {
      nome: '',
      sku: '',
      categoria: '',
      fornecedor: '',
      estoque: '',
      pontoReposicao: '',
      precoVenda: ''
    }
  });

  const formMovimento = useForm({
    defaultValues: {
      produto: '',
      tipo: '',
      quantidade: '',
      motivo: ''
    }
  });

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    produto.sku.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  const produtosBaixoEstoque = produtos.filter(p => p.status === 'baixo' || p.status === 'critico');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'default';
      case 'baixo': return 'secondary';
      case 'critico': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'baixo': return 'Baixo';
      case 'critico': return 'Crítico';
      default: return 'Normal';
    }
  };

  const handleSalvarProduto = (data: any) => {
    console.log('Salvando produto:', data);
    setModalProdutoAberto(false);
    formProduto.reset();
    setProdutoSelecionado(null);
  };

  const handleSalvarMovimento = (data: any) => {
    console.log('Registrando movimento:', data);
    setModalMovimentoAberto(false);
    formMovimento.reset();
  };

  const handleEditarProduto = (produto: Produto) => {
    setProdutoSelecionado(produto);
    formProduto.setValue('nome', produto.nome);
    formProduto.setValue('sku', produto.sku);
    formProduto.setValue('categoria', produto.categoria);
    formProduto.setValue('fornecedor', produto.fornecedor);
    formProduto.setValue('estoque', produto.estoque.toString());
    formProduto.setValue('pontoReposicao', produto.pontoReposicao.toString());
    formProduto.setValue('precoVenda', produto.precoVenda.toString());
    setModalProdutoAberto(true);
  };

  const valorTotalEstoque = produtos.reduce((total, produto) => total + (produto.estoque * produto.precoVenda), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Estoque</h1>
          <p className="text-gray-600 mt-2">Controle de produtos e movimentações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setModalMovimentoAberto(true)}>
            <ArrowUp className="h-4 w-4 mr-2" />
            Registrar Movimento
          </Button>
          <Button onClick={() => { setProdutoSelecionado(null); formProduto.reset(); setModalProdutoAberto(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <div className="text-2xl font-bold">{produtos.length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Valor Total do Estoque</CardTitle>
            <div className="text-2xl font-bold">R$ {valorTotalEstoque.toFixed(2)}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Estoque Baixo
            </CardTitle>
            <div className="text-2xl font-bold text-yellow-600">{produtosBaixoEstoque.filter(p => p.status === 'baixo').length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Estoque Crítico
            </CardTitle>
            <div className="text-2xl font-bold text-red-600">{produtosBaixoEstoque.filter(p => p.status === 'critico').length}</div>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="produtos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="movimentos">Movimentações</TabsTrigger>
          <TabsTrigger value="alertas">Alertas de Reposição</TabsTrigger>
        </TabsList>

        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Lista de Produtos</CardTitle>
                  <CardDescription>Gerencie o catálogo de produtos da unidade</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar produtos..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtosFiltrados.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produto.nome}</div>
                          <div className="text-sm text-gray-500">{produto.fornecedor}</div>
                        </div>
                      </TableCell>
                      <TableCell>{produto.sku}</TableCell>
                      <TableCell>{produto.categoria}</TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{produto.estoque}</span>
                          <div className="text-xs text-gray-500">Mín: {produto.pontoReposicao}</div>
                        </div>
                      </TableCell>
                      <TableCell>R$ {produto.precoVenda.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(produto.status) as any}>
                          {getStatusText(produto.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditarProduto(produto)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimentos">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Movimentações</CardTitle>
              <CardDescription>Registro de entradas e saídas do estoque</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimentos.map((movimento) => (
                    <TableRow key={movimento.id}>
                      <TableCell>{new Date(movimento.data).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{movimento.produtoNome}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {movimento.tipo === 'entrada' ? (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={movimento.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}>
                            {movimento.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{movimento.quantidade}</TableCell>
                      <TableCell>{movimento.motivo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Produtos Necessitando Reposição
              </CardTitle>
              <CardDescription>Produtos abaixo do ponto de reposição</CardDescription>
            </CardHeader>
            <CardContent>
              {produtosBaixoEstoque.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Todos os produtos estão com estoque adequado!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {produtosBaixoEstoque.map((produto) => (
                    <div key={produto.id} className={`p-4 border rounded-lg ${
                      produto.status === 'critico' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{produto.nome}</h4>
                          <p className="text-sm text-gray-600">SKU: {produto.sku} | Categoria: {produto.categoria}</p>
                          <p className="text-sm">
                            <span className={produto.status === 'critico' ? 'text-red-600' : 'text-yellow-600'}>
                              Estoque atual: {produto.estoque} unidades
                            </span>
                            <span className="text-gray-500 ml-2">
                              (Mínimo: {produto.pontoReposicao})
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Solicitar Reposição
                          </Button>
                          <Button size="sm" onClick={() => handleEditarProduto(produto)}>
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Adicionar/Editar Produto */}
      <Dialog open={modalProdutoAberto} onOpenChange={setModalProdutoAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {produtoSelecionado ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </DialogTitle>
            <DialogDescription>
              {produtoSelecionado ? 'Edite as informações do produto' : 'Preencha as informações do novo produto'}
            </DialogDescription>
          </DialogHeader>
          <Form {...formProduto}>
            <form onSubmit={formProduto.handleSubmit(handleSalvarProduto)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formProduto.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Água Mineral 500ml" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formProduto.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: WF001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formProduto.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bebidas">Bebidas</SelectItem>
                          <SelectItem value="vestuario">Vestuário</SelectItem>
                          <SelectItem value="suplementos">Suplementos</SelectItem>
                          <SelectItem value="acessorios">Acessórios</SelectItem>
                          <SelectItem value="equipamentos">Equipamentos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formProduto.control}
                  name="fornecedor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fornecedor</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Distribuidora ABC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={formProduto.control}
                  name="estoque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque Atual</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formProduto.control}
                  name="pontoReposicao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ponto de Reposição</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formProduto.control}
                  name="precoVenda"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço de Venda</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalProdutoAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {produtoSelecionado ? 'Atualizar Produto' : 'Salvar Produto'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Registrar Movimento */}
      <Dialog open={modalMovimentoAberto} onOpenChange={setModalMovimentoAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Movimento de Estoque</DialogTitle>
            <DialogDescription>
              Registre uma entrada ou saída de produtos
            </DialogDescription>
          </DialogHeader>
          <Form {...formMovimento}>
            <form onSubmit={formMovimento.handleSubmit(handleSalvarMovimento)} className="space-y-4">
              <FormField
                control={formMovimento.control}
                name="produto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {produtos.map((produto) => (
                          <SelectItem key={produto.id} value={produto.id.toString()}>
                            {produto.nome} (SKU: {produto.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={formMovimento.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Movimento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entrada">Entrada</SelectItem>
                          <SelectItem value="saida">Saída</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMovimento.control}
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={formMovimento.control}
                name="motivo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivo/Observação</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Compra - Pedido #123, Venda POS, Ajuste de inventário..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalMovimentoAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Registrar Movimento
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestorEstoque;
