
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Upload, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

const AdminConfiguracoes: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [faviconPreview, setFaviconPreview] = useState<string>('');

  const formGeral = useForm({
    defaultValues: {
      nomeSistema: 'Wefit - Sistema inteligente para academias',
      logo: '',
      favicon: '',
    },
  });

  const formFinanceiro = useForm({
    defaultValues: {
      chaveApiPagamento: '',
      moedaPadrao: 'BRL',
      taxaProcessamento: '3.5',
    },
  });

  const formNotificacoes = useForm({
    defaultValues: {
      hostSmtp: '',
      portaSmtp: '587',
      usuarioSmtp: '',
      senhaSmtp: '',
      emailRemetente: 'noreply@wefit.com',
    },
  });

  const formTermos = useForm({
    defaultValues: {
      termosUso: `TERMOS DE USO - WEFIT

1. ACEITAÇÃO DOS TERMOS
Ao utilizar o sistema Wefit, você concorda com estes termos de uso.

2. DESCRIÇÃO DO SERVIÇO
O Wefit é um sistema inteligente para gestão de academias e centros de fitness.

3. RESPONSABILIDADES DO USUÁRIO
- Manter suas credenciais de acesso em sigilo
- Utilizar o sistema apenas para fins legítimos
- Não compartilhar dados de clientes com terceiros

4. PRIVACIDADE
Respeitamos sua privacidade conforme nossa Política de Privacidade.

5. LIMITAÇÃO DE RESPONSABILIDADE
O uso do sistema é por sua conta e risco.

6. ALTERAÇÕES
Reservamo-nos o direito de alterar estes termos a qualquer momento.`,
      politicaPrivacidade: `POLÍTICA DE PRIVACIDADE - WEFIT

1. INFORMAÇÕES COLETADAS
Coletamos apenas as informações necessárias para o funcionamento do sistema.

2. USO DAS INFORMAÇÕES
As informações são utilizadas exclusivamente para:
- Prestação dos serviços
- Melhorias no sistema
- Comunicação com usuários

3. COMPARTILHAMENTO
Não compartilhamos suas informações com terceiros, exceto quando exigido por lei.

4. SEGURANÇA
Implementamos medidas de segurança para proteger suas informações.

5. COOKIES
Utilizamos cookies para melhorar sua experiência.

6. CONTATO
Para dúvidas sobre esta política, entre em contato: privacidade@wefit.com`,
    },
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        formGeral.setValue('logo', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFaviconPreview(result);
        formGeral.setValue('favicon', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvarGeral = (data: any) => {
    console.log('Salvando configurações gerais:', data);
  };

  const handleSalvarFinanceiro = (data: any) => {
    console.log('Salvando configurações financeiras:', data);
  };

  const handleSalvarNotificacoes = (data: any) => {
    console.log('Salvando configurações de notificações:', data);
  };

  const handleSalvarTermos = (data: any) => {
    console.log('Salvando termos e políticas:', data);
  };

  const handleSalvarTudo = () => {
    console.log('Salvando todas as configurações...');
    // Aqui você faria a submissão de todos os formulários
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600 mt-2">Configurações globais e parâmetros do sistema</p>
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="termos">Termos e Políticas</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações básicas do sistema e identidade visual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formGeral}>
                <form onSubmit={formGeral.handleSubmit(handleSalvarGeral)} className="space-y-6">
                  <FormField
                    control={formGeral.control}
                    name="nomeSistema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Sistema</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Nome que aparecerá no título e cabeçalhos do sistema
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={formGeral.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Principal do Sistema</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Button type="button" variant="outline" asChild>
                                  <label htmlFor="logo-upload" className="cursor-pointer flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Selecionar Logo
                                  </label>
                                </Button>
                                <input
                                  id="logo-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleLogoUpload}
                                />
                                {field.value && <span className="text-sm text-gray-600">{field.value}</span>}
                              </div>
                              {logoPreview && (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                  <img src={logoPreview} alt="Logo preview" className="max-h-20 object-contain" />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Imagem em formato PNG ou JPG, tamanho recomendado: 200x60px
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formGeral.control}
                      name="favicon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Button type="button" variant="outline" asChild>
                                  <label htmlFor="favicon-upload" className="cursor-pointer flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Selecionar Favicon
                                  </label>
                                </Button>
                                <input
                                  id="favicon-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFaviconUpload}
                                />
                                {field.value && <span className="text-sm text-gray-600">{field.value}</span>}
                              </div>
                              {faviconPreview && (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                  <img src={faviconPreview} alt="Favicon preview" className="w-8 h-8 object-contain" />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Ícone que aparece na aba do navegador (16x16px ou 32x32px)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações Gerais
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Financeiras</CardTitle>
              <CardDescription>
                Configurações de pagamento e moeda do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formFinanceiro}>
                <form onSubmit={formFinanceiro.handleSubmit(handleSalvarFinanceiro)} className="space-y-6">
                  <FormField
                    control={formFinanceiro.control}
                    name="chaveApiPagamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chave API do Gateway de Pagamento</FormLabel>
                        <FormControl>
                          <Input placeholder="pk_live_..." type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Chave da API do Stripe, PagSeguro ou outro gateway de pagamento
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={formFinanceiro.control}
                      name="moedaPadrao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Moeda Padrão do Sistema</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a moeda" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                              <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                              <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formFinanceiro.control}
                      name="taxaProcessamento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taxa de Processamento (%)</FormLabel>
                          <FormControl>
                            <Input placeholder="3.5" type="number" step="0.1" {...field} />
                          </FormControl>
                          <FormDescription>
                            Taxa cobrada pelo gateway de pagamento
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações Financeiras
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Configurações de email e notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formNotificacoes}>
                <form onSubmit={formNotificacoes.handleSubmit(handleSalvarNotificacoes)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={formNotificacoes.control}
                      name="hostSmtp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host SMTP</FormLabel>
                          <FormControl>
                            <Input placeholder="smtp.gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formNotificacoes.control}
                      name="portaSmtp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porta SMTP</FormLabel>
                          <FormControl>
                            <Input placeholder="587" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={formNotificacoes.control}
                      name="usuarioSmtp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuário SMTP</FormLabel>
                          <FormControl>
                            <Input placeholder="seu-email@gmail.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formNotificacoes.control}
                      name="senhaSmtp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha SMTP / Chave API</FormLabel>
                          <FormControl>
                            <Input placeholder="senha ou chave API" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={formNotificacoes.control}
                    name="emailRemetente"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Remetente Padrão</FormLabel>
                        <FormControl>
                          <Input placeholder="noreply@wefit.com" type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          Email que aparecerá como remetente nas notificações automáticas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações de Notificações
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="termos">
          <Card>
            <CardHeader>
              <CardTitle>Termos e Políticas</CardTitle>
              <CardDescription>
                Termos de uso e política de privacidade do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formTermos}>
                <form onSubmit={formTermos.handleSubmit(handleSalvarTermos)} className="space-y-6">
                  <FormField
                    control={formTermos.control}
                    name="termosUso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Termos de Uso</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite os termos de uso..." 
                            className="min-h-[300px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Termos que os usuários devem aceitar ao utilizar o sistema
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formTermos.control}
                    name="politicaPrivacidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Política de Privacidade</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite a política de privacidade..." 
                            className="min-h-[300px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Política de tratamento de dados e privacidade dos usuários
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Termos e Políticas
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão para salvar todas as configurações */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <Button size="lg" onClick={handleSalvarTudo} className="px-8">
              <Save className="h-5 w-5 mr-2" />
              Salvar Todas as Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminConfiguracoes;
