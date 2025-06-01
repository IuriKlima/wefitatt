
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  User,
  CreditCard,
  History,
  QrCode,
  Settings,
  Bell,
  MessageSquare,
  Camera,
  Lock,
  Calendar,
  Download,
  Trash2,
  Star,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AlunoConta: React.FC = () => {
  const [dadosPerfil, setDadosPerfil] = useState({
    nome: 'Maria Silva',
    email: 'maria.silva@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123 - São Paulo/SP',
    dataNascimento: '1990-05-15',
    fotoPerfil: null
  });

  const [notificacoes, setNotificacoes] = useState({
    lembretesAula: true,
    novidadesEmail: true,
    alertasTreino: false,
    promocoes: true
  });

  const planoAtual = {
    nome: 'Plano Premium',
    valor: 149.90,
    ciclo: 'mensal',
    proximoVencimento: new Date(2024, 1, 15),
    status: 'ativo'
  };

  const historicoPage = [
    {
      id: 1,
      data: new Date(2024, 0, 15),
      descricao: 'Mensalidade Plano Premium',
      valor: 149.90,
      status: 'pago',
      recibo: 'REC-2024-001'
    },
    {
      id: 2,
      data: new Date(2023, 11, 15),
      descricao: 'Mensalidade Plano Premium',
      valor: 149.90,
      status: 'pago',
      recibo: 'REC-2023-120'
    },
    {
      id: 3,
      data: new Date(2023, 10, 15),
      descricao: 'Aula Avulsa - Pilates',
      valor: 25.00,
      status: 'pago',
      recibo: 'REC-2023-105'
    }
  ];

  const cartoesPage = [
    {
      id: 1,
      numero: '**** **** **** 1234',
      bandeira: 'Visa',
      validade: '12/26',
      principal: true
    },
    {
      id: 2,
      numero: '**** **** **** 5678',
      bandeira: 'Mastercard',
      validade: '08/25',
      principal: false
    }
  ];

  const feedbacksEnviados = [
    {
      id: 1,
      data: new Date(2024, 0, 18),
      aula: 'Spinning Advanced',
      instrutor: 'Carlos Silva',
      avaliacaoAula: 5,
      avaliacaoInstrutor: 5,
      comentario: 'Aula excelente! Muito motivadora.'
    },
    {
      id: 2,
      data: new Date(2024, 0, 10),
      aula: 'Yoga Flow',
      instrutor: 'Ana Costa',
      avaliacaoAula: 4,
      avaliacaoInstrutor: 5,
      comentario: 'Aula relaxante, gostaria de mais variações.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSalvarPerfil = () => {
    console.log('Salvando perfil:', dadosPerfil);
    // Simular salvamento
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
          <p className="text-gray-600 mt-1">Gerencie seu perfil e configurações da Wefit</p>
        </div>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="plano">Meu Plano</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="carteirinha">Carteirinha</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    {dadosPerfil.fotoPerfil ? (
                      <img src={dadosPerfil.fotoPerfil} alt="Perfil" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <Button size="sm" className="absolute -bottom-2 -right-2" variant="outline">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{dadosPerfil.nome}</h3>
                  <p className="text-gray-600">Membro desde Janeiro 2024</p>
                  <Badge className="mt-1 bg-wefit-primary">Plano Premium</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <Input 
                    value={dadosPerfil.nome}
                    onChange={(e) => setDadosPerfil(prev => ({ ...prev, nome: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    value={dadosPerfil.email}
                    onChange={(e) => setDadosPerfil(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <Input 
                    value={dadosPerfil.telefone}
                    onChange={(e) => setDadosPerfil(prev => ({ ...prev, telefone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Data de Nascimento</label>
                  <Input 
                    type="date"
                    value={dadosPerfil.dataNascimento}
                    onChange={(e) => setDadosPerfil(prev => ({ ...prev, dataNascimento: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Endereço</label>
                  <Input 
                    value={dadosPerfil.endereco}
                    onChange={(e) => setDadosPerfil(prev => ({ ...prev, endereco: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSalvarPerfil}>
                  Salvar Alterações
                </Button>
                <Button variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plano" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Minha Assinatura
                </span>
                <Badge className={getStatusColor(planoAtual.status)}>
                  {planoAtual.status === 'ativo' ? 'Ativo' : planoAtual.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Plano Atual</p>
                  <p className="text-xl font-bold text-wefit-primary">{planoAtual.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor</p>
                  <p className="text-xl font-bold">R$ {planoAtual.valor.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{planoAtual.ciclo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Próximo Vencimento</p>
                  <p className="text-lg font-semibold">
                    {format(planoAtual.proximoVencimento, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-600">Em dia</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Benefícios do seu plano:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Acesso ilimitado à academia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Todas as aulas coletivas incluídas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Acompanhamento com personal trainer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Área de relaxamento e sauna</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline">
                  Ver Outros Planos
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      Cancelar Assinatura
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancelar Assinatura</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">Atenção!</p>
                          <p className="text-sm text-yellow-700">
                            Ao cancelar sua assinatura, você perderá acesso a todos os benefícios do plano no próximo vencimento.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          Voltar
                        </Button>
                        <Button className="flex-1 bg-red-600 hover:bg-red-700">
                          Confirmar Cancelamento
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagamentos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Histórico de Pagamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Histórico de Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicoPage.map((pagamento) => (
                    <div key={pagamento.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{pagamento.descricao}</h4>
                        <p className="text-sm text-gray-600">
                          {format(pagamento.data, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {pagamento.valor.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(pagamento.status)}>
                            {pagamento.status === 'pago' ? 'Pago' : pagamento.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Formas de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Formas de Pagamento
                  </span>
                  <Button size="sm">
                    Adicionar Cartão
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartoesPage.map((cartao) => (
                    <div key={cartao.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{cartao.bandeira}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{cartao.numero}</p>
                          <p className="text-sm text-gray-600">Válido até {cartao.validade}</p>
                          {cartao.principal && (
                            <Badge className="mt-1 bg-wefit-primary">Principal</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!cartao.principal && (
                          <Button size="sm" variant="outline">
                            Tornar Principal
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="carteirinha" className="space-y-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Carteirinha Digital Wefit</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{dadosPerfil.nome}</h3>
                  <p className="text-gray-600">Matrícula: 2024001</p>
                  <Badge className="mt-2 bg-wefit-primary">Plano Premium</Badge>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Apresente este QR Code na recepção para fazer check-in
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Validade</p>
                  <p className="font-semibold">{format(planoAtual.proximoVencimento, 'dd/MM/yyyy')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold text-green-600">Ativo</p>
                </div>
              </div>

              <Button className="w-full">
                Salvar no Apple Wallet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Preferências de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Lembretes de Aula</h4>
                    <p className="text-sm text-gray-600">Receba notificações sobre suas aulas agendadas</p>
                  </div>
                  <Switch 
                    checked={notificacoes.lembretesAula}
                    onCheckedChange={(checked) => 
                      setNotificacoes(prev => ({ ...prev, lembretesAula: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Novidades por Email</h4>
                    <p className="text-sm text-gray-600">Receba informações sobre novos serviços e aulas</p>
                  </div>
                  <Switch 
                    checked={notificacoes.novidadesEmail}
                    onCheckedChange={(checked) => 
                      setNotificacoes(prev => ({ ...prev, novidadesEmail: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Alertas de Treino</h4>
                    <p className="text-sm text-gray-600">Lembretes para seguir sua rotina de treinos</p>
                  </div>
                  <Switch 
                    checked={notificacoes.alertasTreino}
                    onCheckedChange={(checked) => 
                      setNotificacoes(prev => ({ ...prev, alertasTreino: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Promoções e Ofertas</h4>
                    <p className="text-sm text-gray-600">Receba ofertas especiais e promoções exclusivas</p>
                  </div>
                  <Switch 
                    checked={notificacoes.promocoes}
                    onCheckedChange={(checked) => 
                      setNotificacoes(prev => ({ ...prev, promocoes: checked }))
                    }
                  />
                </div>
              </div>

              <Button>
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedbacks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Meus Feedbacks Enviados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacksEnviados.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{feedback.aula}</h4>
                        <p className="text-sm text-gray-600">Com {feedback.instrutor}</p>
                        <p className="text-sm text-gray-500">
                          {format(feedback.data, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-1 mb-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < feedback.avaliacaoAula 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">Aula</p>
                      </div>
                    </div>
                    
                    {feedback.comentario && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">{feedback.comentario}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlunoConta;
