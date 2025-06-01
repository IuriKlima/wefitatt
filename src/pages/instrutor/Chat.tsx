
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Phone, Video, MoreVertical, Users, Search } from 'lucide-react';

interface Mensagem {
  id: number;
  remetente: string;
  conteudo: string;
  timestamp: Date;
  tipo: 'texto' | 'imagem' | 'arquivo';
}

interface Conversa {
  id: number;
  nome: string;
  tipo: 'individual' | 'grupo';
  participantes: string[];
  ultimaMensagem: string;
  timestamp: Date;
  naoLidas: number;
  avatar?: string;
  online: boolean;
}

const InstrutorChat: React.FC = () => {
  const [conversaSelecionada, setConversaSelecionada] = useState<number | null>(1);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [busca, setBusca] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversas: Conversa[] = [
    {
      id: 1,
      nome: 'Equipe Manhã',
      tipo: 'grupo',
      participantes: ['João Silva', 'Maria Santos', 'Pedro Costa'],
      ultimaMensagem: 'Pessoal, vamos alinhar o treino da Turma A?',
      timestamp: new Date(Date.now() - 300000), // 5 min atrás
      naoLidas: 2,
      online: true
    },
    {
      id: 2,
      nome: 'Carlos Gestão',
      tipo: 'individual',
      participantes: ['Carlos Gestão'],
      ultimaMensagem: 'Preciso dos relatórios de frequência',
      timestamp: new Date(Date.now() - 1800000), // 30 min atrás
      naoLidas: 1,
      online: true
    },
    {
      id: 3,
      nome: 'Ana Recepção',
      tipo: 'individual',
      participantes: ['Ana Recepção'],
      ultimaMensagem: 'Cliente perguntou sobre aula de spinning',
      timestamp: new Date(Date.now() - 3600000), // 1h atrás
      naoLidas: 0,
      online: false
    },
    {
      id: 4,
      nome: 'Instrutores Unidade',
      tipo: 'grupo',
      participantes: ['Roberto', 'Lucia', 'Fernando', 'Camila'],
      ultimaMensagem: 'Alguém pode cobrir minha aula das 18h?',
      timestamp: new Date(Date.now() - 7200000), // 2h atrás
      naoLidas: 0,
      online: true
    }
  ];

  const mensagens: { [key: number]: Mensagem[] } = {
    1: [
      {
        id: 1,
        remetente: 'João Silva',
        conteudo: 'Bom dia pessoal! Como vamos organizar os treinos de hoje?',
        timestamp: new Date(Date.now() - 3600000),
        tipo: 'texto'
      },
      {
        id: 2,
        remetente: 'Maria Santos',
        conteudo: 'Oi João! Estava pensando em focar mais em exercícios funcionais',
        timestamp: new Date(Date.now() - 3300000),
        tipo: 'texto'
      },
      {
        id: 3,
        remetente: 'Você',
        conteudo: 'Ótima ideia Maria! Posso preparar uma sequência de agachamentos e pranchas',
        timestamp: new Date(Date.now() - 3000000),
        tipo: 'texto'
      },
      {
        id: 4,
        remetente: 'Pedro Costa',
        conteudo: 'Pessoal, vamos alinhar o treino da Turma A?',
        timestamp: new Date(Date.now() - 300000),
        tipo: 'texto'
      }
    ],
    2: [
      {
        id: 1,
        remetente: 'Carlos Gestão',
        conteudo: 'Oi! Você poderia me enviar os relatórios de frequência da semana?',
        timestamp: new Date(Date.now() - 3600000),
        tipo: 'texto'
      },
      {
        id: 2,
        remetente: 'Carlos Gestão',
        conteudo: 'Preciso dos relatórios de frequência',
        timestamp: new Date(Date.now() - 1800000),
        tipo: 'texto'
      }
    ]
  };

  const conversasFiltradas = conversas.filter(conversa => 
    conversa.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const conversaAtual = conversas.find(c => c.id === conversaSelecionada);
  const mensagensAtual = mensagens[conversaSelecionada || 1] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagensAtual]);

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return;
    
    console.log('Enviando mensagem:', novaMensagem);
    setNovaMensagem('');
  };

  const formatarHora = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chat Interno</h1>
        <p className="text-gray-600 mt-2">Comunicação em tempo real com a equipe</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista de Conversas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversas</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar conversas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversasFiltradas.map((conversa) => (
                <div
                  key={conversa.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                    conversaSelecionada === conversa.id ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
                  }`}
                  onClick={() => setConversaSelecionada(conversa.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversa.avatar} />
                        <AvatarFallback>
                          {conversa.tipo === 'grupo' ? <Users className="h-4 w-4" /> : conversa.nome.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversa.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900 truncate">{conversa.nome}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">{formatarHora(conversa.timestamp)}</span>
                          {conversa.naoLidas > 0 && (
                            <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {conversa.naoLidas}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversa.ultimaMensagem}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de Mensagens */}
        <Card className="lg:col-span-2 flex flex-col">
          {conversaAtual ? (
            <>
              {/* Header da Conversa */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversaAtual.avatar} />
                      <AvatarFallback>
                        {conversaAtual.tipo === 'grupo' ? <Users className="h-4 w-4" /> : conversaAtual.nome.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{conversaAtual.nome}</h3>
                      <p className="text-sm text-gray-600">
                        {conversaAtual.tipo === 'grupo' 
                          ? `${conversaAtual.participantes.length} participantes`
                          : conversaAtual.online ? 'Online' : 'Última vez há 2h'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Área de Mensagens */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {mensagensAtual.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`flex ${mensagem.remetente === 'Você' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      mensagem.remetente === 'Você'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {mensagem.remetente !== 'Você' && (
                        <p className="text-xs font-medium mb-1 opacity-70">{mensagem.remetente}</p>
                      )}
                      <p className="text-sm">{mensagem.conteudo}</p>
                      <p className={`text-xs mt-1 ${
                        mensagem.remetente === 'Você' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {formatarHora(mensagem.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input de Nova Mensagem */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                    className="flex-1"
                  />
                  <Button onClick={enviarMensagem} disabled={!novaMensagem.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Selecione uma conversa para começar</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default InstrutorChat;
