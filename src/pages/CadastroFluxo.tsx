
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, CheckCircle, Upload, CreditCard, MapPin, Building, User, Phone, Mail } from 'lucide-react';

interface FormData {
  [key: string]: any;
}

const CadastroFluxo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const profile = searchParams.get('profile');
  const inviteCode = searchParams.get('inviteCode');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [totalSteps, setTotalSteps] = useState(7);

  useEffect(() => {
    if (profile === 'personal') {
      setTotalSteps(5);
    } else if (profile === 'rede') {
      setTotalSteps(5);
    } else if (inviteCode) {
      setTotalSteps(7);
    }
  }, [profile, inviteCode]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finalizar cadastro
      navigate('/cadastro-finalizado', { 
        state: { 
          profile, 
          inviteCode, 
          formData,
          userName: formData.nomeCompleto || formData.nomeResponsavel,
          businessName: formData.nomeAcademia || formData.nomeRede
        }
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getPanelMessage = () => {
    const messages = {
      1: "Conte-nos sobre você!",
      2: "Vamos conhecer melhor!",
      3: "Quase lá!",
      4: "Só mais alguns detalhes!",
      5: "Finalizando sua jornada!"
    };
    
    if (currentStep <= 3) return messages[1];
    if (currentStep <= 5) return messages[currentStep - 1];
    return "Você está quase pronto!";
  };

  const renderStepContent = () => {
    if (profile === 'academia' || inviteCode) {
      return renderAcademiaSteps();
    } else if (profile === 'rede') {
      return renderRedeSteps();
    } else if (profile === 'personal') {
      return renderPersonalSteps();
    }
    return null;
  };

  const renderAcademiaSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sobre sua Academia</h2>
              <p className="text-gray-600">Vamos começar com as informações básicas</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeAcademia">Qual é o nome fantasia da sua academia?</Label>
                <Input
                  id="nomeAcademia"
                  value={formData.nomeAcademia || ''}
                  onChange={(e) => updateFormData('nomeAcademia', e.target.value)}
                  placeholder="Ex: Academia Strong Fit"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="cnpj">E qual o CNPJ? (Opcional)</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj || ''}
                  onChange={(e) => updateFormData('cnpj', e.target.value)}
                  placeholder="XX.XXX.XXX/XXXX-XX"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Onde sua Academia está Localizada?</h2>
              <p className="text-gray-600">Localização é tudo!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="cep">Comece digitando o CEP:</Label>
                <Input
                  id="cep"
                  value={formData.cep || ''}
                  onChange={(e) => updateFormData('cep', e.target.value)}
                  placeholder="XXXXX-XXX"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rua">Rua/Avenida</Label>
                  <Input
                    id="rua"
                    value={formData.rua || ''}
                    onChange={(e) => updateFormData('rua', e.target.value)}
                    placeholder="Rua das Flores"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={formData.numero || ''}
                    onChange={(e) => updateFormData('numero', e.target.value)}
                    placeholder="123"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="complemento">Complemento (Bloco, Sala, etc. - opcional)</Label>
                <Input
                  id="complemento"
                  value={formData.complemento || ''}
                  onChange={(e) => updateFormData('complemento', e.target.value)}
                  placeholder="Bloco A, Sala 10"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    value={formData.bairro || ''}
                    onChange={(e) => updateFormData('bairro', e.target.value)}
                    placeholder="Centro"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade || ''}
                    onChange={(e) => updateFormData('cidade', e.target.value)}
                    placeholder="São Paulo"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Contatos da Academia</h2>
              <p className="text-gray-600">Como podemos entrar em contato?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="telefone">Qual o telefone principal da sua academia?</Label>
                <Input
                  id="telefone"
                  value={formData.telefone || ''}
                  onChange={(e) => updateFormData('telefone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="emailAcademia">E o email principal para contato?</Label>
                <Input
                  id="emailAcademia"
                  type="email"
                  value={formData.emailAcademia || ''}
                  onChange={(e) => updateFormData('emailAcademia', e.target.value)}
                  placeholder="contato@minhaacademia.com"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="website">Se tiverem um site, qual é o endereço? (Opcional)</Label>
                <Input
                  id="website"
                  value={formData.website || ''}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="www.minhaacademia.com"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Detalhes da Operação</h2>
              <p className="text-gray-600">Entendendo sua estrutura</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Qual o número aproximado de alunos ativos atualmente?</Label>
                <RadioGroup 
                  value={formData.numeroAlunos || ''} 
                  onValueChange={(value) => updateFormData('numeroAlunos', value)}
                  className="mt-3"
                >
                  {['Até 50', '51-150', '151-300', '301-500', 'Mais de 500'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <Label>Quais modalidades principais vocês oferecem?</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {['Musculação', 'Spinning', 'Yoga', 'Pilates', 'Lutas', 'Crossfit', 'Dança', 'Natação', 'Funcional'].map((modalidade) => (
                    <div key={modalidade} className="flex items-center space-x-2">
                      <Checkbox 
                        id={modalidade}
                        checked={formData.modalidades?.includes(modalidade) || false}
                        onCheckedChange={(checked) => {
                          const current = formData.modalidades || [];
                          if (checked) {
                            updateFormData('modalidades', [...current, modalidade]);
                          } else {
                            updateFormData('modalidades', current.filter((m: string) => m !== modalidade));
                          }
                        }}
                      />
                      <Label htmlFor={modalidade}>{modalidade}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Quer adicionar o logo da sua academia? (Opcional)</Label>
                <div className="mt-3 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Clique para selecionar ou arraste seu logo aqui</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG até 5MB</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Informações do Responsável</h2>
              <p className="text-gray-600">Agora, seus dados de acesso</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeResponsavel">Qual seu nome completo?</Label>
                <Input
                  id="nomeResponsavel"
                  value={formData.nomeResponsavel || ''}
                  onChange={(e) => updateFormData('nomeResponsavel', e.target.value)}
                  placeholder="João Silva"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="cpfResponsavel">Seu CPF (Opcional, para emissão de notas fiscais)</Label>
                <Input
                  id="cpfResponsavel"
                  value={formData.cpfResponsavel || ''}
                  onChange={(e) => updateFormData('cpfResponsavel', e.target.value)}
                  placeholder="XXX.XXX.XXX-XX"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="emailLogin">Qual email você usará para acessar o Wefit?</Label>
                <Input
                  id="emailLogin"
                  type="email"
                  value={formData.emailLogin || ''}
                  onChange={(e) => updateFormData('emailLogin', e.target.value)}
                  placeholder="joao@email.com"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senha">Crie uma senha forte:</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha || ''}
                    onChange={(e) => updateFormData('senha', e.target.value)}
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmarSenha">Confirmar Senha:</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha || ''}
                    onChange={(e) => updateFormData('confirmarSenha', e.target.value)}
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="telefoneResponsavel">Seu telefone/WhatsApp para contato:</Label>
                <Input
                  id="telefoneResponsavel"
                  value={formData.telefoneResponsavel || ''}
                  onChange={(e) => updateFormData('telefoneResponsavel', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Escolha seu Plano Wefit</h2>
              <p className="text-gray-600">O motor do seu sucesso!</p>
            </div>
            
            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Plano Academia</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  <span className="line-through text-lg text-gray-500">R$ 199/mês</span>
                  <span className="ml-2">R$ 99</span>
                </div>
                <p className="text-sm text-purple-700 mb-4">no primeiro mês!</p>
                
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Gestão completa de membros</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">App do aluno incluído</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Relatórios avançados</span>
                  </li>
                </ul>
                
                <p className="text-xs text-gray-600">Você poderá alterar seu plano a qualquer momento.</p>
              </div>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CreditCard className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Pagamento</h2>
              <p className="text-gray-600">Finalizando seu cadastro!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCartao">Nome no Cartão</Label>
                <Input
                  id="nomeCartao"
                  value={formData.nomeCartao || ''}
                  onChange={(e) => updateFormData('nomeCartao', e.target.value)}
                  placeholder="João Silva"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="numeroCartao">Número do Cartão</Label>
                <Input
                  id="numeroCartao"
                  value={formData.numeroCartao || ''}
                  onChange={(e) => updateFormData('numeroCartao', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validade">Validade (MM/AA)</Label>
                  <Input
                    id="validade"
                    value={formData.validade || ''}
                    onChange={(e) => updateFormData('validade', e.target.value)}
                    placeholder="12/26"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv || ''}
                    onChange={(e) => updateFormData('cvv', e.target.value)}
                    placeholder="123"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                🔒 Cobrança segura. Cancele quando quiser.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRedeSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sobre sua Rede</h2>
              <p className="text-gray-600">Bem-vindo ao futuro das redes de academias!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeRede">Qual o nome da sua Rede de Academias?</Label>
                <Input
                  id="nomeRede"
                  value={formData.nomeRede || ''}
                  onChange={(e) => updateFormData('nomeRede', e.target.value)}
                  placeholder="Ex: Rede FitMax"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="cnpjRede">CNPJ da Matriz? (Opcional)</Label>
                <Input
                  id="cnpjRede"
                  value={formData.cnpjRede || ''}
                  onChange={(e) => updateFormData('cnpjRede', e.target.value)}
                  placeholder="XX.XXX.XXX/XXXX-XX"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Alcance da Rede</h2>
              <p className="text-gray-600">Sua marca, em todos os lugares</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="websiteRede">Qual o website oficial da sua rede?</Label>
                <Input
                  id="websiteRede"
                  value={formData.websiteRede || ''}
                  onChange={(e) => updateFormData('websiteRede', e.target.value)}
                  placeholder="www.redeFitmax.com"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Quantas unidades sua rede possui atualmente?</Label>
                <RadioGroup 
                  value={formData.numeroUnidades || ''} 
                  onValueChange={(value) => updateFormData('numeroUnidades', value)}
                  className="mt-3"
                >
                  {['2-5 unidades', '6-10 unidades', '11-20 unidades', 'Mais de 20'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="regioes">Quais são as principais regiões de atuação?</Label>
                <Textarea
                  id="regioes"
                  value={formData.regioes || ''}
                  onChange={(e) => updateFormData('regioes', e.target.value)}
                  placeholder="São Paulo, Rio de Janeiro, Belo Horizonte..."
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Administrador Principal</h2>
              <p className="text-gray-600">Seus superpoderes de gestão</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeAdmin">Seu nome completo, por favor:</Label>
                <Input
                  id="nomeAdmin"
                  value={formData.nomeAdmin || ''}
                  onChange={(e) => updateFormData('nomeAdmin', e.target.value)}
                  placeholder="Maria Santos"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="emailAdmin">Qual email você usará para o login principal da rede?</Label>
                <Input
                  id="emailAdmin"
                  type="email"
                  value={formData.emailAdmin || ''}
                  onChange={(e) => updateFormData('emailAdmin', e.target.value)}
                  placeholder="maria@redefitmax.com"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senhaAdmin">Crie sua senha mestre:</Label>
                  <Input
                    id="senhaAdmin"
                    type="password"
                    value={formData.senhaAdmin || ''}
                    onChange={(e) => updateFormData('senhaAdmin', e.target.value)}
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmarSenhaAdmin">Confirmar Senha:</Label>
                  <Input
                    id="confirmarSenhaAdmin"
                    type="password"
                    value={formData.confirmarSenhaAdmin || ''}
                    onChange={(e) => updateFormData('confirmarSenhaAdmin', e.target.value)}
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="telefoneAdmin">Seu telefone/WhatsApp para contato estratégico:</Label>
                <Input
                  id="telefoneAdmin"
                  value={formData.telefoneAdmin || ''}
                  onChange={(e) => updateFormData('telefoneAdmin', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Plano Rede</h2>
              <p className="text-gray-600">Potência máxima para sua expansão!</p>
            </div>
            
            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Plano Rede</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  <span className="line-through text-lg text-gray-500">R$ 299/mês</span>
                  <span className="ml-2">R$ 149</span>
                </div>
                <p className="text-sm text-purple-700 mb-4">no primeiro mês!</p>
                
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Gestão multi-unidades</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Analytics avançado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Suporte prioritário</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CreditCard className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Pagamento</h2>
              <p className="text-gray-600">Finalizando seu cadastro!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCartao">Nome no Cartão</Label>
                <Input
                  id="nomeCartao"
                  value={formData.nomeCartao || ''}
                  onChange={(e) => updateFormData('nomeCartao', e.target.value)}
                  placeholder="Maria Santos"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="numeroCartao">Número do Cartão</Label>
                <Input
                  id="numeroCartao"
                  value={formData.numeroCartao || ''}
                  onChange={(e) => updateFormData('numeroCartao', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validade">Validade (MM/AA)</Label>
                  <Input
                    id="validade"
                    value={formData.validade || ''}
                    onChange={(e) => updateFormData('validade', e.target.value)}
                    placeholder="12/26"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv || ''}
                    onChange={(e) => updateFormData('cvv', e.target.value)}
                    placeholder="123"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                🔒 Cobrança segura. Cancele quando quiser.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPersonalSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sobre Você, Personal Trainer</h2>
              <p className="text-gray-600">Wefit, seu parceiro de treinos e gestão!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCompleto">Seu nome completo, para seus alunos te reconhecerem:</Label>
                <Input
                  id="nomeCompleto"
                  value={formData.nomeCompleto || ''}
                  onChange={(e) => updateFormData('nomeCompleto', e.target.value)}
                  placeholder="Carlos Personal"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="cpf">Seu CPF (Opcional):</Label>
                <Input
                  id="cpf"
                  value={formData.cpf || ''}
                  onChange={(e) => updateFormData('cpf', e.target.value)}
                  placeholder="XXX.XXX.XXX-XX"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="cref">Qual seu número de registro no CREF? (Opcional, mas recomendado)</Label>
                <Input
                  id="cref"
                  value={formData.cref || ''}
                  onChange={(e) => updateFormData('cref', e.target.value)}
                  placeholder="123456-G/SP"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Seu Contato e Login</h2>
              <p className="text-gray-600">Conectando você aos seus alunos</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="telefonePersonal">Seu principal telefone/WhatsApp para contato profissional:</Label>
                <Input
                  id="telefonePersonal"
                  value={formData.telefonePersonal || ''}
                  onChange={(e) => updateFormData('telefonePersonal', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="emailPersonal">Seu melhor email para login e contato:</Label>
                <Input
                  id="emailPersonal"
                  type="email"
                  value={formData.emailPersonal || ''}
                  onChange={(e) => updateFormData('emailPersonal', e.target.value)}
                  placeholder="carlos@email.com"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senhaPersonal">Crie sua senha de acesso ao Wefit:</Label>
                  <Input
                    id="senhaPersonal"
                    type="password"
                    value={formData.senhaPersonal || ''}
                    onChange={(e) => updateFormData('senhaPersonal', e.target.value)}
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmarSenhaPersonal">Confirmar Senha:</Label>
                  <Input
                    id="confirmarSenhaPersonal"
                    type="password"
                    value={formData.confirmarSenhaPersonal || ''}
                    onChange={(e) => updateFormData('confirmarSenhaPersonal', e.target.value)}
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sua Atuação Profissional</h2>
              <p className="text-gray-600">Mostre sua especialidade!</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Qual sua principal área de atuação ou especialidade?</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {['Emagrecimento', 'Hipertrofia', 'Performance Esportiva', 'Reabilitação', 'Terceira Idade', 'Gestantes', 'Treinamento Funcional'].map((especialidade) => (
                    <div key={especialidade} className="flex items-center space-x-2">
                      <Checkbox 
                        id={especialidade}
                        checked={formData.especialidades?.includes(especialidade) || false}
                        onCheckedChange={(checked) => {
                          const current = formData.especialidades || [];
                          if (checked) {
                            updateFormData('especialidades', [...current, especialidade]);
                          } else {
                            updateFormData('especialidades', current.filter((e: string) => e !== especialidade));
                          }
                        }}
                      />
                      <Label htmlFor={especialidade}>{especialidade}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Como você costuma atender seus alunos?</Label>
                <RadioGroup 
                  value={formData.tipoAtendimento || ''} 
                  onValueChange={(value) => updateFormData('tipoAtendimento', value)}
                  className="mt-3"
                >
                  {['Online', 'Presencial', 'Ambos'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="redesSociais">Seu website ou perfil profissional (Instagram, etc.)? (Opcional)</Label>
                <Input
                  id="redesSociais"
                  value={formData.redesSociais || ''}
                  onChange={(e) => updateFormData('redesSociais', e.target.value)}
                  placeholder="@carlosPersonal ou www.carlospersonal.com"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Plano Personal</h2>
              <p className="text-gray-600">Ferramentas sob medida para você!</p>
            </div>
            
            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Plano Personal</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  <span className="line-through text-lg text-gray-500">R$ 99/mês</span>
                  <span className="ml-2">R$ 49</span>
                </div>
                <p className="text-sm text-purple-700 mb-4">no primeiro mês!</p>
                
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Gestão de alunos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Criação de treinos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">App do aluno incluído</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CreditCard className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Pagamento</h2>
              <p className="text-gray-600">Finalizando seu cadastro!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCartao">Nome no Cartão</Label>
                <Input
                  id="nomeCartao"
                  value={formData.nomeCartao || ''}
                  onChange={(e) => updateFormData('nomeCartao', e.target.value)}
                  placeholder="Carlos Personal"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="numeroCartao">Número do Cartão</Label>
                <Input
                  id="numeroCartao"
                  value={formData.numeroCartao || ''}
                  onChange={(e) => updateFormData('numeroCartao', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validade">Validade (MM/AA)</Label>
                  <Input
                    id="validade"
                    value={formData.validade || ''}
                    onChange={(e) => updateFormData('validade', e.target.value)}
                    placeholder="12/26"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv || ''}
                    onChange={(e) => updateFormData('cvv', e.target.value)}
                    placeholder="123"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                🔒 Cobrança segura. Cancele quando quiser.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === totalSteps) {
      if (profile === 'academia' || inviteCode) {
        return "Finalizar Cadastro e Ativar Wefit!";
      } else if (profile === 'rede') {
        return "Finalizar Cadastro e Ativar Wefit para Redes!";
      } else if (profile === 'personal') {
        return "Finalizar Cadastro e Começar a Treinar com Wefit!";
      }
    }
    return "Continuar";
  };

  if (!profile && !inviteCode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Erro</h2>
          <p className="mb-4">Perfil não identificado. Por favor, volte e selecione um perfil.</p>
          <Button onClick={() => navigate('/cadastro')}>Voltar ao Cadastro</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Painel Roxo Wefit - Lado Esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Wefit</h1>
            <h2 className="text-2xl font-semibold mb-4">{getPanelMessage()}</h2>
            <div className="mb-6">
              <Progress value={(currentStep / totalSteps) * 100} className="w-full bg-white/20" />
              <p className="text-sm mt-2 opacity-90">Passo {currentStep} de {totalSteps}</p>
            </div>
            <p className="text-lg opacity-90 leading-relaxed">
              Estamos quase prontos para transformar sua gestão fitness!
            </p>
          </div>
          
          {/* Elementos gráficos decorativos */}
          <div className="absolute top-16 right-16 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-24 left-16 w-20 h-20 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Área do Formulário - Lado Direito */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-2xl p-8 bg-white shadow-lg">
          {/* Progresso Mobile */}
          <div className="lg:hidden mb-6">
            <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
            <p className="text-sm mt-2 text-center text-gray-600">Passo {currentStep} de {totalSteps}</p>
          </div>

          {/* Conteúdo do Passo */}
          {renderStepContent()}

          {/* Botões de Navegação */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              {getButtonText()}
              {currentStep < totalSteps && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CadastroFluxo;
