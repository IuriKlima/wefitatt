
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
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, CheckCircle, XCircle, AlertCircle, Settings, Wifi, CreditCard, Shield, Bell } from 'lucide-react';

const GestorConfiguracoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState('informacoes');
  const [catracaStatus, setCatracaStatus] = useState('conectado');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestarCatraca = () => {
    // Simular teste de conexão
    setCatracaStatus('testando');
    setTimeout(() => {
      setCatracaStatus(Math.random() > 0.3 ? 'conectado' : 'erro');
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conectado':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'erro':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'testando':
        return <AlertCircle className="h-5 w-5 text-yellow-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const modalidades = [
    { id: 'musculacao', nome: 'Musculação', ativo: true, precoAvulsa: '35.00' },
    { id: 'spinning', nome: 'Spinning', ativo: true, precoAvulsa: '25.00' },
    { id: 'yoga', nome: 'Yoga', ativo: true, precoAvulsa: '30.00' },
    { id: 'pilates', nome: 'Pilates', ativo: false, precoAvulsa: '40.00' },
    { id: 'crossfit', nome: 'CrossFit', ativo: true, precoAvulsa: '45.00' },
    { id: 'natacao', nome: 'Natação', ativo: false, precoAvulsa: '50.00' },
  ];

  const ambientes = [
    { id: 1, nome: 'Sala de Musculação', capacidade: 50, recursos: ['Ar Condicionado', 'Espelhos', 'Som Ambiente'] },
    { id: 2, nome: 'Estúdio 1 (Yoga/Pilates)', capacidade: 20, recursos: ['Tatame', 'Espelhos', 'Ar Condicionado'] },
    { id: 3, nome: 'Sala de Spinning', capacidade: 25, recursos: ['Ar Condicionado', 'Som Ambiente', 'Projetor'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações da Academia: Wefit Centro</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações e integrações da sua unidade</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="ambientes">Ambientes</TabsTrigger>
              <TabsTrigger value="politicas">Políticas</TabsTrigger>
              <TabsTrigger value="modalidades">Modalidades</TabsTrigger>
              <TabsTrigger value="integracoes">Integrações</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Academia</CardTitle>
                  <CardDescription>Dados básicos e contato da unidade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeFantasia">Nome Fantasia da Academia</Label>
                      <Input id="nomeFantasia" defaultValue="Wefit Centro" />
                    </div>
                    <div>
                      <Label htmlFor="razaoSocial">Razão Social (Opcional)</Label>
                      <Input id="razaoSocial" placeholder="Wefit Academias Ltda" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cnpj">CNPJ (Opcional)</Label>
                      <Input id="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" />
                    </div>
                    <div>
                      <Label htmlFor="capacidadeMaxima">Capacidade Máxima (alunos simultâneos)</Label>
                      <Input id="capacidadeMaxima" type="number" defaultValue="120" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Endereço</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cep">CEP</Label>
                        <Input id="cep" placeholder="01234-567" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="rua">Rua/Avenida</Label>
                        <Input id="rua" defaultValue="Rua das Flores" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="numero">Número</Label>
                        <Input id="numero" defaultValue="123" />
                      </div>
                      <div>
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input id="complemento" placeholder="Sala 101" />
                      </div>
                      <div>
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input id="bairro" defaultValue="Centro" />
                      </div>
                      <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input id="cidade" defaultValue="São Paulo" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Contato e Funcionamento</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefone">Telefone Principal</Label>
                        <Input id="telefone" defaultValue="(11) 3123-4567" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email de Contato</Label>
                        <Input id="email" defaultValue="contato@wefitcentro.com.br" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="website">Website da Academia</Label>
                      <Input id="website" placeholder="www.wefitcentro.com.br" />
                    </div>
                    <div>
                      <Label htmlFor="horarios">Horário de Funcionamento</Label>
                      <Textarea 
                        id="horarios" 
                        defaultValue="Segunda a Sexta: 06h às 22h&#10;Sábado: 08h às 18h&#10;Domingo: 08h às 14h"
                        rows={3}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Logo e Descrição</h4>
                    <div>
                      <Label htmlFor="logo">Upload do Logo da Academia</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg">
                          {logoPreview ? (
                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Upload className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                          <Button asChild variant="outline">
                            <label htmlFor="logo" className="cursor-pointer">
                              Selecionar Arquivo
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="descricao">Breve Descrição da Academia</Label>
                      <Textarea 
                        id="descricao" 
                        placeholder="Descreva sua academia, diferencial, público-alvo..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ambientes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Ambientes e Salas</CardTitle>
                  <CardDescription>Configure os espaços disponíveis na sua academia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ambientes.map((ambiente) => (
                      <div key={ambiente.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{ambiente.nome}</h4>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm">Remover</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Capacidade:</span>
                            <span className="ml-2 font-medium">{ambiente.capacidade} pessoas</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Recursos:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {ambiente.recursos.map((recurso) => (
                                <Badge key={recurso} variant="secondary" className="text-xs">
                                  {recurso}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      + Adicionar Novo Ambiente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="politicas" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Definir Políticas da Academia</CardTitle>
                  <CardDescription>Configure as regras e políticas da sua unidade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="regulamento">Regulamento Interno da Academia</Label>
                    <Textarea 
                      id="regulamento"
                      rows={6}
                      placeholder="Digite o regulamento interno da academia..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="cancelamento">Política de Cancelamento de Aulas/Planos</Label>
                    <Textarea 
                      id="cancelamento"
                      rows={4}
                      placeholder="Digite a política de cancelamento..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="termos">Termos e Condições Específicos da Unidade</Label>
                    <Textarea 
                      id="termos"
                      rows={6}
                      placeholder="Digite os termos e condições específicos..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modalidades" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Modalidades e Tipos de Aula</CardTitle>
                  <CardDescription>Configure quais modalidades são oferecidas nesta unidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modalidades.map((modalidade) => (
                      <div key={modalidade.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox checked={modalidade.ativo} />
                          <div>
                            <p className="font-medium">{modalidade.nome}</p>
                            <p className="text-sm text-gray-500">
                              Aula avulsa: R$ {modalidade.precoAvulsa}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="R$ 0,00" 
                            className="w-24" 
                            defaultValue={modalidade.precoAvulsa}
                          />
                          <Button variant="outline" size="sm">Configurar</Button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        + Sugerir Nova Modalidade
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurar Notificações Automáticas</CardTitle>
                  <CardDescription>Defina quais notificações os alunos receberão</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      'Lembrete de aula agendada (24h antes)',
                      'Confirmação de agendamento/cancelamento de aula',
                      'Aviso de vencimento de plano (7 dias antes)',
                      'Mensagem de aniversário',
                      'Feedback pós-aula'
                    ].map((notificacao) => (
                      <div key={notificacao} className="flex items-center space-x-2">
                        <Checkbox defaultChecked />
                        <Label className="text-sm">{notificacao}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integracoes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Controle de Acesso (Catracas)
                  </CardTitle>
                  <CardDescription>Configure a integração com o sistema de catracas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(catracaStatus)}
                      <div>
                        <p className="font-medium">Status da Conexão</p>
                        <p className="text-sm text-gray-500">
                          {catracaStatus === 'conectado' && 'Catraca conectada e funcionando'}
                          {catracaStatus === 'erro' && 'Erro na conexão com a catraca'}
                          {catracaStatus === 'testando' && 'Testando conexão...'}
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleTestarCatraca} disabled={catracaStatus === 'testando'}>
                      {catracaStatus === 'testando' ? 'Testando...' : 'Testar Conexão'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="modeloCatraca">Modelo da Catraca</Label>
                      <Select defaultValue="catrax-plus">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="catrax-plus">Catrax Plus</SelectItem>
                          <SelectItem value="henry-orion">Henry Orion</SelectItem>
                          <SelectItem value="rwtech-idblock">RWTech iDBlock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ipCatraca">Endereço IP da Catraca</Label>
                      <Input id="ipCatraca" defaultValue="192.168.1.100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="portaCatraca">Porta de Comunicação</Label>
                      <Input id="portaCatraca" defaultValue="8080" />
                    </div>
                    <div>
                      <Label htmlFor="tokenCatraca">Token/Chave de Acesso</Label>
                      <Input id="tokenCatraca" type="password" defaultValue="••••••••••••" />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Visualizar Logs de Acesso da Catraca
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Sistema de Pagamentos
                  </CardTitle>
                  <CardDescription>Configure os gateways de pagamento da unidade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">PagSeguro</span>
                        <Badge variant="default">Ativo</Badge>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span className="font-medium">Mercado Pago</span>
                        <Badge variant="secondary">Disponível</Badge>
                      </div>
                      <Button variant="outline" size="sm">Ativar</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Configurações do PagSeguro</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parcelamento">Parcelamento Máximo</Label>
                        <Select defaultValue="12x">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6x">Até 6x sem juros</SelectItem>
                            <SelectItem value="12x">Até 12x sem juros</SelectItem>
                            <SelectItem value="18x">Até 18x com juros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="parcelaMinima">Parcela Mínima</Label>
                        <Input id="parcelaMinima" defaultValue="R$ 50,00" />
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Solicitar Integração com Novo Gateway
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6 border-t">
            <div className="flex gap-3">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Alterações</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestorConfiguracoes;
