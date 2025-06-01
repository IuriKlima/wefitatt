
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  User,
  CheckCircle
} from 'lucide-react';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque?: number;
}

interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  subtotal: number;
}

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
}

const RecepcionistaPOS: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [desconto, setDesconto] = useState<{tipo: 'percentual' | 'valor', valor: number}>({tipo: 'percentual', valor: 0});
  const [formaPagamento, setFormaPagamento] = useState<string>('');
  const [vendaFinalizada, setVendaFinalizada] = useState(false);

  // Dados simulados
  const produtos: Produto[] = [
    { id: 1, nome: 'Água Mineral 500ml', categoria: 'bebidas', preco: 3.50, estoque: 50 },
    { id: 2, nome: 'Isotônico Laranja', categoria: 'bebidas', preco: 8.90, estoque: 25 },
    { id: 3, nome: 'Shake Proteico Baunilha', categoria: 'suplementos', preco: 15.90, estoque: 20 },
    { id: 4, nome: 'Camiseta Wefit Preta', categoria: 'vestuario', preco: 45.00, estoque: 15 },
    { id: 5, nome: 'Toalha Wefit', categoria: 'acessorios', preco: 35.00, estoque: 10 },
    { id: 6, nome: 'Aula Avulsa', categoria: 'servicos', preco: 25.00 },
    { id: 7, nome: 'Avaliação Física Avulsa', categoria: 'servicos', preco: 50.00 },
    { id: 8, nome: 'Personal Trainer (1h)', categoria: 'servicos', preco: 120.00 },
    { id: 9, nome: 'Barra de Proteína', categoria: 'alimentacao', preco: 12.50, estoque: 30 },
    { id: 10, nome: 'Squeeze Wefit 750ml', categoria: 'acessorios', preco: 25.00, estoque: 12 }
  ];

  const alunos: Aluno[] = [
    { id: 1, nome: 'Maria Silva Santos', matricula: '2024001' },
    { id: 2, nome: 'João Santos Oliveira', matricula: '2024002' },
    { id: 3, nome: 'Ana Costa Lima', matricula: '2024003' }
  ];

  const categorias = [
    { value: 'todas', label: 'Todas Categorias' },
    { value: 'bebidas', label: 'Bebidas' },
    { value: 'suplementos', label: 'Suplementos' },
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'vestuario', label: 'Vestuário' },
    { value: 'acessorios', label: 'Acessórios' },
    { value: 'servicos', label: 'Serviços' }
  ];

  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemExistente = carrinho.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
      setCarrinho(carrinho.map(item => 
        item.produto.id === produto.id 
          ? { 
              ...item, 
              quantidade: item.quantidade + 1,
              subtotal: (item.quantidade + 1) * produto.preco
            }
          : item
      ));
    } else {
      setCarrinho([...carrinho, {
        produto,
        quantidade: 1,
        subtotal: produto.preco
      }]);
    }
  };

  const alterarQuantidade = (produtoId: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }

    setCarrinho(carrinho.map(item => 
      item.produto.id === produtoId
        ? {
            ...item,
            quantidade: novaQuantidade,
            subtotal: novaQuantidade * item.produto.preco
          }
        : item
    ));
  };

  const removerDoCarrinho = (produtoId: number) => {
    setCarrinho(carrinho.filter(item => item.produto.id !== produtoId));
  };

  const calcularTotal = () => {
    const subtotal = carrinho.reduce((total, item) => total + item.subtotal, 0);
    
    if (desconto.valor <= 0) return subtotal;
    
    if (desconto.tipo === 'percentual') {
      return subtotal - (subtotal * desconto.valor / 100);
    } else {
      return Math.max(0, subtotal - desconto.valor);
    }
  };

  const finalizarVenda = () => {
    if (carrinho.length === 0) {
      alert('Carrinho vazio!');
      return;
    }

    if (!formaPagamento) {
      alert('Selecione a forma de pagamento!');
      return;
    }

    setVendaFinalizada(true);
    
    // Simular impressão/registro
    console.log('Venda finalizada:', {
      aluno: alunoSelecionado,
      itens: carrinho,
      total: calcularTotal(),
      desconto,
      formaPagamento,
      timestamp: new Date()
    });
  };

  const novaVenda = () => {
    setCarrinho([]);
    setAlunoSelecionado(null);
    setDesconto({tipo: 'percentual', valor: 0});
    setFormaPagamento('');
    setVendaFinalizada(false);
    setBusca('');
  };

  if (vendaFinalizada) {
    return (
      <div className="space-y-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            
            <div>
              <h2 className="text-2xl font-bold text-green-700">Venda Finalizada!</h2>
              <p className="text-gray-600 mt-2">Pagamento registrado com sucesso</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Resumo da Venda</h3>
              <div className="space-y-2 text-sm">
                {alunoSelecionado && (
                  <p><strong>Cliente:</strong> {alunoSelecionado.nome}</p>
                )}
                <p><strong>Total:</strong> R$ {calcularTotal().toFixed(2)}</p>
                <p><strong>Forma de Pagamento:</strong> {formaPagamento}</p>
                <p><strong>Data/Hora:</strong> {new Date().toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={() => window.print()} className="w-full">
                <Receipt className="h-4 w-4 mr-2" />
                Imprimir Recibo
              </Button>
              
              <Button variant="outline" onClick={novaVenda} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Nova Venda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ponto de Venda (POS)</h1>
          <p className="text-gray-600 mt-2">Sistema de vendas e registros de pagamento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produtos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Busca e Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos e Serviços</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Associar Cliente (Opcional) */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Associar à conta do aluno (opcional)
                </label>
                <Select value={alunoSelecionado?.id.toString() || ''} onValueChange={(value) => {
                  const aluno = alunos.find(a => a.id.toString() === value);
                  setAlunoSelecionado(aluno || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Venda sem associação</SelectItem>
                    {alunos.map((aluno) => (
                      <SelectItem key={aluno.id} value={aluno.id.toString()}>
                        {aluno.nome} - {aluno.matricula}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Busca de Produtos */}
              <div>
                <Input
                  placeholder="Buscar produtos e serviços..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lista de Produtos */}
          <Card>
            <CardHeader>
              <CardTitle>Catálogo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {produtosFiltrados.map((produto) => (
                  <div key={produto.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{produto.nome}</h3>
                        <p className="text-sm text-gray-600 capitalize">{produto.categoria}</p>
                        <p className="text-lg font-bold text-green-600">
                          R$ {produto.preco.toFixed(2)}
                        </p>
                      </div>
                      {produto.estoque !== undefined && (
                        <Badge variant="outline" className="text-xs">
                          Est: {produto.estoque}
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => adicionarAoCarrinho(produto)}
                      className="w-full"
                      size="sm"
                      disabled={produto.estoque === 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carrinho e Pagamento */}
        <div className="space-y-6">
          {/* Carrinho */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrinho
              </CardTitle>
            </CardHeader>
            <CardContent>
              {carrinho.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Carrinho vazio</p>
              ) : (
                <div className="space-y-3">
                  {carrinho.map((item) => (
                    <div key={item.produto.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.produto.nome}</p>
                        <p className="text-xs text-gray-600">
                          R$ {item.produto.preco.toFixed(2)} cada
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantidade}</span>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => removerDoCarrinho(item.produto.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[60px]">
                        <p className="font-semibold text-sm">
                          R$ {item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Desconto */}
          {carrinho.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Desconto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Select 
                    value={desconto.tipo} 
                    onValueChange={(value: 'percentual' | 'valor') => setDesconto({...desconto, tipo: value})}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentual">%</SelectItem>
                      <SelectItem value="valor">R$</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="number"
                    placeholder="0"
                    value={desconto.valor || ''}
                    onChange={(e) => setDesconto({...desconto, valor: parseFloat(e.target.value) || 0})}
                    className="flex-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Total e Pagamento */}
          {carrinho.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {carrinho.reduce((total, item) => total + item.subtotal, 0).toFixed(2)}</span>
                  </div>
                  
                  {desconto.valor > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Desconto:</span>
                      <span>
                        {desconto.tipo === 'percentual' ? `-${desconto.valor}%` : `-R$ ${desconto.valor.toFixed(2)}`}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Forma de Pagamento</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={formaPagamento === 'Dinheiro' ? 'default' : 'outline'}
                      onClick={() => setFormaPagamento('Dinheiro')}
                      className="flex flex-col gap-1 h-16"
                    >
                      <Banknote className="h-5 w-5" />
                      <span className="text-xs">Dinheiro</span>
                    </Button>
                    
                    <Button
                      variant={formaPagamento === 'Cartão de Crédito' ? 'default' : 'outline'}
                      onClick={() => setFormaPagamento('Cartão de Crédito')}
                      className="flex flex-col gap-1 h-16"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">Crédito</span>
                    </Button>
                    
                    <Button
                      variant={formaPagamento === 'Cartão de Débito' ? 'default' : 'outline'}
                      onClick={() => setFormaPagamento('Cartão de Débito')}
                      className="flex flex-col gap-1 h-16"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">Débito</span>
                    </Button>
                    
                    <Button
                      variant={formaPagamento === 'PIX' ? 'default' : 'outline'}
                      onClick={() => setFormaPagamento('PIX')}
                      className="flex flex-col gap-1 h-16"
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">PIX</span>
                    </Button>
                  </div>
                </div>

                <Button onClick={finalizarVenda} className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Finalizar Venda
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecepcionistaPOS;
