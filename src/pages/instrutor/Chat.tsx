
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, MessageCircle, Clock, Image, Paperclip } from 'lucide-react';

const InstrutorChat: React.FC = () => {
  const [conversaSelecionada, setConversaSelecionada] = useState<any>(null);
  const [mensagem, setMensagem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversas = [
    {
      id: 1,
      aluno: {
        nome: 'Maria Silva',
        foto: '/placeholder.svg'
      },
      ultimaMensagem: 'Obrigada pelas dicas de alimentação!',
      horario: '14:30',
      naoLidas: 0,
      online: true
    },
    {
      id: 2,
      aluno: {
        nome: 'João Santos',
        foto: '/placeholder.svg'
      },
      ultimaMensagem: 'Posso trocar o exercício de agachamento?',
      horario: '12:15',
      naoLidas: 2,
      online: false
    },
    {
      id: 3,
      aluno: {
        nome: 'Ana Costa',
        foto: '/placeholder.svg'
      },
      ultimaMensagem: 'Estou sentindo dor no joelho, é normal?',
      horario: '10:45',
      naoLidas: 1,
      online: true
    }
  ];

  const mensagens = [
    {
      id: 1,
      tipo: 'recebida',
      conteudo: 'Oi professor! Tenho uma dúvida sobre o treino de hoje.',
      horario: '14:25',
      status: 'lida'
    },
    {
      id: 2,
      tipo: 'enviada',
      conteudo: 'Oi Maria! Claro, pode falar. Em que posso ajudar?',
      horario: '14:26',
      status: 'lida'
    },
    {
      id: 3,
      tipo: 'recebida',
      conteudo: 'É sobre o agachamento búlgaro. Estou sentindo muito no quadríceps, é normal?',
      horario: '14:27',
      status: 'lida'
    },
    {
      id: 4,
      tipo: 'enviada',
      conteudo: 'Sim, é normal sentir mais no quadríceps nesse exercício. Mas vamos ajustar a posição do pé para ativar mais o glúteo também. Amanhã te mostro a técnica correta.',
      horario: '14:28',
      status: 'entregue'
    },
    {
      id: 5,
      tipo: 'recebida',
      conteudo: 'Perfeito! E sobre a alimentação pré-treino que você me falou?',
      horario: '14:29',
      status: 'lida'
    },
    {
      id: 6,
      tipo: 'enviada',
      conteudo: 'Ah sim! Lembra de comer algo leve cerca de 30-60 minutos antes. Uma banana com aveia é uma ótima opção. Evite alimentos muito pesados ou gordurosos.',
      horario: '14:30',
      status: 'entregue'
    },
    {
      id: 7,
      tipo: 'recebida',
      conteudo: 'Obrigada pelas dicas de alimentação!',
      horario: '14:30',
      status: 'lida'
    }
  ];

  const conversasFiltradas = conversas.filter(conversa =>
    conversa.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enviarMensagem = () => {
    if (mensagem.trim()) {
      // Simular envio de mensagem
      console.log('Enviando mensagem:', mensagem);
      setMensagem('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enviada':
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
      case 'entregue':
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case 'lida':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Minhas Mensagens Wefit</h1>
        <p className="text-gray-600 mt-2">Mantenha contato direto com seus alunos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Lista de Conversas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Conversas
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar conversa..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {conversasFiltradas.map((conversa) => (
                <div
                  key={conversa.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    conversaSelecionada?.id === conversa.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setConversaSelecionada(conversa)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversa.aluno.foto} />
                        <AvatarFallback>{conversa.aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversa.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-sm truncate">{conversa.aluno.nome}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {conversa.horario}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm text-gray-600 truncate">{conversa.ultimaMensagem}</div>
                        {conversa.naoLidas > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversa.naoLidas}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de Conversa */}
        <Card className="lg:col-span-2 flex flex-col">
          {conversaSelecionada ? (
            <>
              {/* Header da Conversa */}
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversaSelecionada.aluno.foto} />
                      <AvatarFallback>{conversaSelecionada.aluno.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {conversaSelecionada.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{conversaSelecionada.aluno.nome}</CardTitle>
                    <div className="text-sm text-gray-500">
                      {conversaSelecionada.online ? 'Online agora' : 'Visto por último às ' + conversaSelecionada.horario}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Mensagens */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mensagens.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.tipo === 'enviada' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.tipo === 'enviada'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-sm">{msg.conteudo}</div>
                        <div className={`text-xs mt-1 flex items-center gap-1 ${
                          msg.tipo === 'enviada' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          <Clock className="h-3 w-3" />
                          {msg.horario}
                          {msg.tipo === 'enviada' && getStatusIcon(msg.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Input de Mensagem */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  />
                  <Button onClick={enviarMensagem} disabled={!mensagem.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // Estado vazio
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Selecione uma conversa</p>
                <p className="text-sm">Escolha um aluno da lista para começar a conversar</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default InstrutorChat;
