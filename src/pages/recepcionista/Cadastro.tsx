
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Phone, Mail, Users, Calendar, CheckCircle } from 'lucide-react';

interface NovoContato {
  nome: string;
  telefone: string;
  email: string;
  comoConheceu: string;
  interesse: string;
}

const RecepcionistaCadastro: React.FC = () => {
  const [contato, setContato] = useState<NovoContato>({
    nome: '',
    telefone: '',
    email: '',
    comoConheceu: '',
    interesse: ''
  });

  const [feedback, setFeedback] = useState<{tipo: 'success' | 'error', mensagem: string} | null>(null);
  const [cadastroRealizado, setCadastroRealizado] = useState(false);

  const opcoesComoConheceu = [
    'Indicação de Amigo',
    'Instagram/Redes Sociais',
    'Fachada da Academia',
    'Google/Internet',
    'Panfleto/Propaganda',
    'Passou na Frente',
    'Outro'
  ];

  const opcoesInteresse = [
    'Musculação',
    'Aulas Coletivas',
    'Pilates',
    'Spinning',
    'Natação',
    'Plano Premium',
    'Plano Básico',
    'Avaliação Física',
    'Personal Trainer'
  ];

  const handleInputChange = (field: keyof NovoContato, value: string) => {
    setContato(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validarFormulario = (): boolean => {
    if (!contato.nome.trim()) {
      setFeedback({tipo: 'error', mensagem: 'Nome é obrigatório'});
      return false;
    }

    if (!contato.telefone.trim()) {
      setFeedback({tipo: 'error', mensagem: 'Telefone é obrigatório'});
      return false;
    }

    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(contato.telefone)) {
      setFeedback({tipo: 'error', mensagem: 'Formato de telefone inválido. Use: (11) 99999-9999'});
      return false;
    }

    if (!contato.comoConheceu) {
      setFeedback({tipo: 'error', mensagem: 'Selecione como nos conheceu'});
      return false;
    }

    if (!contato.interesse) {
      setFeedback({tipo: 'error', mensagem: 'Selecione o principal interesse'});
      return false;
    }

    return true;
  };

  const salvarContato = () => {
    if (!validarFormulario()) return;

    // Simular salvamento
    console.log('Salvando contato:', contato);
    
    setFeedback({
      tipo: 'success', 
      mensagem: `Contato de ${contato.nome} salvo com sucesso! ID gerado: #${Math.floor(Math.random() * 10000)}`
    });
    
    setCadastroRealizado(true);
  };

  const agendarVisita = () => {
    console.log('Agendando visita para:', contato.nome);
    setFeedback({
      tipo: 'success',
      mensagem: `Visita agendada para ${contato.nome}! Lembre-se de confirmar por WhatsApp.`
    });
  };

  const novoCadastro = () => {
    setContato({
      nome: '',
      telefone: '',
      email: '',
      comoConheceu: '',
      interesse: ''
    });
    setFeedback(null);
    setCadastroRealizado(false);
  };

  const formatarTelefone = (valor: string) => {
    // Remove tudo que não é número
    const numeros = valor.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numeros.length <= 2) {
      return `(${numeros}`;
    } else if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length <= 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    } else {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cadastro Rápido</h1>
          <p className="text-gray-600 mt-2">Cadastro de novos contatos e leads interessados</p>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <Alert className={feedback.tipo === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={feedback.tipo === 'success' ? 'text-green-700' : 'text-red-700'}>
            {feedback.mensagem}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              {cadastroRealizado ? 'Cadastro Realizado!' : 'Novo Contato/Lead'}
            </CardTitle>
            <CardDescription>
              {cadastroRealizado 
                ? 'Contato salvo com sucesso. Escolha a próxima ação.'
                : 'Preencha as informações básicas do interessado'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!cadastroRealizado ? (
              <>
                {/* Informações Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Informações Pessoais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        placeholder="Digite o nome completo"
                        value={contato.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Telefone Principal (WhatsApp) *
                      </label>
                      <Input
                        placeholder="(11) 99999-9999"
                        value={contato.telefone}
                        onChange={(e) => handleInputChange('telefone', formatarTelefone(e.target.value))}
                        maxLength={15}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email (opcional)
                      </label>
                      <Input
                        type="email"
                        placeholder="email@exemplo.com"
                        value={contato.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Informações de Marketing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações de Marketing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Como nos conheceu? *
                      </label>
                      <Select value={contato.comoConheceu} onValueChange={(value) => handleInputChange('comoConheceu', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          {opcoesComoConheceu.map((opcao) => (
                            <SelectItem key={opcao} value={opcao}>
                              {opcao}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Principal Interesse *
                      </label>
                      <Select value={contato.interesse} onValueChange={(value) => handleInputChange('interesse', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o interesse" />
                        </SelectTrigger>
                        <SelectContent>
                          {opcoesInteresse.map((opcao) => (
                            <SelectItem key={opcao} value={opcao}>
                              {opcao}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Botão de Salvar */}
                <div className="pt-4">
                  <Button onClick={salvarContato} className="w-full" size="lg">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Salvar Contato
                  </Button>
                </div>
              </>
            ) : (
              /* Ações Pós-Cadastro */
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-700">
                    Contato Salvo com Sucesso!
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {contato.nome} foi adicionado à nossa base de leads
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Resumo do Cadastro</h4>
                  <div className="text-sm space-y-1 text-left">
                    <p><strong>Nome:</strong> {contato.nome}</p>
                    <p><strong>Telefone:</strong> {contato.telefone}</p>
                    {contato.email && <p><strong>Email:</strong> {contato.email}</p>}
                    <p><strong>Como conheceu:</strong> {contato.comoConheceu}</p>
                    <p><strong>Interesse:</strong> {contato.interesse}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={agendarVisita} className="w-full" size="lg">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Visita/Aula Experimental
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => window.open(`https://wa.me/55${contato.telefone.replace(/\D/g, '')}`, '_blank')}>
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    
                    <Button variant="outline" onClick={novoCadastro}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Novo Cadastro
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dicas Rápidas */}
        {!cadastroRealizado && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dicas para um Bom Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• <strong>Seja acolhedor:</strong> Demonstre interesse genuíno pela pessoa</li>
                <li>• <strong>Pergunte sobre objetivos:</strong> Entenda o que a pessoa busca</li>
                <li>• <strong>Ofereça aula experimental:</strong> É a melhor forma de conversão</li>
                <li>• <strong>Colete o WhatsApp:</strong> Principal canal de comunicação</li>
                <li>• <strong>Mantenha contato:</strong> Faça o follow-up em 24-48h</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecepcionistaCadastro;
